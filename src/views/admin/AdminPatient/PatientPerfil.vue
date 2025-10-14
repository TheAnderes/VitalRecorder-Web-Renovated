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
  const logoPath = '/Logo.png'
  const html = `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <title>Ficha Clínica - ${getFullName(p)}</title>
    <style>
      @page { size: A4; margin: 20mm }
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color: #0f172a; }
      .container { max-width: 820px; margin: 0 auto; }
      .header { display:flex; align-items:center; gap:16px; border-bottom:2px solid #e6eef8; padding-bottom:12px; margin-bottom:18px }
      .logo { width:84px; height:84px; object-fit:contain }
      h1 { font-size:20px; margin:0 }
      .meta { color:#4b5563; margin-top:6px }
      .grid { display:grid; grid-template-columns: repeat(2, 1fr); gap:12px }
      .card { border:1px solid #e6eef8; padding:12px; border-radius:6px; background:#fff }
      .card h3 { margin:0 0 8px 0; font-size:14px }
      .row { display:flex; gap:8px; padding:6px 0; border-bottom:1px dashed rgba(15,23,42,0.04) }
      .row:last-child { border-bottom:none }
      .label { width:36%; font-weight:700; color:#0f172a }
      .value { color:#0f172a }
      .full { grid-column: 1 / -1 }
      .footer { margin-top:18px; display:flex; justify-content:space-between; align-items:center }
      .signature { width:45%; text-align:center }
      .small { color:#6b7280; font-size:12px }
      @media print {
        body { -webkit-print-color-adjust: exact }
        .container { box-shadow:none }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="${logoPath}" alt="Logo" class="logo" />
        <div>
          <h1>Ficha Clínica - ${getFullName(p)}</h1>
          <div class="meta">ID: ${p.id} · DNI: ${p.dni || 'N/A'} · Registro: ${p.createdAt ? new Date(p.createdAt).toLocaleString('es-ES') : 'N/D'}</div>
        </div>
      </div>

      <div class="grid">
        <div class="card">
          <h3>Datos Personales</h3>
          <div class="row"><div class="label">Nombre</div><div class="value">${getFullName(p)}</div></div>
          <div class="row"><div class="label">Documento</div><div class="value">${p.dni || 'N/D'}</div></div>
          <div class="row"><div class="label">Fecha Nac.</div><div class="value">${formatDate(p.fechaNacimiento)}</div></div>
          <div class="row"><div class="label">Edad</div><div class="value">${computeAge(p.fechaNacimiento)}</div></div>
          <div class="row"><div class="label">Sexo</div><div class="value">${p.persona?.sexo || 'N/D'}</div></div>
          <div class="row"><div class="label">Ocupación</div><div class="value">${p.ocupacion || 'N/D'}</div></div>
        </div>

        <div class="card">
          <h3>Contacto</h3>
          <div class="row"><div class="label">Teléfono</div><div class="value">${p.telefono || 'N/D'}</div></div>
          <div class="row"><div class="label">Teléfono alt.</div><div class="value">${p.telefono2 || 'N/D'}</div></div>
          <div class="row"><div class="label">Email</div><div class="value">${p.email || 'N/D'}</div></div>
          <div class="row"><div class="label">Dirección</div><div class="value">${formatAddress(p.direccion)}</div></div>
        </div>

        <div class="card">
          <h3>Responsable</h3>
          <div class="row"><div class="label">Nombre</div><div class="value">${p.responsable?.nombre || 'N/D'}</div></div>
          <div class="row"><div class="label">Parentesco</div><div class="value">${p.responsable?.parentesco || 'N/D'}</div></div>
          <div class="row"><div class="label">Teléfono</div><div class="value">${p.responsable?.telefono || 'N/D'}</div></div>
          <div class="row"><div class="label">Email</div><div class="value">${p.responsable?.email || 'N/D'}</div></div>
        </div>

        <div class="card full">
          <h3>Información Médica</h3>
          <div class="row"><div class="label">Tipo de sangre</div><div class="value">${p.medicalInfo?.bloodGroup || 'N/D'}</div></div>
          <div class="row"><div class="label">Peso</div><div class="value">${p.medicalInfo?.peso ? p.medicalInfo.peso + ' kg' : 'N/D'}</div></div>
          <div class="row"><div class="label">Altura</div><div class="value">${p.medicalInfo?.altura ? p.medicalInfo.altura + ' cm' : 'N/D'}</div></div>
          <div class="row"><div class="label">IMC</div><div class="value">${p.medicalInfo?.imc || 'N/D'}</div></div>
          <div class="row"><div class="label">Condiciones</div><div class="value">${formatChronic(p.medicalInfo?.chronic)}</div></div>
          <div class="row"><div class="label">Alergias</div><div class="value">${(p.medicalInfo?.allergies?.length && p.medicalInfo.medicalInfo?.allergies?.join(', ')) || (p.medicalInfo?.allergies?.join(', ') || 'Ninguna')}</div></div>
          <div class="row"><div class="label">Antecedentes familiares</div><div class="value">${p.medicalInfo?.antecedentesFamiliares || 'N/D'}</div></div>
        </div>

        <div class="card full">
          <h3>Seguro / Administrativo</h3>
          <div class="row"><div class="label">Aseguradora</div><div class="value">${p.seguro?.nombre || 'N/D'}</div></div>
          <div class="row"><div class="label">Póliza</div><div class="value">${p.seguro?.polid || 'N/D'}</div></div>
          <div class="row"><div class="label">Usuario Registro</div><div class="value">${p.usuarioRegistro || 'Sistema'}</div></div>
        </div>

        <div class="card full">
          <h3>Observaciones</h3>
          <div class="value">${p.observaciones || 'Sin observaciones'}</div>
        </div>

      </div>

      <div class="footer">
        <div class="small">Generado: ${new Date().toLocaleString('es-ES')}</div>
        <div class="signature">
          <div>__________________________</div>
          <div>Firma del Profesional</div>
        </div>
      </div>
    </div>
  </body>
  </html>`

  const w = window.open('', '_blank')
  if (!w) return
  w.document.write(html)
  w.document.close()
  w.focus()
  setTimeout(() => w.print(), 400)
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