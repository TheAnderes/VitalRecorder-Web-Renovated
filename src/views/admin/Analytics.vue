<template>
  <AdminLayout>
    <div class="analytics-page">
      <!-- Header -->
      <div class="page-header">
        <div class="header-content">
          <h2>Analíticas y Reportes</h2>
          <p>Estadísticas detalladas y reportes del sistema VitalSystems</p>
        </div>
        
        <div class="header-actions">

          
          <button @click="exportReport" class="export-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Exportar Reporte
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Cargando analíticas...</p>
      </div>

      <!-- Analytics Content -->
      <div v-else class="analytics-content">
        <!-- Summary Cards -->
        <div class="summary-cards">
            <div class="summary-card">
              <div class="card-icon family">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="card-content">
                <h3>{{ analytics.patientsTotal }}</h3>
                <p>Pacientes Totales</p>
                <span class="growth positive">+{{ analytics.recentPatients }} nuevos</span>
              </div>
            </div>

          <div class="summary-card">
            <div class="card-icon active">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="card-content">
              <h3>{{ analytics.activeUsers }}%</h3>
              <p>Usuarios Activos</p>
              <span class="growth positive">+2.4% vs mes anterior</span>
            </div>
          </div>


          <div class="summary-card">
            <div class="card-icon caregivers">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M16 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM8 11c1.657 0 3-1.343 3-3S9.657 5 8 5 5 6.343 5 8s1.343 3 3 3zM4 20c0-2.21 1.79-4 4-4h8c2.21 0 4 1.79 4 4v1H4v-1z" fill="currentColor"/>
              </svg>
            </div>
            <div class="card-content">
              <h3>{{ analytics.caregiversTotal }}</h3>
              <p>Cuidadores Totales</p>
              <span class="growth positive">+{{ analytics.recentCaregivers }} nuevos</span>
            </div>
          </div>
        </div>

        <!-- Charts Grid -->
        <div class="charts-grid">
          <!-- User Growth Chart -->
          <div class="chart-section full-width">
            <LineChart
              :data="growthData.data"
              :labels="growthData.months"
              title="Crecimiento de Usuarios"
              subtitle="Usuarios registrados acumulados por mes"
              line-color="#3b82f6"
              :show-area="true"
            />
          </div>

          <!-- Demographics Charts -->
          <div class="chart-section pie-chart">
            <PieChart
              :data="genderData"
              title="Distribución por Género"
              subtitle="Segmentación demográfica"
              :size="pieSize"
              center-label="Usuarios"
            />
          </div>

          <div class="chart-section">
            <BarChart
              :data="ageGroupData"
              title="Distribución por Edad"
              subtitle="Grupos etarios de usuarios"
              :height="barHeight"
              :show-legend="false"
            />
          </div>
        </div>

        <!-- Data Tables -->
        <div class="data-tables">
          <!-- Top Users Activity -->
          <div class="table-section">
            <div class="table-header">
              <h3>Actividad Reciente</h3>
              <p>Últimas acciones en el sistema</p>
            </div>
            
            <div class="activity-table">
              <div 
                v-for="activity in recentActivity" 
                :key="activity.id"
                class="activity-row"
              >
                <div class="activity-icon" :class="activity.icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path v-if="activity.icon === 'user'" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" fill="currentColor"/>
                    <path v-else-if="activity.icon === 'settings'" d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" fill="currentColor"/>
                    <path v-else-if="activity.icon === 'warning'" d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.46 9-11V7l-10-5z M12 17h-2v-2h2v2z M12 13h-2V7h2v6z" fill="currentColor"/>
                    <path v-else d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
                  </svg>
                </div>
                
                <div class="activity-content">
                  <p class="activity-message">{{ activity.message }}</p>
                  <span class="activity-time">{{ formatRelativeTime(activity.timestamp) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- System Health Metrics -->
          <div class="table-section">
            <div class="table-header">
              <h3>Métricas del Sistema</h3>
              <p>Estado y rendimiento</p>
            </div>
            
            <div class="metrics-grid">
              <div class="metric-item">
                <div class="metric-label">Tiempo de Respuesta</div>
                <div class="metric-value good">< 200ms</div>
              </div>
              
              <div class="metric-item">
                <div class="metric-label">Disponibilidad</div>
                <div class="metric-value good">99.9%</div>
              </div>
              
              <div class="metric-item">
                <div class="metric-label">Almacenamiento</div>
                <div class="metric-value warning">75% usado</div>
              </div>
              
              <div class="metric-item">
                <div class="metric-label">Usuarios Concurrentes</div>
                <div class="metric-value good">{{ Math.floor(analytics.totalUsers * 0.15) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import BarChart from '@/components/shared/BarChart.vue'
import PieChart from '@/components/shared/PieChart.vue'
import LineChart from '@/components/shared/LineChart.vue'
import * as AdminPatientService from '@/services/AdminPatientService'
import { userService } from '@/services/userService'
import { useAdmin } from '@/composables/useAdmin'
import { useAuth } from '@/composables/useAuth'

const { getBasicStats, getRecentActivity: getRecentActivityComposable } = useAdmin()

// State
const loading = ref(true)
const selectedPeriod = ref('30days')
const analytics = ref({
  totalUsers: 0,
  activeUsers: 0,
  recentUsers: 0,
  usersWithFamily: 0,
  notificationsEnabled: 0,
  silentModeUsers: 0,
  patientsTotal: 0,
  caregiversTotal: 0,
  recentPatients: 0,
  recentCaregivers: 0
})
const recentActivity = ref([])
const demographicData = ref(null)
const growthData = ref({ months: [], data: [] })

// Computed properties for chart data
const genderData = computed(() => {
  if (!demographicData.value) return []
  
  return [
    {
      label: 'Masculino',
      value: demographicData.value.genderStats.masculino,
      color: '#3b82f6'
    },
    {
      label: 'Femenino', 
      value: demographicData.value.genderStats.femenino,
      color: '#f59e0b'
    }
  ]
})

const ageGroupData = computed(() => {
  if (!demographicData.value) return []
  
  return Object.entries(demographicData.value.ageGroups).map(([label, value]) => ({
    label,
    value,
    color: undefined // Usar colores por defecto
  }))
})

const roleData = computed(() => {
  return [
    {
      label: 'Usuarios',
      value: (analytics.value.totalUsers || 0) - (analytics.value.totalAdmins || 0),
      color: '#10b981'
    },
    {
      label: 'Administradores',
      value: analytics.value.totalAdmins || 0,
      color: '#f59e0b'
    }
  ]
})

// Removed settingsData: 'Configuraciones de Usuario' chart was removed per request

// Responsive sizes
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)
const handleResize = () => {
  windowWidth.value = typeof window !== 'undefined' ? window.innerWidth : windowWidth.value
}

const pieSize = computed(() => {
  if (windowWidth.value <= 360) return 140
  if (windowWidth.value <= 480) return 160
  if (windowWidth.value <= 768) return 200
  return 220
})

const barHeight = computed(() => {
  if (windowWidth.value <= 360) return '180px'
  if (windowWidth.value <= 480) return '200px'
  if (windowWidth.value <= 768) return '220px'
  return '260px'
})

// Methods
const loadAnalytics = async () => {
  try {
    loading.value = true
    
    // Cargar estadísticas básicas
    const stats = await getBasicStats()
    analytics.value = {
      totalUsers: stats.totalUsers || 0,
      activeUsers: 0,
      recentUsers: 0,
      totalAdmins: stats.totalAdmins || 0,
      totalSuperAdmins: stats.totalSuperAdmins || 0,
      usersWithFamily: 0,
      notificationsEnabled: 0,
      silentModeUsers: 0
    }
    
      // Cargar usuarios y pacientes reales desde Firestore
      const [usersList, patientsList] = await Promise.all([
        userService.getAllUsers(),
        AdminPatientService.listPatients()
      ])

      // Basic analytics
      analytics.value.totalUsers = usersList.length
      analytics.value.totalAdmins = usersList.filter(u => u.role === 'admin' || u.role === 'super_admin').length
      analytics.value.patientsTotal = patientsList.length
      analytics.value.caregiversTotal = usersList.filter(u => u.role === 'cuidador').length

      // Compute cutoff once for recent counts based on selectedPeriod
      const days = selectedPeriod.value === '7days' ? 7 : selectedPeriod.value === '30days' ? 30 : selectedPeriod.value === '3months' ? 90 : 365
      const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - days)

      analytics.value.recentUsers = usersList.filter(u => {
        const createdAt = (u.createdAt && u.createdAt.toDate) ? u.createdAt.toDate() : new Date(u.createdAt || Date.now())
        return createdAt >= cutoff
      }).length

      // Recent patients (created within the selected period)
      analytics.value.recentPatients = patientsList.filter(p => {
        const createdAt = (p.createdAt && p.createdAt.toDate) ? p.createdAt.toDate() : new Date(p.createdAt || p.createdAt || Date.now())
        return createdAt >= cutoff
      }).length

      // Recent caregivers (users with role 'cuidador' created within the selected period)
      analytics.value.recentCaregivers = usersList.filter(u => {
        try {
          const isCaregiver = u.role === 'cuidador'
          if (!isCaregiver) return false
          const createdAt = (u.createdAt && u.createdAt.toDate) ? u.createdAt.toDate() : new Date(u.createdAt || Date.now())
          return createdAt >= cutoff
        } catch (e) {
          return false
        }
      }).length

      // Active users: prefer patients collection 'isActive' if present
      const activePatientsCount = patientsList.filter(p => p.isActive === true || p.estado === 'Activo' || p.estado === 'activo').length
      analytics.value.activeUsers = analytics.value.totalUsers ? Math.round((activePatientsCount / analytics.value.totalUsers) * 100) : 0

      // Settings-based stats from users collection
      analytics.value.usersWithFamily = usersList.filter(u => !!(u.settings && u.settings.familiar_email)).length
      analytics.value.notificationsEnabled = usersList.filter(u => !!(u.settings && u.settings.notificar_a_familiar)).length
      analytics.value.silentModeUsers = usersList.filter(u => !!(u.settings && u.settings.modo_silencio)).length

      // Demographics: genders and age groups
      const genders = { masculino: 0, femenino: 0, otro: 0 }
      const ageGroups = {}
      usersList.forEach(u => {
        const sexo = (u.persona && u.persona.sexo) ? u.persona.sexo.toString().toLowerCase() : 'otro'
        if (sexo.includes('mascul')) genders.masculino++
        else if (sexo.includes('femen')) genders.femenino++
        else genders.otro++

        // age group
        let age = null
        if (u.persona && u.persona.fecha_nac) {
          const d = (u.persona.fecha_nac.toDate) ? u.persona.fecha_nac.toDate() : new Date(u.persona.fecha_nac)
          const now = new Date()
          age = now.getFullYear() - d.getFullYear()
          const m = now.getMonth() - d.getMonth()
          if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--
        }
        let label = 'Desconocido'
        if (age !== null) {
          if (age < 12) label = 'Niño'
          else if (age < 18) label = 'Joven'
          else if (age < 65) label = 'Adulto'
          else label = 'Adulto Mayor'
        }
        ageGroups[label] = (ageGroups[label] || 0) + 1
      })

      demographicData.value = {
        genderStats: { masculino: genders.masculino, femenino: genders.femenino, otro: genders.otro },
        ageGroups,
        usersWithFamily: analytics.value.usersWithFamily,
        notificationStats: { enabled: analytics.value.notificationsEnabled, silentMode: analytics.value.silentModeUsers }
      }

      // Growth data: users per month for the last 12 months (or shorter depending on selectedPeriod)
      const months = []
      const now = new Date()
      const monthsCount = selectedPeriod.value === '7days' ? 1 : selectedPeriod.value === '30days' ? 3 : selectedPeriod.value === '3months' ? 6 : 12
      for (let i = monthsCount - 1; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
        months.push(d.toLocaleString('default', { month: 'short', year: 'numeric' }))
      }

      const monthlyCounts = months.map((mLabel, idx) => {
        // compute start and end for month index
        const start = new Date(now.getFullYear(), now.getMonth() - (monthsCount - 1 - idx), 1)
        const end = new Date(start.getFullYear(), start.getMonth() + 1, 1)
        const count = usersList.filter(u => {
          const createdAt = (u.createdAt && u.createdAt.toDate) ? u.createdAt.toDate() : new Date(u.createdAt || Date.now())
          return createdAt >= start && createdAt < end
        }).length
        return count
      })

      growthData.value = { months, data: monthlyCounts }

      // Recent activity: combine recent user registrations and recent patient updates/creations
      const activities = []
      usersList.slice().sort((a,b)=>{ // newest first
        const at = (a.createdAt && a.createdAt.toDate) ? a.createdAt.toDate() : new Date(a.createdAt || 0)
        const bt = (b.createdAt && b.createdAt.toDate) ? b.createdAt.toDate() : new Date(b.createdAt || 0)
        return bt - at
      }).slice(0,8).forEach(u => {
        const ts = (u.createdAt && u.createdAt.toDate) ? u.createdAt.toDate() : new Date(u.createdAt || Date.now())
        activities.push({ id: `u-${u.id}`, icon: 'user', message: `Registro: ${u.persona?.nombres || u.email || 'Usuario'}`, timestamp: ts })
      })

      patientsList.slice().sort((a,b)=>{
        const at = (a.updatedAt && a.updatedAt.toDate) ? a.updatedAt.toDate() : new Date(a.updatedAt || a.createdAt || 0)
        const bt = (b.updatedAt && b.updatedAt.toDate) ? b.updatedAt.toDate() : new Date(b.updatedAt || b.createdAt || 0)
        return bt - at
      }).slice(0,8).forEach(p => {
        const ts = (p.updatedAt && p.updatedAt.toDate) ? p.updatedAt.toDate() : new Date(p.updatedAt || p.createdAt || Date.now())
        activities.push({ id: `p-${p.id}`, icon: 'warning', message: `Paciente actualizado: ${p.persona?.nombres || p.dni || p.id}`, timestamp: ts })
      })

      // sort activities by timestamp and keep top 5
      recentActivity.value = activities.sort((a,b)=> b.timestamp - a.timestamp).slice(0,5)
    
  } catch (error) {
    console.error('Error cargando analíticas:', error)
  } finally {
    loading.value = false
  }
}

const exportReport = async () => {
  // Crear datos base del reporte
  const reportData = {
    generatedAt: new Date().toISOString(),
    period: selectedPeriod.value,
    summary: analytics.value,
    demographics: demographicData.value,
    growth: growthData.value,
    recentActivity: recentActivity.value
  }

  try {
    // Obtener listas completas para incluir en el informe
    const [usersList, patientsList] = await Promise.all([
      userService.getAllUsers(),
      AdminPatientService.listPatients()
    ])

    // Contenedor raíz para el PDF (temporal)
    const container = document.createElement('div')
    container.className = 'pdf-report'
    container.style.width = '1200px'
    container.style.padding = '28px'
    container.style.boxSizing = 'border-box'
    container.style.fontFamily = `Inter, Roboto, Arial, Helvetica, sans-serif`
    container.style.color = '#111'
    container.style.background = '#fff'
    container.style.lineHeight = '1.3'

    // Inline styles para tablas, tarjetas y watermark
    const styleEl = document.createElement('style')
    styleEl.innerHTML = `
      .pdf-report h1{font-size:26px;margin:0;color:#0f172a}
      .pdf-meta{color:#475569;font-size:12px}
      .pdf-hr{height:1px;background:#e6eef8;margin:14px 0;border-radius:4px}
      .pdf-summary{display:flex;gap:12px;flex-wrap:wrap;margin-top:12px}
      .pdf-card{background:#f8fafc;padding:12px;border-radius:10px;flex:1;min-width:200px;box-shadow:0 6px 18px rgba(15,23,42,0.04)}
      .pdf-card h4{margin:0 0 6px 0;font-size:13px;color:#0f172a}
      .pdf-card .value{font-size:18px;font-weight:700;color:#0b84ff}
      .pdf-table{width:100%;border-collapse:collapse;font-size:12px;margin-top:8px}
      .pdf-table th{background:#f3f4f6;text-align:left;padding:8px;border-bottom:1px solid #e6eef8;font-weight:700}
      .pdf-table td{padding:8px;border-bottom:1px solid #f1f5f9}
      .pdf-table tbody tr:nth-child(even){background:#fbfdff}
      .pdf-section{margin-top:18px}
      .pdf-watermark{position:absolute;left:50%;top:45%;transform:translate(-50%,-50%) rotate(-30deg);color:rgba(15,23,42,0.06);font-size:72px;pointer-events:none}
    `
    container.appendChild(styleEl)

    const { getUserName, user: authUser } = useAuth()
    const adminName = (typeof getUserName === 'function') ? getUserName() : ''
    const adminEmail = authUser && authUser.value ? authUser.value.email : ''

    // Header con logo simple (inline SVG) y metadatos
    const header = document.createElement('div')
    header.style.display = 'flex'
    header.style.justifyContent = 'space-between'
    header.style.alignItems = 'center'
    header.style.marginBottom = '8px'

    const left = document.createElement('div')
    left.style.display = 'flex'
    left.style.alignItems = 'center'
    left.style.gap = '12px'

    // Small inline logo
    const logo = document.createElement('div')
    logo.innerHTML = `
      <svg width="56" height="56" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stop-color="#2563eb" />
            <stop offset="1" stop-color="#06b6d4" />
          </linearGradient>
        </defs>
        <rect rx="12" width="64" height="64" fill="url(#g1)" />
        <text x="50%" y="54%" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#fff" font-weight="700">VR</text>
      </svg>
    `
    left.appendChild(logo)

    const titleWrap = document.createElement('div')
    titleWrap.innerHTML = `<h1>Informe Administrador — VitalSystems</h1><div class="pdf-meta">Generado: ${new Date(reportData.generatedAt).toLocaleString()} · Periodo: ${reportData.period}</div>`
    left.appendChild(titleWrap)

    const right = document.createElement('div')
    right.style.textAlign = 'right'
    right.innerHTML = `<div class="pdf-meta">Generado por: ${adminName || 'Administrador'}${adminEmail ? ' ('+adminEmail+')' : ''}</div><div style="font-size:11px;color:#94a3b8;margin-top:6px;">VitalRecorder-Web-Renovated</div>`

    header.appendChild(left)
    header.appendChild(right)
    container.appendChild(header)

    const hr = document.createElement('div')
    hr.className = 'pdf-hr'
    container.appendChild(hr)

    // Summary cards
    const summaryWrap = document.createElement('div')
    summaryWrap.className = 'pdf-summary'
    const cards = [
      { title: 'Pacientes Totales', value: reportData.summary.patientsTotal ?? patientsList.length ?? 0 },
      { title: 'Cuidadores Totales', value: reportData.summary.caregiversTotal ?? usersList.filter(u=>u.role==='cuidador').length ?? 0 },
      { title: 'Usuarios Totales', value: reportData.summary.totalUsers ?? usersList.length ?? 0 },
      { title: 'Usuarios Activos (%)', value: (reportData.summary.activeUsers ?? 0) + '%' }
    ]
    cards.forEach(c => {
      const card = document.createElement('div')
      card.className = 'pdf-card'
      card.innerHTML = `<h4>${c.title}</h4><div class="value">${c.value}</div>`
      summaryWrap.appendChild(card)
    })
    container.appendChild(summaryWrap)

    // Small descriptive section
    const desc = document.createElement('div')
    desc.style.marginTop = '8px'
    desc.style.color = '#475569'
    desc.style.fontSize = '12px'
    desc.textContent = 'Resumen ejecutivo y listados importantes. Datos en el momento de la exportación.'
    container.appendChild(desc)

    // Patients table (styled)
    const patientsSection = document.createElement('div')
    patientsSection.className = 'pdf-section'
    let patientRows = ''
    patientsList.forEach(p => {
      const nombre = p.persona?.nombres || p.persona?.nombre || p.id || '—'
      const dni = p.persona?.dni || p.dni || '—'
      const estado = p.estado || (p.isActive ? 'Activo' : 'Inactivo') || '—'
      const created = (p.createdAt && p.createdAt.toDate) ? p.createdAt.toDate().toLocaleDateString() : (p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '—')
      patientRows += `<tr><td>${p.id || '—'}</td><td>${nombre}</td><td>${dni}</td><td>${estado}</td><td style="text-align:right">${created}</td></tr>`
    })
    patientsSection.innerHTML = `
      <h3 style="margin:0 0 8px 0">Listado de Pacientes (${patientsList.length})</h3>
      <table class="pdf-table">
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>DNI</th><th>Estado</th><th style="text-align:right">Creado</th></tr>
        </thead>
        <tbody>
          ${patientRows}
        </tbody>
      </table>
    `
    container.appendChild(patientsSection)

    // Caregivers table
    const caregivers = usersList.filter(u => u.role === 'cuidador' || u.role === 'caregiver')
    const caregiversSection = document.createElement('div')
    caregiversSection.className = 'pdf-section'
    let caregiverRows = ''
    caregivers.forEach(u => {
      const nombre = u.persona?.nombres || u.name || u.email || '—'
      const email = u.email || '—'
      const created = (u.createdAt && u.createdAt.toDate) ? u.createdAt.toDate().toLocaleDateString() : (u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—')
      caregiverRows += `<tr><td>${u.id || '—'}</td><td>${nombre}</td><td>${email}</td><td style="text-align:right">${created}</td></tr>`
    })
    caregiversSection.innerHTML = `
      <h3 style="margin:0 0 8px 0">Listado de Cuidadores (${caregivers.length})</h3>
      <table class="pdf-table">
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Email</th><th style="text-align:right">Creado</th></tr>
        </thead>
        <tbody>
          ${caregiverRows}
        </tbody>
      </table>
    `
    container.appendChild(caregiversSection)

    // Watermark
    const watermark = document.createElement('div')
    watermark.className = 'pdf-watermark'
    watermark.textContent = 'VitalSystems'
    container.appendChild(watermark)

    // Añadir al DOM fuera de la vista
    container.style.position = 'fixed'
    container.style.left = '-9999px'
    document.body.appendChild(container)

    // Renderizar con html2canvas (alta calidad)
    const canvas = await html2canvas(container, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')

    // Generar PDF multipágina de forma controlada (primero crear slices si hacen falta)
    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()

    // Obtener propiedades de la imagen completa (en px)
    const img = new Image()
    img.src = imgData
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej })
    const imgWidthPx = img.width
    const imgHeightPx = img.height

    // Altura en mm cuando la imagen escala al ancho del PDF
    const imgHeightInPdf = (imgHeightPx * pdfWidth) / imgWidthPx

    // Convertir dimensiones px->mm ratio
    const pxPerMm = imgHeightPx / imgHeightInPdf

    const slices = []
    if (imgHeightInPdf <= pdfHeight) {
      slices.push({ data: imgData, heightInPdf: imgHeightInPdf })
    } else {
      const sliceHeightPx = Math.floor(pdfHeight * pxPerMm)
      let remainingHeight = imgHeightPx
      let offsetY = 0
      while (remainingHeight > 0) {
        const canvasSlice = document.createElement('canvas')
        canvasSlice.width = imgWidthPx
        const h = Math.min(sliceHeightPx, remainingHeight)
        canvasSlice.height = h
        const ctx = canvasSlice.getContext('2d')
        ctx.drawImage(img, 0, offsetY, imgWidthPx, h, 0, 0, imgWidthPx, h)
        const sliceData = canvasSlice.toDataURL('image/png')
        const sliceHeightInPdf = (h * pdfWidth) / imgWidthPx
        slices.push({ data: sliceData, heightInPdf: sliceHeightInPdf })
        remainingHeight -= h
        offsetY += h
      }
    }

    // Añadir páginas y pies de página (numeración)
    for (let i = 0; i < slices.length; i++) {
      const s = slices[i]
      if (i > 0) pdf.addPage()
      pdf.addImage(s.data, 'PNG', 0, 0, pdfWidth, s.heightInPdf)
      // Footer: número de página y marca pequeña a la derecha
      pdf.setFontSize(9)
      pdf.setTextColor(120)
      const pageNumText = `Página ${i + 1} / ${slices.length}`
      pdf.text(pageNumText, pdfWidth / 2, pdf.internal.pageSize.getHeight() - 6, { align: 'center' })
      pdf.text('VitalSystems', pdfWidth - 12, pdf.internal.pageSize.getHeight() - 6, { align: 'right' })
    }

    const filename = `informe-administrador-${new Date().toISOString().split('T')[0]}.pdf`
    pdf.save(filename)

    // Limpiar
    document.body.removeChild(container)
  } catch (err) {
    console.error('Error generando PDF:', err)
    alert('Ocurrió un error al generar el PDF. Revisa la consola para más detalles.')
  }
}

const formatRelativeTime = (timestamp) => {
  const now = new Date()
  const date = new Date(timestamp)
  const diffInSeconds = Math.floor((now - date) / 1000)
  
  if (diffInSeconds < 60) return 'Hace un momento'
  if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} minutos`
  if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} horas`
  if (diffInSeconds < 604800) return `Hace ${Math.floor(diffInSeconds / 86400)} días`
  return date.toLocaleDateString('es-ES')
}

// Lifecycle
onMounted(() => {
  loadAnalytics()
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style scoped>
.analytics-page {
  padding: 0;
}

/* Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.header-content h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.875rem;
  font-weight: 600;
  color: #1f2937;
}

.header-content p {
  margin: 0;
  color: #6b7280;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.period-selector {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  cursor: pointer;
}

.export-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.export-btn:hover {
  background: #2563eb;
}

/* Loading */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #6b7280;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Summary Cards */
.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.summary-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s ease;
}

.summary-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.card-icon.users { background: linear-gradient(135deg, #3b82f6, #1d4ed8); }
.card-icon.active { background: linear-gradient(135deg, #10b981, #059669); }
.card-icon.family { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
.card-icon.notifications { background: linear-gradient(135deg, #f59e0b, #d97706); }
.card-icon.caregivers { background: linear-gradient(135deg, #f97316, #fb923c); }

.card-content h3 {
  margin: 0 0 0.25rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
}

.card-content p {
  margin: 0 0 0.5rem 0;
  color: #6b7280;
  font-weight: 500;
}

.growth {
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
}

.growth.positive {
  background: #dcfce7;
  color: #166534;
}

.growth.neutral {
  background: #f3f4f6;
  color: #4b5563;
}

/* Charts Grid */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.chart-section {
  background: transparent;
}

.chart-section.full-width {
  grid-column: 1 / -1;
}

/* Data Tables */
.data-tables {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.table-section {
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
}

.table-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f3f4f6;
}

.table-header h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.table-header p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

/* Activity Table */
.activity-table {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
}

.activity-row:hover {
  background: #f9fafb;
}

.activity-icon {
  width: 32px;
  height: 32px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.activity-icon.user { background: #dbeafe; color: #1e40af; }
.activity-icon.settings { background: #fef3c7; color: #d97706; }
.activity-icon.warning { background: #fee2e2; color: #dc2626; }
.activity-icon.role { background: #fce7f3; color: #be185d; }

.activity-content {
  flex: 1;
}

.activity-message {
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;
  color: #1f2937;
  font-weight: 500;
}

.activity-time {
  font-size: 0.75rem;
  color: #9ca3af;
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.metric-item {
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.5rem;
  text-align: center;
}

.metric-label {
  font-size: 0.75rem;
  color: #6b7280;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.metric-value {
  font-size: 1.125rem;
  font-weight: 700;
}

.metric-value.good { color: #10b981; }
.metric-value.warning { color: #f59e0b; }
.metric-value.danger { color: #ef4444; }

/* Responsive Design */
@media (max-width: 1200px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .chart-section.full-width {
    grid-column: 1;
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .header-actions {
    justify-content: stretch;
    flex-direction: column;
  }
  
  .summary-cards {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .summary-card {
    padding: 1rem;
  }
  
  .card-icon {
    width: 48px;
    height: 48px;
  }
  
  .card-content h3 {
    font-size: 1.5rem;
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  /* Mobile-specific layout tweaks for pie charts */
  .pie-chart {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Ensure the chart never overflows the container on mobile */
  .pie-chart > * {
    max-width: 100%;
  }
  
  .data-tables {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .table-section {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .activity-row {
    padding: 0.5rem;
  }
  
  .activity-icon {
    width: 28px;
    height: 28px;
  }

  /* Slightly tighter spacing for pie chart sections on very small screens */
  .pie-chart {
    padding: 0.25rem 0;
  }
  
  .metric-item {
    padding: 0.75rem;
  }
}
</style>
