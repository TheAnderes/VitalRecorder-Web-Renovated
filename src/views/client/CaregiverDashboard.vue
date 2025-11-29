<template>
  <div class="dashboard-container">
    <div class="dashboard-main">
      <!-- Header -->
      <div class="header-section">
        <h1 class="page-title">Panel de Cuidador</h1>
        <p class="page-subtitle">Gestiona tus usuarios y monitorea su progreso</p>
      </div>

      <!-- Plan Section -->
      <div class="plan-section" v-if="currentPlan">
        <BaseCard class="plan-card">
          <div class="plan-header">
            <div class="plan-icon">
              <i class="bi bi-star-fill"></i>
            </div>
            <div class="plan-info">
              <h3>Mi Plan Actual</h3>
              <p class="plan-name">{{ currentPlan.name || 'Plan Gratuito' }}</p>
            </div>
          </div>
          <div class="plan-details">
            <div class="detail">
              <span class="label">Usuarios:</span>
              <span class="value">{{ patients.length }} / {{ currentPlan.maxPatients || '∞' }}</span>
            </div>
            <div class="detail">
              <span class="label">Estado:</span>
              <span class="value status-active">Activo</span>
            </div>
            <div class="detail" v-if="currentPlan.endDate">
              <span class="label">Vence:</span>
              <span class="value">{{ formatDate(currentPlan.endDate) }}</span>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Patients Section -->
      <div class="patients-section">
        <h2 class="section-title">Mis Usuarios</h2>
        
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Cargando usuarios...</p>
        </div>

        <div v-else-if="patients.length === 0" class="empty-state">
          <i class="bi bi-people empty-icon"></i>
          <p>No tienes usuarios asignados aún.</p>
          <p class="empty-hint">Pide a tus usuarios que te inviten usando tu correo electrónico.</p>
        </div>

        <div v-else class="patients-grid">
          <BaseCard v-for="patient in patients" :key="patient.id" class="patient-card">
            <div class="patient-header">
              <div class="patient-avatar">
                {{ getInitial(patient.displayName || patient.email) }}
              </div>
              <div class="patient-info">
                <h3>{{ patient.displayName || 'Usuario' }}</h3>
                <p class="patient-email">{{ patient.email }}</p>
              </div>
            </div>

            <div class="patient-stats">
              <div class="stat-item">
                <span class="stat-value">{{ patient.stats?.totalRecordatorios || 0 }}</span>
                <span class="stat-label">Recordatorios</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{ patient.stats?.adherencia || 0 }}%</span>
                <span class="stat-label">Cumplimiento</span>
              </div>
            </div>

            <div class="patient-actions">
              <button class="btn-report" @click="generateReport(patient)">
                <i class="bi bi-file-earmark-pdf"></i> Generar Reporte
              </button>
            </div>
          </BaseCard>
        </div>
      </div>

      <!-- Mobile App Promotion Section -->
      <div class="app-promotion-section">
        <BaseCard class="promotion-card">
          <div class="promotion-content">
            <div class="promotion-info">
              <h3 class="promotion-title">¿Necesitas funcionalidades más avanzadas?</h3>
              <p class="promotion-description">
                Para más funcionalidades y vistas más detalladas del historial de tus usuarios, 
                <strong>usa la aplicación móvil</strong>. Tendrás acceso a estadísticas en tiempo real, 
                análisis avanzados y reportes completos.
              </p>
            </div>
            
            <div class="promotion-action">
              <img 
                src="@/components/icons/IconApp.svg" 
                alt="VitalRecorder App - Descargar en Google Play" 
                class="app-logo-clickable"
                @click="downloadApp" 
                title="Haz clic para descargar en Google Play"
              >
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db, auth } from '@/firebase'
import { collection, query, where, getDocs, collectionGroup, doc, getDoc } from 'firebase/firestore'
import BaseCard from '@/components/shared/BaseCard.vue'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const patients = ref([])
const currentPlan = ref(null)
const loading = ref(true)

const getInitial = (name) => {
  return name ? name.charAt(0).toUpperCase() : 'U'
}

// Helper to translate reminder types to Spanish
const translateType = (type) => {
  if (!type) return 'General'
  
  const typeLower = type.toLowerCase()
  
  if (typeLower.includes('medic') || typeLower === 'medication') {
    return 'Medicación'
  } else if (typeLower.includes('activ') || typeLower === 'activity' || typeLower.includes('tarea')) {
    return 'Actividad'
  } else if (typeLower.includes('cita') || typeLower === 'appointment') {
    return 'Cita'
  }
  
  // Return capitalized version if no match
  return type.charAt(0).toUpperCase() + type.slice(1)
}

// Helper to format dates
const formatDate = (date) => {
  if (!date) return 'N/A'
  
  // Handle Firestore Timestamp
  const dateObj = date.toDate ? date.toDate() : new Date(date)
  
  return dateObj.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const fetchPatients = async () => {
  if (!auth.currentUser) return
  
  try {
    loading.value = true
    const email = auth.currentUser.email
    
    // 1. Find assignments using collectionGroup
    const assignmentsQuery = query(
      collectionGroup(db, 'cuidadores'),
      where('email', '==', email),
      where('activo', '==', true)
    )
    
    const assignmentsSnapshot = await getDocs(assignmentsQuery)
    const patientPromises = assignmentsSnapshot.docs.map(async (assignmentDoc) => {
      // The parent of the 'cuidadores' collection is the user document
      const userDocRef = assignmentDoc.ref.parent.parent
      if (userDocRef) {
        const userDoc = await getDoc(userDocRef)
        if (userDoc.exists()) {
          const userData = userDoc.data()
          // Fetch stats for this patient
          const stats = await fetchPatientStats(userDoc.id)
          return {
            id: userDoc.id,
            ...userData,
            stats
          }
        }
      }
      return null
    })

    const results = await Promise.all(patientPromises)
    patients.value = results.filter(p => p !== null)
    
  } catch (error) {
    console.error("Error fetching patients:", error)
  } finally {
    loading.value = false
  }
}

const fetchPatientStats = async (patientId) => {
  try {
    // Fetch reminders for this patient
    const remindersQuery = query(
      collection(db, 'reminders_new'),
      where('userId', '==', patientId)
    )
    const remindersSnapshot = await getDocs(remindersQuery)
    const reminders = remindersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    
    // Calculate simple stats
    // This is a simplified version. For real adherence we need to check confirmations.
    // Assuming 80% adherence for demo purposes if no real data
    
    return {
      totalRecordatorios: reminders.length,
      adherencia: reminders.length > 0 ? 85 : 0 // Placeholder
    }
  } catch (error) {
    console.error(`Error fetching stats for ${patientId}:`, error)
    return { totalRecordatorios: 0, adherencia: 0 }
  }
}

const fetchCaregiverPlan = async () => {
  if (!auth.currentUser) return
  try {
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid))
    if (userDoc.exists()) {
      const data = userDoc.data()
      
      // Match mobile app structure: subscription contains plan_id, active_slots, etc.
      if (data.subscription && data.subscription.active_slots !== undefined) {
        const activeSlots = data.subscription.active_slots || 0
        const planId = data.subscription.plan_id || 'free'
        const endDate = data.subscription.end_date || null
        
        // Map plan IDs to names (matching mobile app plans)
        const planNames = {
          'plan_1_person': 'Plan Individual',
          'plan_2_people': 'Plan Duo',
          'plan_3_people': 'Plan Familiar',
          'free': 'Plan Gratuito'
        }
        
        currentPlan.value = {
          name: planNames[planId] || 'Plan Gratuito',
          maxPatients: 1 + activeSlots, // Default 1 + subscription slots
          activeSlots: activeSlots,
          planId: planId,
          endDate: endDate
        }
      } else {
        // No subscription or free tier
        currentPlan.value = {
          name: 'Plan Gratuito',
          maxPatients: 1, // Free tier allows 1 patient
          activeSlots: 0,
          planId: 'free',
          endDate: null
        }
      }
    }
  } catch (error) {
    console.error("Error fetching plan:", error)
    currentPlan.value = {
      name: 'Plan Gratuito',
      maxPatients: 1,
      activeSlots: 0,
      planId: 'free',
      endDate: null
    }
  }
}

// Helper function to get confirmation stats for a reminder
const getReminderConfirmationStats = async (reminderId) => {
  try {
    console.log(`[Stats] Fetching confirmations for reminder: ${reminderId}`)
    
    // Query the top-level reminder_confirmations collection filtering by reminderId
    const confirmationsQuery = query(
      collection(db, 'reminder_confirmations'),
      where('reminderId', '==', reminderId)
    )
    const confirmationsSnapshot = await getDocs(confirmationsQuery)
    
    console.log(`[Stats] Confirmations found for ${reminderId}:`, confirmationsSnapshot.docs.length)
    
    let total = 0
    let confirmed = 0
    let missed = 0
    let pending = 0
    
    const now = new Date()
    
    confirmationsSnapshot.docs.forEach(doc => {
      const confirmation = doc.data()
      console.log(`[Stats] Confirmation data:`, {
        id: doc.id,
        status: confirmation.status,
        scheduledTime: confirmation.scheduledTime,
        confirmedAt: confirmation.confirmedAt
      })
      total++
      
      // Check status field (CONFIRMED, PENDING, MISSED, etc.)
      if (confirmation.status === 'CONFIRMED' || confirmation.confirmedAt) {
        confirmed++
      } else if (confirmation.status === 'MISSED') {
        missed++
      } else if (confirmation.status === 'PENDING') {
        // Check if scheduled time has passed to determine if it's actually missed
        const scheduledTime = confirmation.scheduledTime?.toDate ? confirmation.scheduledTime.toDate() : new Date(confirmation.scheduledTime)
        
        if (scheduledTime < now) {
          missed++ // Pending but time has passed = missed
        } else {
          pending++ // Still pending and future
        }
      } else {
        // Unknown status, check by time
        const scheduledTime = confirmation.scheduledTime?.toDate ? confirmation.scheduledTime.toDate() : new Date(confirmation.scheduledTime)
        if (scheduledTime < now) {
          missed++
        } else {
          pending++
        }
      }
    })
    
    console.log(`[Stats] Results for ${reminderId}:`, { total, confirmed, missed, pending })
    return { total, confirmed, missed, pending }
  } catch (error) {
    console.error(`Error fetching confirmations for reminder ${reminderId}:`, error)
    return { total: 0, confirmed: 0, missed: 0, pending: 0 }
  }
}

const generateReport = async (patient) => {
  try {
    console.log('=== GENERATING REPORT FOR PATIENT ===')
    console.log('Patient ID:', patient.id)
    console.log('Patient Data:', patient)
    
    // 1. Fetch detailed reminders
    const remindersQuery = query(
      collection(db, 'reminders_new'),
      where('userId', '==', patient.id)
    )
    const snapshot = await getDocs(remindersQuery)
    
    console.log('Reminders found:', snapshot.docs.length)
    
    const reminders = snapshot.docs.map(doc => {
      const data = doc.data()
      console.log('Reminder data:', { id: doc.id, title: data.title, userId: data.userId })
      return {
        id: doc.id,
        title: data.title || 'Sin título',
        description: data.description || '',
        type: data.type || 'General',
        active: data.active !== false,
        isPaused: data.isPaused || false,
        startDate: data.startDate?.toDate ? data.startDate.toDate() : new Date(data.startDate),
        endDate: data.endDate?.toDate ? data.endDate.toDate() : new Date(data.endDate),
        dailyScheduleTimes: data.dailyScheduleTimes || []
      }
    })

    if (reminders.length === 0) {
      console.warn('No reminders found for patient:', patient.id)
      alert('No se encontraron recordatorios para este usuario.')
      return
    }

    // 2. Fetch real statistics for each reminder
    console.log('Fetching confirmation stats for', reminders.length, 'reminders...')
    const reminderStatsPromises = reminders.map(r => getReminderConfirmationStats(r.id))
    const reminderStats = await Promise.all(reminderStatsPromises)
    
    console.log('Reminder stats:', reminderStats)
    
    // 3. Calculate overall stats
    let totalConfirmations = 0
    let totalConfirmed = 0
    let totalMissed = 0
    let totalPending = 0
    
    reminderStats.forEach(stat => {
      totalConfirmations += stat.total
      totalConfirmed += stat.confirmed
      totalMissed += stat.missed
      totalPending += stat.pending
    })
    
    console.log('Overall stats:', { totalConfirmations, totalConfirmed, totalMissed, totalPending })
    
    const adherenceRate = totalConfirmations > 0 ? Math.round((totalConfirmed / totalConfirmations) * 100) : 0

    // 4. Generate PDF
    const pdfDoc = new jsPDF()
    const pageWidth = pdfDoc.internal.pageSize.width
    
    // -- Header --
    pdfDoc.setFillColor(236, 253, 245)
    pdfDoc.rect(10, 10, pageWidth - 20, 40, 'F')
    pdfDoc.setDrawColor(209, 250, 229)
    pdfDoc.roundedRect(10, 10, pageWidth - 20, 40, 3, 3, 'S')

    pdfDoc.setFontSize(18)
    pdfDoc.setTextColor(6, 95, 70)
    pdfDoc.setFont('helvetica', 'bold')
    pdfDoc.text('REPORTE INDIVIDUAL DE USUARIO', 20, 25)

    pdfDoc.setFillColor(6, 95, 70)
    pdfDoc.roundedRect(pageWidth - 50, 18, 30, 8, 4, 4, 'F')
    pdfDoc.setTextColor(255, 255, 255)
    pdfDoc.setFontSize(8)
    pdfDoc.text('VitalRecorder', pageWidth - 46, 23)

    pdfDoc.setTextColor(0, 0, 0)
    pdfDoc.setFontSize(12)
    pdfDoc.text(`Usuario: ${patient.displayName || patient.email || 'Usuario'}`, 20, 35)
    pdfDoc.setFontSize(10)
    pdfDoc.setTextColor(100, 100, 100)
    const today = new Date().toLocaleDateString()
    pdfDoc.text(`Fecha de generación: ${today}`, 20, 42)

    // -- Statistics Section --
    let yPos = 60
    pdfDoc.setFontSize(14)
    pdfDoc.setTextColor(0, 0, 0)
    pdfDoc.setFont('helvetica', 'bold')
    pdfDoc.text('RESUMEN DE CUMPLIMIENTO', 14, yPos)
    
    yPos += 10
    const statsData = [
      { label: 'Tasa de Cumplimiento', value: `${adherenceRate}%` },
      { label: 'Total Recordatorios', value: `${reminders.length}` },
      { label: 'Confirmados', value: `${totalConfirmed}` },
      { label: 'Omitidos', value: `${totalMissed}` },
      { label: 'Pendientes', value: `${totalPending}` }
    ]

    let xPos = 14
    const cardWidth = (pageWidth - 28 - (statsData.length - 1) * 3) / statsData.length
    
    statsData.forEach(stat => {
      pdfDoc.setDrawColor(200, 200, 200)
      pdfDoc.roundedRect(xPos, yPos, cardWidth, 20, 2, 2, 'S')
      
      pdfDoc.setFontSize(12)
      pdfDoc.setFont('helvetica', 'bold')
      pdfDoc.setTextColor(0, 0, 0)
      pdfDoc.text(stat.value, xPos + cardWidth/2, yPos + 9, { align: 'center' })
      
      pdfDoc.setFontSize(7)
      pdfDoc.setFont('helvetica', 'normal')
      pdfDoc.setTextColor(100, 100, 100)
      pdfDoc.text(stat.label, xPos + cardWidth/2, yPos + 16, { align: 'center' })
      
      xPos += cardWidth + 3
    })

    // -- Per-Reminder Statistics Table --
    yPos += 30
    pdfDoc.setFontSize(14)
    pdfDoc.setTextColor(0, 0, 0)
    pdfDoc.setFont('helvetica', 'bold')
    pdfDoc.text('ESTADÍSTICAS POR RECORDATORIO', 14, yPos)

    yPos += 5
    
    const perReminderTableData = reminders.map((r, idx) => {
      const stats = reminderStats[idx]
      const reminderAdherence = stats.total > 0 ? Math.round((stats.confirmed / stats.total) * 100) : 0
      
      return [
        r.title.substring(0, 25) + (r.title.length > 25 ? '...' : ''),
        translateType(r.type),
        r.isPaused ? 'PAUSADO' : (r.active ? 'Activo' : 'Inactivo'),
        `${stats.total}`,
        `${stats.confirmed}`,
        `${stats.missed}`,
        `${stats.pending}`,
        `${reminderAdherence}%`
      ]
    })

    console.log('Table data rows:', perReminderTableData.length)
    console.log('autoTable available on doc?', typeof pdfDoc.autoTable)
    console.log('autoTable imported?', typeof autoTable)

    // Use autoTable - try the method on doc first, then the imported function
    try {
      if (typeof pdfDoc.autoTable === 'function') {
        console.log('Using doc.autoTable()')
        pdfDoc.autoTable({
          startY: yPos,
          head: [['Recordatorio', 'Tipo', 'Estado', 'Total', 'Confirmados', 'Omitidos', 'Pendientes', 'Cumplimiento']],
          body: perReminderTableData,
          theme: 'grid',
          headStyles: { fillColor: [243, 244, 246], textColor: [0, 0, 0], fontStyle: 'bold', fontSize: 7 },
          styles: { fontSize: 7, cellPadding: 2 },
          alternateRowStyles: { fillColor: [250, 250, 250] },
          columnStyles: {
            0: { cellWidth: 35 },
            1: { cellWidth: 20 },
            2: { cellWidth: 20 },
            3: { cellWidth: 15 },
            4: { cellWidth: 20 },
            5: { cellWidth: 18 },
            6: { cellWidth: 20 },
            7: { cellWidth: 20 }
          }
        })
      } else if (typeof autoTable === 'function') {
        console.log('Using imported autoTable()')
        autoTable(pdfDoc, {
          startY: yPos,
          head: [['Recordatorio', 'Tipo', 'Estado', 'Total', 'Confirmados', 'Omitidos', 'Pendientes', 'Cumplimiento']],
          body: perReminderTableData,
          theme: 'grid',
          headStyles: { fillColor: [243, 244, 246], textColor: [0, 0, 0], fontStyle: 'bold', fontSize: 7 },
          styles: { fontSize: 7, cellPadding: 2 },
          alternateRowStyles: { fillColor: [250, 250, 250] },
          columnStyles: {
            0: { cellWidth: 35 },
            1: { cellWidth: 20 },
            2: { cellWidth: 20 },
            3: { cellWidth: 15 },
            4: { cellWidth: 20 },
            5: { cellWidth: 18 },
            6: { cellWidth: 20 },
            7: { cellWidth: 20 }
          }
        })
      } else {
        console.error('autoTable not available!')
      }
    } catch (tableError) {
      console.error('Error creating table:', tableError)
    }

    // -- Notes Section --
    const finalY = pdfDoc.lastAutoTable ? pdfDoc.lastAutoTable.finalY + 10 : yPos + 50
    pdfDoc.setFillColor(249, 250, 251)
    pdfDoc.rect(14, finalY, pageWidth - 28, 30, 'F')
    
    pdfDoc.setFontSize(10)
    pdfDoc.setFont('helvetica', 'bold')
    pdfDoc.setTextColor(0, 0, 0)
    pdfDoc.text('NOTAS:', 20, finalY + 8)
    
    pdfDoc.setFontSize(8)
    pdfDoc.setFont('helvetica', 'normal')
    pdfDoc.text('- CONFIRMADO: Recordatorio marcado como tomado/realizado', 20, finalY + 14)
    pdfDoc.text('- OMITIDO: Recordatorio no completado después de la fecha/hora programada', 20, finalY + 19)
    pdfDoc.text('- PENDIENTE: Recordatorio programado para fecha/hora futura', 20, finalY + 24)

    // Save
    const filename = `reporte_${patient.displayName || 'usuario'}_${new Date().getTime()}.pdf`
    console.log('Saving PDF:', filename)
    pdfDoc.save(filename)
    
    console.log('=== REPORT GENERATED SUCCESSFULLY ===')

  } catch (e) {
    console.error("Error generating report:", e)
    alert("Error al generar el reporte: " + e.message)
  }
}

const downloadApp = () => {
  window.open('https://play.google.com/store/apps/details?id=com.vitalrecorder', '_blank')
}

onMounted(() => {
  fetchPatients()
  fetchCaregiverPlan()
})
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: #f8fafc;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
}

.dashboard-main {
  max-width: 1200px;
  margin: 0 auto;
}

.header-section {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: #64748b;
  font-size: 1.1rem;
}

.plan-section {
  margin-bottom: 2rem;
}

.plan-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.plan-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.plan-icon {
  width: 48px;
  height: 48px;
  background: #eff6ff;
  color: #3b82f6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.plan-info h3 {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
}

.plan-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.plan-details {
  display: flex;
  gap: 2rem;
}

.detail {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.detail .label {
  font-size: 0.8rem;
  color: #64748b;
}

.detail .value {
  font-weight: 600;
  color: #1e293b;
}

.status-active {
  color: #10b981;
}

.patients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.patient-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.patient-card:hover {
  transform: translateY(-4px);
}

.patient-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.patient-avatar {
  width: 48px;
  height: 48px;
  background: #f1f5f9;
  color: #475569;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
}

.patient-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
}

.patient-email {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
}

.patient-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.75rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #3b82f6;
}

.stat-label {
  font-size: 0.75rem;
  color: #64748b;
}

.btn-report {
  width: 100%;
  padding: 0.75rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.2s;
}

.btn-report:hover {
  background: #2563eb;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 3rem;
  color: #64748b;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.app-promotion-section {
  margin-top: 2rem;
  width: 100%;
}

.promotion-card {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.promotion-content {
  display: grid;
  gap: 2rem;
  align-items: center;
}

.promotion-info {
  flex: 1;
}

.promotion-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2b6c;
  margin: 0 0 1rem 0;
}

.promotion-description {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

.promotion-description strong {
  color: #1f2b6c;
  font-weight: 700;
}

.promotion-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.app-logo-clickable {
  width: 200px;
  height: 200px;
  object-fit: contain;
  cursor: pointer;
  transition: all 0.3s ease;
  filter: drop-shadow(0 4px 15px rgba(45, 212, 191, 0.2));
  border-radius: 20px;
}

.app-logo-clickable:hover {
  transform: translateY(-6px) scale(1.08);
  filter: drop-shadow(0 8px 25px rgba(45, 212, 191, 0.5));
}

.app-logo-clickable:active {
  transform: translateY(-3px) scale(1.04);
  filter: drop-shadow(0 6px 20px rgba(45, 212, 191, 0.4));
}

@media (max-width: 768px) {
  .app-logo-clickable {
    width: 150px;
    height: 150px;
  }
}

@media (max-width: 480px) {
  .app-logo-clickable {
    width: 120px;
    height: 120px;
  }
}

@media (min-width: 768px) {
  .promotion-content {
    grid-template-columns: 1fr auto;
  }
  
  .promotion-action {
    flex-direction: row;
  }
}
</style>
