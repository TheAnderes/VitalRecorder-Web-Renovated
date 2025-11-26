<template>
  <div class="admin-page patient-perfil layout-two-col">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h3>📋 Pacientes</h3>
        <input 
          type="text" 
          class="search-patients" 
          placeholder="Buscar paciente..." 
          v-model="searchPatients"
        />
      </div>
      <ul class="patient-list">
        <li v-for="p in filteredPatients" :key="p.id" :class="{active: selectedId === p.id}" @click="goToPatient(p)">
          <div class="mini-avatar" v-if="!p.persona?.fotografia">{{ getInitial(p) }}</div>
          <img v-else :src="p.persona.fotografia" class="mini-avatar-img" alt="Foto" />
          <div class="meta">
            <div class="name">{{ getFullName(p) }}</div>
            <div class="sub">🆔 {{ p.dni || p.persona?.dni || 'N/A' }}</div>
          </div>
          <div class="status-dot" :class="p.isActive ? 'active' : 'inactive'"></div>
        </li>
      </ul>
      <div class="sidebar-footer">
        <small>📊 {{ filteredPatients.length }} de {{ recentPatients.length }} pacientes</small>
      </div>
    </aside>

    <main class="content">
      <div class="card profile-card" v-if="selectedUserData">
        <!-- Header with photo and basic info -->
        <div class="profile-header-enhanced">
          <div class="header-left">
            <div class="avatar-large" v-if="!selectedUserData.persona?.fotografia">
              {{ getInitial(selectedUserData) }}
            </div>
            <img v-else :src="selectedUserData.persona.fotografia" class="avatar-large-img" alt="Foto del paciente" />
            
            <div class="header-info">
              <div class="name-section">
                <h2>{{ getFullName(selectedUserData) }}</h2>
                <div class="badges-row">
                  <span class="badge" :class="selectedUserData.isActive ? 'badge-active' : 'badge-inactive'">
                    {{ selectedUserData.isActive ? '✅ Activo' : '❌ Inactivo' }}
                  </span>
                  <span class="badge badge-category">{{ getAgeCategory(selectedUserData) }}</span>
                  <span class="badge badge-gender">{{ selectedUserData.persona?.sexo || 'N/E' }}</span>
                </div>
              </div>
              <div class="header-meta">
                <span>🆔 {{ selectedUserData.dni || selectedUserData.persona?.dni || 'N/A' }}</span>
                <span>•</span>
                <span>📅 {{ computeAge(selectedUserData.persona?.fecha_nacimiento || selectedUserData.fechaNacimiento) }}</span>
                <span>•</span>
                <span>📋 Exp. #{{ selectedUserData.numeroExpediente || selectedUserData.id?.slice(0,8) }}</span>
              </div>
            </div>
          </div>
          <div class="header-actions">
            <button class="btn-action btn-edit" @click="editCurrent">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
              </svg>
              Editar
            </button>
            <button class="btn-action btn-print" @click="printProfile">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" stroke="currentColor" stroke-width="2"/>
                <rect x="6" y="14" width="12" height="8" stroke="currentColor" stroke-width="2"/>
              </svg>
              Imprimir
            </button>
          </div>
        </div>

        <div class="profile-body">
          <div class="profile-grid">
            <!-- Datos Personales -->
            <section class="card-box">
              <h4>👤 Datos Personales</h4>
              <div class="row"><span class="label">Nombre completo</span><span>{{ getFullName(selectedUserData) }}</span></div>
              <div class="row"><span class="label">CI</span><span>{{ selectedUserData.dni || selectedUserData.persona?.dni || 'N/D' }}</span></div>
              <div class="row"><span class="label">Fecha de nacimiento</span><span>{{ formatDate(selectedUserData.persona?.fecha_nacimiento || selectedUserData.fechaNacimiento) }}</span></div>
              <div class="row"><span class="label">Edad</span><span>{{ computeAge(selectedUserData.persona?.fecha_nacimiento || selectedUserData.fechaNacimiento) }}</span></div>
              <div class="row"><span class="label">Sexo</span><span>{{ selectedUserData.persona?.sexo || 'N/D' }}</span></div>
              <div class="row"><span class="label">Estado civil</span><span>{{ selectedUserData.persona?.estado_civil || 'N/D' }}</span></div>
              <div class="row"><span class="label">Ocupación</span><span>{{ selectedUserData.persona?.ocupacion || selectedUserData.ocupacion || 'N/D' }}</span></div>
              <div class="row"><span class="label">Domicilio</span><span>{{ selectedUserData.persona?.domicilio || formatAddress(selectedUserData.direccion) || 'N/D' }}</span></div>
            </section>

            <!-- Contacto -->
            <section class="card-box">
              <h4>📱 Información de Contacto</h4>
              <div class="row"><span class="label">Teléfono</span><span>{{ selectedUserData.persona?.telefono || selectedUserData.telefono || 'N/D' }}</span></div>
              <div class="row"><span class="label">Correo electrónico</span><span>{{ selectedUserData.persona?.correo || selectedUserData.email || 'N/D' }}</span></div>
              <div class="row"><span class="label">Teléfono alternativo</span><span>{{ selectedUserData.telefono2 || 'N/D' }}</span></div>
              <div class="row"><span class="label">Preferencia</span><span>{{ selectedUserData.preferenciaContacto || 'N/D' }}</span></div>
            </section>

            <!-- Fotografías -->
            <section class="card-box wide" v-if="selectedUserData.persona?.fotografia || selectedUserData.persona?.foto_ci">
              <h4>📸 Fotografías</h4>
              <div class="photos-grid">
                <div class="photo-item" v-if="selectedUserData.persona?.fotografia">
                  <div class="photo-label">Fotografía del Paciente</div>
                  <img :src="selectedUserData.persona.fotografia" alt="Foto paciente" class="photo-display" />
                </div>
                <div class="photo-item" v-if="selectedUserData.persona?.foto_ci">
                  <div class="photo-label">Fotografía CI</div>
                  <img :src="selectedUserData.persona.foto_ci" alt="Foto CI" class="photo-display" />
                </div>
              </div>
            </section>

            <!-- Información Médica -->
            <section class="card-box wide">
              <h4>🏥 Información Médica</h4>
              <div class="medical-grid">
                <div class="medical-item">
                  <div class="medical-label">Estado de Adherencia</div>
                  <div class="medical-value">
                    <span class="badge-medical" :class="getMedicalStatusClass(selectedUserData.medicalInfo?.estadoAdherencia)">
                      {{ selectedUserData.medicalInfo?.estadoAdherencia || 'No especificado' }}
                    </span>
                  </div>
                </div>
                <div class="medical-item">
                  <div class="medical-label">Estado Actual</div>
                  <div class="medical-value">
                    <span class="badge-medical" :class="getMedicalStatusClass(selectedUserData.medicalInfo?.estadoActual)">
                      {{ selectedUserData.medicalInfo?.estadoActual || 'No especificado' }}
                    </span>
                  </div>
                </div>
                <div class="medical-item">
                  <div class="medical-label">Peso</div>
                  <div class="medical-value">{{ selectedUserData.medicalInfo?.peso ? selectedUserData.medicalInfo.peso + ' kg' : 'N/D' }}</div>
                </div>
                <div class="medical-item">
                  <div class="medical-label">Altura</div>
                  <div class="medical-value">{{ selectedUserData.medicalInfo?.altura ? selectedUserData.medicalInfo.altura + ' cm' : 'N/D' }}</div>
                </div>
                <div class="medical-item">
                  <div class="medical-label">Estado Físico</div>
                  <div class="medical-value">{{ selectedUserData.medicalInfo?.estadoFisico || 'N/D' }}</div>
                </div>
              </div>

              <!-- Alergias -->
              <div class="medical-section" v-if="selectedUserData.medicalInfo?.alergias?.length">
                <div class="section-title">🩺 Alergias</div>
                <div class="tags-container">
                  <span v-for="(alergia, idx) in selectedUserData.medicalInfo.alergias" :key="idx" class="tag tag-allergy">
                    {{ alergia }}
                  </span>
                </div>
              </div>

              <!-- Enfermedades -->
              <div class="medical-section" v-if="selectedUserData.medicalInfo?.enfermedades?.length">
                <div class="section-title">🦠 Enfermedades</div>
                <div class="tags-container">
                  <span v-for="(enfermedad, idx) in selectedUserData.medicalInfo.enfermedades" :key="idx" class="tag tag-disease">
                    {{ enfermedad }}
                  </span>
                </div>
              </div>

              <!-- Medicamentos -->
              <div class="medical-section" v-if="selectedUserData.medicalInfo?.medicamentos?.length">
                <div class="section-title">💊 Medicamentos</div>
                <div class="tags-container">
                  <span v-for="(med, idx) in selectedUserData.medicalInfo.medicamentos" :key="idx" class="tag tag-medication">
                    {{ med }}
                  </span>
                </div>
              </div>

              <!-- Tratamiento -->
              <div class="medical-section" v-if="selectedUserData.medicalInfo?.recetadoPor || selectedUserData.medicalInfo?.frecuenciaTratamiento">
                <div class="section-title">📋 Tratamiento</div>
                <div class="row"><span class="label">Recetado por</span><span>{{ selectedUserData.medicalInfo?.recetadoPor || 'N/D' }}</span></div>
                <div class="row"><span class="label">Frecuencia</span><span>{{ selectedUserData.medicalInfo?.frecuenciaTratamiento || 'N/D' }}</span></div>
                <div class="row"><span class="label">Condición de toma</span><span>{{ selectedUserData.medicalInfo?.condicionToma || 'N/D' }}</span></div>
              </div>

              <!-- Receta Photo -->
              <div class="medical-section" v-if="selectedUserData.medicalInfo?.foto_receta">
                <div class="section-title">📄 Receta Médica</div>
                <img :src="selectedUserData.medicalInfo.foto_receta" alt="Receta" class="photo-display" />
              </div>

              <!-- Observaciones -->
              <div class="medical-section" v-if="selectedUserData.medicalInfo?.observaciones">
                <div class="section-title">📝 Observaciones Médicas</div>
                <p class="observations-text">{{ selectedUserData.medicalInfo.observaciones }}</p>
              </div>
            </section>

            <!-- Responsable -->
            <section class="card-box wide" v-if="selectedUserData.responsable">
              <h4>👥 Tutor/Responsable</h4>
              <div class="responsable-layout">
                <div class="responsable-info">
                  <div class="row"><span class="label">Nombre</span><span>{{ getResponsableFullName(selectedUserData.responsable) }}</span></div>
                  <div class="row"><span class="label">Parentesco</span><span>{{ selectedUserData.responsable?.parentesco || 'N/D' }}</span></div>
                  <div class="row"><span class="label">CI</span><span>{{ selectedUserData.responsable?.dni || 'N/D' }}</span></div>
                  <div class="row"><span class="label">Teléfono</span><span>{{ selectedUserData.responsable?.telefono || 'N/D' }}</span></div>
                  <div class="row"><span class="label">Correo</span><span>{{ selectedUserData.responsable?.correo || selectedUserData.responsable?.email || 'N/D' }}</span></div>
                </div>
                <div class="responsable-photos" v-if="selectedUserData.responsable?.foto_responsable || selectedUserData.responsable?.foto_ci_responsable">
                  <div class="photo-item" v-if="selectedUserData.responsable?.foto_responsable">
                    <div class="photo-label">Foto Responsable</div>
                    <img :src="selectedUserData.responsable.foto_responsable" alt="Foto responsable" class="photo-display-sm" />
                  </div>
                  <div class="photo-item" v-if="selectedUserData.responsable?.foto_ci_responsable">
                    <div class="photo-label">CI Responsable</div>
                    <img :src="selectedUserData.responsable.foto_ci_responsable" alt="CI responsable" class="photo-display-sm" />
                  </div>
                </div>
              </div>
            </section>

            <!-- Seguro -->
            <section class="card-box" v-if="selectedUserData.seguro?.nombre">
              <h4>🏥 Seguro Médico</h4>
              <div class="row"><span class="label">Aseguradora</span><span>{{ selectedUserData.seguro?.nombre || 'N/D' }}</span></div>
              <div class="row"><span class="label">Número de póliza</span><span>{{ selectedUserData.seguro?.polid || 'N/D' }}</span></div>
            </section>

            <!-- Observaciones generales -->
            <section class="card-box wide" v-if="selectedUserData.observaciones">
              <h4>📝 Observaciones Generales</h4>
              <p class="observations-text">{{ selectedUserData.observaciones }}</p>
            </section>
          </div>
        </div>
      </div>

      <div v-else class="card">
        <p>No hay paciente seleccionado. Seleccione uno de la lista.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as AdminPatientService from '@/services/AdminPatientService'

const route = useRoute()
const router = useRouter()

// State local
const patients = ref([])
const loading = ref(false)
const selectedPatient = ref(null)
const searchPatients = ref('')

const selectedId = computed(() => route.query.id)

const recentPatients = computed(() => patients.value.slice(0, 50))

const filteredPatients = computed(() => {
  if (!searchPatients.value) return recentPatients.value
  
  const query = searchPatients.value.toLowerCase()
  return recentPatients.value.filter(p => {
    const nombres = (p.persona?.nombres || '').toLowerCase()
    const apellidos = (p.persona?.apellidos || '').toLowerCase()
    const dni = (p.dni || p.persona?.dni || '').toString()
    const email = (p.email || p.persona?.correo || '').toLowerCase()
    
    return nombres.includes(query) || 
           apellidos.includes(query) || 
           dni.includes(query) || 
           email.includes(query)
  })
})

const selectedUserData = computed(() => {
  if (selectedPatient.value) return selectedPatient.value
  // fallback: try to find in patients list
  return patients.value.find(u => u.id === route.query.id) || null
})

const getInitial = (u) => {
  if (!u) return 'U'
  const name = u.persona?.nombres || u.email || ''
  return name.charAt(0).toUpperCase() || 'U'
}

const getFullName = (u) => {
  if (!u) return 'Sin nombre'
  const n = `${u.persona?.nombres || ''}`.trim()
  const a = `${u.persona?.apellidos || ''}`.trim()
  return (n || a) ? `${n} ${a}`.trim() : (u.email || 'Usuario')
}

const getResponsableFullName = (resp) => {
  if (!resp) return 'N/D'
  const n = `${resp.nombres || ''}`.trim()
  const a = `${resp.apellidos || ''}`.trim()
  return (n || a) ? `${n} ${a}`.trim() : (resp.nombre || 'N/D')
}

const getAgeCategory = (patient) => {
  const age = computeAgeNumber(patient.persona?.fecha_nacimiento || patient.fechaNacimiento)
  if (age === null) return 'N/E'
  if (age < 12) return '👶 Niño'
  if (age < 18) return '🧒 Adolescente'
  if (age < 60) return '🧑 Adulto'
  return '👴 Adulto Mayor'
}

const getMedicalStatusClass = (status) => {
  if (!status) return ''
  const statusLower = status.toLowerCase()
  if (statusLower.includes('bueno') || statusLower.includes('excelente') || statusLower.includes('óptimo')) {
    return 'status-good'
  }
  if (statusLower.includes('regular') || statusLower.includes('moderado')) {
    return 'status-regular'
  }
  if (statusLower.includes('malo') || statusLower.includes('crítico') || statusLower.includes('deficiente')) {
    return 'status-bad'
  }
  return ''
}

const computeAgeNumber = (dob) => {
  if (!dob) return null
  try {
    let birthDate
    if (typeof dob === 'string') {
      birthDate = new Date(dob)
    } else if (dob.toDate) {
      birthDate = dob.toDate()
    } else if (dob instanceof Date) {
      birthDate = dob
    } else {
      return null
    }
    
    const now = new Date()
    let years = now.getFullYear() - birthDate.getFullYear()
    const m = now.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) years--
    return years >= 0 ? years : null
  } catch {
    return null
  }
}

const formatAddress = (d = {}) => {
  if (!d) return 'N/D'
  return [d.calle, d.numero, d.zona, d.ciudad, d.provincia].filter(Boolean).join(', ') || 'N/D'
}

const computeAge = (dob) => {
  if (!dob) return 'N/D'
  const b = new Date(dob)
  const now = new Date()
  let years = now.getFullYear() - b.getFullYear()
  const m = now.getMonth() - b.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) years--
  return years + ' años'
}

const formatChronic = (c = {}) => {
  if (!c) return 'N/D'
  const list = []
  if (c.diabetes) list.push('Diabetes')
  if (c.hipertension) list.push('Hipertensión')
  if (c.asma) list.push('Asma')
  if (c.cardiopatias) list.push('Cardiopatías')
  if (c.otras) list.push(c.otras)
  return list.length ? list.join(', ') : 'Ninguna registrada'
}

const formatDate = (iso) => {
  if (!iso) return 'N/D'
  try { return new Date(iso).toLocaleDateString('es-ES') } catch { return iso }
}

const goToPatient = (p) => {
  router.replace({ path: route.path, query: { id: p.id } })
  selectedPatient.value = p
}

const editCurrent = () => {
  if (!selectedId.value) return
  router.push({ name: 'admin-patient-edit', query: { editId: selectedId.value } }).catch(()=>{})
}

const printProfile = () => {
  const p = selectedUserData.value
  if (!p) return
  
  // Construir HTML profesional para impresión
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Perfil de Paciente - ${getFullName(p)}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        @page {
          size: A4;
          margin: 15mm;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 11pt;
          line-height: 1.4;
          color: #1e293b;
        }
        
        .print-header {
          text-align: center;
          padding: 20px 0;
          border-bottom: 3px solid #3b82f6;
          margin-bottom: 25px;
        }
        
        .print-header h1 {
          font-size: 24pt;
          color: #1e40af;
          margin-bottom: 5px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .print-header .subtitle {
          font-size: 12pt;
          color: #64748b;
          font-weight: 600;
        }
        
        .patient-photo {
          float: right;
          width: 120px;
          height: 140px;
          margin: 0 0 15px 15px;
          border: 3px solid #3b82f6;
          border-radius: 8px;
          object-fit: cover;
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        
        .no-photo {
          float: right;
          width: 120px;
          height: 140px;
          margin: 0 0 15px 15px;
          border: 3px dashed #cbd5e1;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          color: #94a3b8;
          font-size: 40pt;
        }
        
        .section {
          margin-bottom: 25px;
          page-break-inside: avoid;
        }
        
        .section-title {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          padding: 10px 15px;
          font-size: 13pt;
          font-weight: 700;
          margin-bottom: 15px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .section-icon {
          font-size: 16pt;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px 20px;
          margin-bottom: 10px;
        }
        
        .info-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px 15px;
          margin-bottom: 10px;
        }
        
        .info-item {
          padding: 8px;
          background: #f8fafc;
          border-left: 3px solid #3b82f6;
          border-radius: 4px;
        }
        
        .info-label {
          font-size: 9pt;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 3px;
        }
        
        .info-value {
          font-size: 11pt;
          color: #1e293b;
          font-weight: 600;
        }
        
        .info-value-highlight {
          font-size: 13pt;
          color: #1e40af;
          font-weight: 700;
        }
        
        .badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 9pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .badge-active {
          background: #d1fae5;
          color: #065f46;
          border: 1px solid #10b981;
        }
        
        .badge-inactive {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #ef4444;
        }
        
        .badge-primary {
          background: #dbeafe;
          color: #1e40af;
          border: 1px solid #3b82f6;
        }
        
        .badge-success {
          background: #d1fae5;
          color: #065f46;
          border: 1px solid #10b981;
        }
        
        .badge-warning {
          background: #fef3c7;
          color: #92400e;
          border: 1px solid #f59e0b;
        }
        
        .badge-danger {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #ef4444;
        }
        
        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }
        
        .tag {
          padding: 5px 12px;
          background: #e0e7ff;
          color: #3730a3;
          border-radius: 15px;
          font-size: 9pt;
          font-weight: 600;
          border: 1px solid #818cf8;
        }
        
        .tag-danger {
          background: #fee2e2;
          color: #991b1b;
          border-color: #ef4444;
        }
        
        .tag-purple {
          background: #f3e8ff;
          color: #6b21a8;
          border-color: #a855f7;
        }
        
        .full-width {
          grid-column: 1 / -1;
        }
        
        .status-banner {
          padding: 12px 15px;
          background: ${p.isActive ? '#d1fae5' : '#fee2e2'};
          border-left: 4px solid ${p.isActive ? '#10b981' : '#ef4444'};
          border-radius: 6px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
        }
        
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #e5e7eb;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          text-align: center;
        }
        
        .footer-item {
          padding: 12px;
          background: #f8fafc;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }
        
        .footer-label {
          font-size: 9pt;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .footer-value {
          font-size: 11pt;
          color: #1e293b;
          font-weight: 700;
          margin-top: 5px;
        }
        
        .signature-section {
          margin-top: 40px;
          display: flex;
          justify-content: space-around;
          gap: 40px;
        }
        
        .signature-box {
          text-align: center;
          flex: 1;
        }
        
        .signature-line {
          border-top: 2px solid #1e293b;
          margin: 60px 20px 10px 20px;
        }
        
        .signature-label {
          font-size: 10pt;
          color: #475569;
          font-weight: 600;
        }
        
        .print-timestamp {
          text-align: center;
          margin-top: 25px;
          padding-top: 15px;
          border-top: 1px dashed #cbd5e1;
          font-size: 9pt;
          color: #94a3b8;
        }
        
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      </style>
    </head>
    <body>
      <!-- Header -->
      <div class="print-header">
        <h1>🏥 Perfil Clínico de Paciente</h1>
        <div class="subtitle">Sistema de Gestión Médica - VitalRecorder</div>
      </div>
      
      <!-- Foto del paciente (omitida en impresión) -->
      ${''}
      
      <!-- Banner de Estado -->
      <div class="status-banner">
        <span style="font-size: 18pt;">${p.isActive ? '✅' : '❌'}</span>
        <span>Estado del Paciente: <strong>${p.isActive ? 'ACTIVO' : 'INACTIVO'}</strong></span>
      </div>
      
      <!-- Información Personal -->
      <div class="section">
        <div class="section-title">
          <span class="section-icon">👤</span>
          Información Personal
        </div>
        <div class="info-grid">
          <div class="info-item full-width">
            <div class="info-label">Nombre Completo</div>
            <div class="info-value-highlight">${getFullName(p)}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Cédula de Identidad</div>
            <div class="info-value">🆔 ${p.dni || p.persona?.dni || 'N/A'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">N° Expediente</div>
            <div class="info-value">📋 ${p.numeroExpediente || p.expediente || p.id?.slice(0,8) || 'N/A'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Fecha de Nacimiento</div>
            <div class="info-value">${formatDate(p.persona?.fecha_nacimiento || p.fechaNacimiento) || 'N/D'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Edad</div>
            <div class="info-value">${computeAge(p.persona?.fecha_nacimiento || p.fechaNacimiento) || 'N/A'} <span class="badge badge-primary">${getAgeCategory(p)}</span></div>
          </div>
          <div class="info-item">
            <div class="info-label">Sexo/Género</div>
            <div class="info-value">${p.persona?.sexo || 'N/D'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Estado Civil</div>
            <div class="info-value">${p.persona?.estado_civil || p.estadoCivil || 'N/D'}</div>
          </div>
          ${p.lugarNacimiento || p.persona?.lugar_nacimiento ? `
          <div class="info-item">
            <div class="info-label">Lugar de Nacimiento</div>
            <div class="info-value">📍 ${p.lugarNacimiento || p.persona?.lugar_nacimiento}</div>
          </div>
          ` : ''}
          ${p.ocupacion || p.persona?.ocupacion ? `
          <div class="info-item">
            <div class="info-label">Ocupación</div>
            <div class="info-value">💼 ${p.ocupacion || p.persona?.ocupacion}</div>
          </div>
          ` : ''}
        </div>
      </div>
      
      <!-- Información de Contacto -->
      <div class="section">
        <div class="section-title">
          <span class="section-icon">📞</span>
          Información de Contacto
        </div>
        <div class="info-grid-3">
          <div class="info-item">
            <div class="info-label">Teléfono Principal</div>
            <div class="info-value">📱 ${p.telefono || p.persona?.telefono || 'N/A'}</div>
          </div>
          ${p.telefono2 ? `
          <div class="info-item">
            <div class="info-label">Teléfono Secundario</div>
            <div class="info-value">📱 ${p.telefono2}</div>
          </div>
          ` : ''}
          <div class="info-item">
            <div class="info-label">Email</div>
            <div class="info-value">📧 ${p.email || p.persona?.correo || 'N/A'}</div>
          </div>
          ${p.preferenciaContacto ? `
          <div class="info-item">
            <div class="info-label">Preferencia de Contacto</div>
            <div class="info-value">✨ ${p.preferenciaContacto}</div>
          </div>
          ` : ''}
          <div class="info-item full-width">
            <div class="info-label">Dirección / Domicilio</div>
            <div class="info-value">🏠 ${p.persona?.domicilio || formatAddress(p.direccion) || 'N/D'}</div>
          </div>
        </div>
      </div>
      
      <!-- Información Médica -->
      <div class="section">
        <div class="section-title">
          <span class="section-icon">🏥</span>
          Información Médica
        </div>
        <div class="info-grid">
          ${p.medicalInfo?.estadoActual ? `
          <div class="info-item">
            <div class="info-label">Estado Actual</div>
            <div class="info-value"><span class="badge badge-success">${p.medicalInfo.estadoActual}</span></div>
          </div>
          ` : ''}
          ${p.medicalInfo?.estadoAdherencia ? `
          <div class="info-item">
            <div class="info-label">Adherencia al Tratamiento</div>
            <div class="info-value"><span class="badge badge-primary">${p.medicalInfo.estadoAdherencia}</span></div>
          </div>
          ` : ''}
          ${p.medicalInfo?.bloodGroup ? `
          <div class="info-item">
            <div class="info-label">Tipo de Sangre</div>
            <div class="info-value">🩸 ${p.medicalInfo.bloodGroup}</div>
          </div>
          ` : ''}
          ${p.medicalInfo?.peso ? `
          <div class="info-item">
            <div class="info-label">Peso</div>
            <div class="info-value">⚖️ ${p.medicalInfo.peso} kg</div>
          </div>
          ` : ''}
          ${p.medicalInfo?.altura ? `
          <div class="info-item">
            <div class="info-label">Altura</div>
            <div class="info-value">📏 ${p.medicalInfo.altura} cm</div>
          </div>
          ` : ''}
          ${p.medicalInfo?.imc ? `
          <div class="info-item">
            <div class="info-label">IMC</div>
            <div class="info-value"><span class="badge badge-warning">${p.medicalInfo.imc}</span></div>
          </div>
          ` : ''}
          ${p.medicalInfo?.estadoFisico ? `
          <div class="info-item">
            <div class="info-label">Estado Físico</div>
            <div class="info-value">${p.medicalInfo.estadoFisico}</div>
          </div>
          ` : ''}
        </div>
        
        ${(p.medicalInfo?.alergias && p.medicalInfo.alergias.length > 0) || (p.medicalInfo?.allergies && p.medicalInfo.allergies.length > 0) ? `
        <div class="info-item full-width" style="margin-top: 15px;">
          <div class="info-label">⚠️ Alergias Registradas</div>
          <div class="tags-container">
            ${(p.medicalInfo?.alergias || p.medicalInfo?.allergies || []).map(a => `<span class="tag tag-danger">${a}</span>`).join('')}
          </div>
        </div>
        ` : ''}
        
        ${(p.medicalInfo?.enfermedades && p.medicalInfo.enfermedades.length > 0) || formatChronic(p.medicalInfo?.chronic) !== 'N/D' ? `
        <div class="info-item full-width" style="margin-top: 15px;">
          <div class="info-label">🩺 Enfermedades/Condiciones Crónicas</div>
          <div class="tags-container">
            ${p.medicalInfo?.enfermedades ? p.medicalInfo.enfermedades.map(e => `<span class="tag tag-purple">${e}</span>`).join('') : `<span class="tag tag-purple">${formatChronic(p.medicalInfo?.chronic)}</span>`}
          </div>
        </div>
        ` : ''}
        
        ${p.medicalInfo?.medicamentos && p.medicalInfo.medicamentos.length > 0 ? `
        <div class="info-item full-width" style="margin-top: 15px;">
          <div class="info-label">💊 Medicamentos Actuales</div>
          <div class="tags-container">
            ${p.medicalInfo.medicamentos.map(m => `<span class="tag">${m}</span>`).join('')}
          </div>
        </div>
        ` : ''}
        
        ${p.medicalInfo?.frecuenciaTratamiento || p.medicalInfo?.condicionToma ? `
        <div class="info-grid" style="margin-top: 15px;">
          ${p.medicalInfo.frecuenciaTratamiento ? `
          <div class="info-item">
            <div class="info-label">Frecuencia de Tratamiento</div>
            <div class="info-value">⏰ ${p.medicalInfo.frecuenciaTratamiento}</div>
          </div>
          ` : ''}
          ${p.medicalInfo.condicionToma ? `
          <div class="info-item">
            <div class="info-label">Condición de Toma</div>
            <div class="info-value">🍽️ ${p.medicalInfo.condicionToma}</div>
          </div>
          ` : ''}
        </div>
        ` : ''}
        
        ${p.medicalInfo?.recetadoPor ? `
        <div class="info-item full-width" style="margin-top: 15px;">
          <div class="info-label">Recetado/Tratado por</div>
          <div class="info-value">👨‍⚕️ Dr./Dra. ${p.medicalInfo.recetadoPor}</div>
        </div>
        ` : ''}
        
        ${p.medicalInfo?.antecedentesFamiliares ? `
        <div class="info-item full-width" style="margin-top: 15px;">
          <div class="info-label">Antecedentes Familiares</div>
          <div class="info-value">${p.medicalInfo.antecedentesFamiliares}</div>
        </div>
        ` : ''}
        
        ${p.medicalInfo?.observaciones ? `
        <div class="info-item full-width" style="margin-top: 15px;">
          <div class="info-label">Observaciones Médicas</div>
          <div class="info-value">${p.medicalInfo.observaciones}</div>
        </div>
        ` : ''}
      </div>
      
      ${p.responsable && (p.responsable.nombres || p.responsable.nombre) ? `
      <!-- Tutor/Responsable -->
      <div class="section">
        <div class="section-title">
          <span class="section-icon">👨‍👩‍👧‍👦</span>
          Tutor / Familiar Responsable
        </div>
        <div class="info-grid">
          <div class="info-item full-width">
            <div class="info-label">Nombre Completo</div>
            <div class="info-value-highlight">${p.responsable.nombres || p.responsable.nombre || ''} ${p.responsable.apellidos || ''}</div>
          </div>
          ${p.responsable.parentesco ? `
          <div class="info-item">
            <div class="info-label">Parentesco</div>
            <div class="info-value"><span class="badge badge-primary">${p.responsable.parentesco}</span></div>
          </div>
          ` : ''}
          ${p.responsable.ci ? `
          <div class="info-item">
            <div class="info-label">CI</div>
            <div class="info-value">🆔 ${p.responsable.ci}</div>
          </div>
          ` : ''}
          ${p.responsable.telefono ? `
          <div class="info-item">
            <div class="info-label">Teléfono</div>
            <div class="info-value">📱 ${p.responsable.telefono}</div>
          </div>
          ` : ''}
          ${p.responsable.email ? `
          <div class="info-item">
            <div class="info-label">Email</div>
            <div class="info-value">📧 ${p.responsable.email}</div>
          </div>
          ` : ''}
          ${p.responsable.domicilio ? `
          <div class="info-item full-width">
            <div class="info-label">Domicilio</div>
            <div class="info-value">🏠 ${p.responsable.domicilio}</div>
          </div>
          ` : ''}
          ${p.responsable.ocupacion ? `
          <div class="info-item">
            <div class="info-label">Ocupación</div>
            <div class="info-value">💼 ${p.responsable.ocupacion}</div>
          </div>
          ` : ''}
          ${p.responsable.estado_civil ? `
          <div class="info-item">
            <div class="info-label">Estado Civil</div>
            <div class="info-value">${p.responsable.estado_civil}</div>
          </div>
          ` : ''}
        </div>
      </div>
      ` : ''}
      
      ${p.seguro && (p.seguro.nombre || p.seguro.polid) ? `
      <!-- Información de Seguro -->
      <div class="section">
        <div class="section-title">
          <span class="section-icon">🛡️</span>
          Información de Seguro Médico
        </div>
        <div class="info-grid">
          ${p.seguro.nombre ? `
          <div class="info-item">
            <div class="info-label">Aseguradora</div>
            <div class="info-value">🏢 ${p.seguro.nombre}</div>
          </div>
          ` : ''}
          ${p.seguro.polid ? `
          <div class="info-item">
            <div class="info-label">N° de Póliza</div>
            <div class="info-value">📄 ${p.seguro.polid}</div>
          </div>
          ` : ''}
        </div>
      </div>
      ` : ''}
      
      ${p.observaciones ? `
      <!-- Observaciones Generales -->
      <div class="section">
        <div class="section-title">
          <span class="section-icon">📝</span>
          Observaciones Generales
        </div>
        <div class="info-item full-width">
          <div class="info-value">${p.observaciones}</div>
        </div>
      </div>
      ` : ''}
      
      <!-- Footer -->
      <div class="footer">
        <div class="footer-item">
          <div class="footer-label">Estado</div>
          <div class="footer-value"><span class="badge ${p.isActive ? 'badge-active' : 'badge-inactive'}">${p.isActive ? 'Activo' : 'Inactivo'}</span></div>
        </div>
        <div class="footer-item">
          <div class="footer-label">Registrado Por</div>
          <div class="footer-value">👤 ${p.usuarioRegistro || 'Sistema'}</div>
        </div>
        <div class="footer-item">
          <div class="footer-label">Fecha de Registro</div>
          <div class="footer-value">📅 ${p.createdAt ? new Date(p.createdAt).toLocaleDateString('es-ES') : 'N/D'}</div>
        </div>
      </div>
      
      <!-- Sección de Firmas -->
      <div class="signature-section">
        <div class="signature-box">
          <div class="signature-line"></div>
          <div class="signature-label">Firma del Médico Tratante</div>
        </div>
        <div class="signature-box">
          <div class="signature-line"></div>
          <div class="signature-label">Firma del Paciente / Responsable</div>
        </div>
      </div>
      
      <!-- Timestamp -->
      <div class="print-timestamp">
        Documento generado el ${new Date().toLocaleDateString('es-ES', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })} a las ${new Date().toLocaleTimeString('es-ES')}
      </div>
    </body>
    </html>
  `
  
  const w = window.open('', '_blank')
  if (!w) return
  w.document.write(html)
  w.document.close()
  w.focus()
  
  // Dar tiempo para que las imágenes se carguen antes de imprimir
  setTimeout(() => {
    w.print()
  }, 250)
}

// Cargar pacientes desde Firebase
const loadPatients = async () => {
  try {
    loading.value = true
    console.log("🔄 [PatientPerfil] Cargando pacientes desde Firebase...")
    const list = await AdminPatientService.listPatients()
    patients.value = list || []
    console.log("✅ [PatientPerfil] Pacientes cargados:", patients.value.length)
    
    // Si hay un id en la URL, seleccionar ese paciente
    if (route.query.id) {
      selectedPatient.value = patients.value.find(p => p.id === route.query.id)
      console.log("👤 [PatientPerfil] Paciente seleccionado:", selectedPatient.value)
    }
  } catch (err) {
    console.error("❌ [PatientPerfil] Error cargando pacientes:", err)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadPatients()
})

// react to query change
watch(() => route.query.id, (id) => {
  if (id) {
    selectedPatient.value = patients.value.find(p => p.id === id)
    console.log("👤 [PatientPerfil] Cambio de paciente:", selectedPatient.value)
  }
})
</script>

<style scoped>
.admin-page { 
  padding: 1.5rem; 
  display: flex; 
  gap: 1.5rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  min-height: 100vh;
}
.layout-two-col { align-items: flex-start; }

/* Sidebar */
.sidebar { 
  width: 320px; 
  background: white;
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  position: sticky;
  top: 1.5rem;
  max-height: calc(100vh - 3rem);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  margin-bottom: 1rem;
}

.sidebar-header h3 {
  margin: 0 0 0.75rem 0;
  font-size: 1.1rem;
  color: #0f172a;
}

.search-patients {
  width: 90%;
  padding: 0.65rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.search-patients:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.patient-list { 
  list-style: none; 
  padding: 0; 
  margin: 0; 
  display: flex; 
  flex-direction: column; 
  gap: 0.5rem;
  overflow-y: auto;
  flex: 1;
}

.patient-list li { 
  display: flex; 
  gap: 0.75rem; 
  align-items: center; 
  padding: 0.75rem; 
  border-radius: 12px; 
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.patient-list li:hover { 
  background: #f1f5f9;
  transform: translateX(4px);
}

.patient-list li.active { 
  background: linear-gradient(135deg, #dbeafe, #e0e7ff);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.mini-avatar { 
  width: 44px; 
  height: 44px; 
  border-radius: 50%; 
  background: linear-gradient(135deg, #3b82f6, #1d4ed8); 
  color: white; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  font-weight: 600;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.mini-avatar-img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 2px solid #e0e7ff;
}

.meta { 
  flex: 1;
  min-width: 0;
}

.meta .name { 
  font-weight: 600;
  color: #0f172a;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta .sub { 
  color: #64748b; 
  font-size: 0.82rem;
  margin-top: 2px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-dot.active {
  background: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.4);
}

.status-dot.inactive {
  background: #ef4444;
}

.sidebar-footer { 
  margin-top: 1rem; 
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
  color: #64748b;
  font-size: 0.85rem;
}

/* Content */
.content { 
  flex: 1;
  min-width: 0;
}

.profile-card { 
  background: white;
  padding: 0;
  border-radius: 16px; 
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  overflow: hidden;
}

/* Enhanced Header */
.profile-header-enhanced {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
}

.header-left {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex: 1;
}

.avatar-large {
  width: 96px;
  height: 96px;
  border-radius: 16px;
  background: white;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 700;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
}

.avatar-large-img {
  width: 96px;
  height: 96px;
  border-radius: 16px;
  object-fit: cover;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border: 3px solid white;
  flex-shrink: 0;
}

.header-info {
  color: white;
}

.name-section h2 {
  margin: 0 0 0.75rem 0;
  font-size: 1.75rem;
  color: white;
  font-weight: 700;
}

.badges-row {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.badge {
  padding: 0.35rem 0.85rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.badge-active {
  background: rgba(34, 197, 94, 0.2);
  color: #dcfce7;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.badge-inactive {
  background: rgba(239, 68, 68, 0.2);
  color: #fecaca;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.badge-category {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.badge-gender {
  background: rgba(168, 85, 247, 0.2);
  color: #e9d5ff;
  border: 1px solid rgba(168, 85, 247, 0.3);
}

.header-meta {
  display: flex;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  flex-wrap: wrap;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-action {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.btn-edit {
  background: white;
  color: #3b82f6;
}

.btn-edit:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.btn-print {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.btn-print:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Profile Body */
.profile-body {
  padding: 2rem;
}

.profile-grid { 
  display: grid; 
  grid-template-columns: repeat(2, 1fr); 
  gap: 1.25rem;
}

.card-box { 
  background: #f8fafc;
  padding: 1.5rem; 
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
}

.card-box:hover {
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
  transform: translateY(-2px);
}

.card-box.wide { 
  grid-column: 1 / -1;
}

.card-box h4 { 
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: #0f172a;
  font-weight: 700;
}

.row { 
  display: flex; 
  gap: 1rem; 
  padding: 0.65rem 0;
  align-items: flex-start;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
}

.row:last-child {
  border-bottom: none;
}

.row .label { 
  width: 40%;
  font-weight: 600;
  color: #475569;
  font-size: 0.9rem;
}

.row span:last-child {
  flex: 1;
  color: #0f172a;
  font-size: 0.9rem;
}

/* Medical Info Styles */
.medical-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.medical-item {
  background: white;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
}

.medical-label {
  font-size: 0.82rem;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.medical-value {
  font-size: 1rem;
  color: #0f172a;
  font-weight: 600;
}

.badge-medical {
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-block;
}

.status-good {
  background: #dcfce7;
  color: #166534;
}

.status-regular {
  background: #fef3c7;
  color: #92400e;
}

.status-bad {
  background: #fee2e2;
  color: #991b1b;
}

.medical-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #e2e8f0;
}

.section-title {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.75rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.tag-allergy {
  background: linear-gradient(135deg, #fef3c7, #fed7aa);
  color: #92400e;
  border: 1px solid #fbbf24;
}

.tag-disease {
  background: linear-gradient(135deg, #fce7f3, #fbcfe8);
  color: #831843;
  border: 1px solid #ec4899;
}

.tag-medication {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  color: #065f46;
  border: 1px solid #10b981;
}

.observations-text {
  background: white;
  padding: 1rem;
  border-radius: 10px;
  border-left: 4px solid #3b82f6;
  color: #334155;
  line-height: 1.6;
  margin: 0;
}

/* Photos */
.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.photo-item {
  text-align: center;
}

.photo-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.photo-display {
  width: 100%;
  max-width: 400px;
  height: auto;
  max-height: 350px;
  object-fit: contain;
  border-radius: 12px;
  border: 3px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
}

.photo-display-sm {
  width: 100%;
  max-width: 200px;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #e2e8f0;
}

/* Responsable Layout */
.responsable-layout {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: start;
}

.responsable-photos {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

@media (max-width: 1200px) {
  .profile-grid {
    grid-template-columns: 1fr;
  }
  
  .responsable-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .admin-page { 
    flex-direction: column;
  }
  
  .sidebar { 
    width: 100%;
    position: relative;
    top: 0;
    max-height: none;
  }
  
  .profile-header-enhanced {
    flex-direction: column;
  }
  
  .header-actions {
    width: 100%;
    flex-direction: column;
  }
  
  .btn-action {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .header-left {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
  
  .badges-row {
    justify-content: center;
  }
  
  .header-meta {
    justify-content: center;
  }
}
</style>