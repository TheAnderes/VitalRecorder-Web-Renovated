<template>
  <div class="admin-page patient-perfil layout-two-col">
    <aside class="sidebar">
      <h3>Pacientes (recientes)</h3>
      <ul class="patient-list">
        <li v-for="p in recentPatients" :key="p.id" :class="{active: selectedId === p.id}" @click="goToPatient(p)">
          <div class="mini-avatar">{{ getInitial(p) }}</div>
          <div class="meta">
            <div class="name">{{ getFullName(p) }}</div>
            <div class="sub">DNI: {{ p.dni || 'N/A' }}</div>
          </div>
        </li>
      </ul>
      <div class="sidebar-footer">
        <small>Mostrando {{ recentPatients.length }} pacientes</small>
      </div>
    </aside>

    <main class="content">
      <div class="card profile-card" v-if="selectedUserData">
        <div class="profile-header">
          <div class="avatar">{{ getInitial(selectedUserData) }}</div>
          <div>
            <h2>{{ getFullName(selectedUserData) }}</h2>
            <div class="muted">ID: {{ selectedUserData.id }} · DNI: {{ selectedUserData.dni || 'N/A' }}</div>
          </div>
        </div>

        <div class="profile-body">
          <div class="profile-grid">
            <section class="card-box">
              <h4>Datos Personales</h4>
              <div class="row"><span class="label">Nombre</span><span>{{ getFullName(selectedUserData) }}</span></div>
              <div class="row"><span class="label">Documento</span><span>{{ selectedUserData.dni || 'N/D' }}</span></div>
              <div class="row"><span class="label">Fecha de Nacimiento</span><span>{{ formatDate(selectedUserData.fechaNacimiento) }}</span></div>
              <div class="row"><span class="label">Edad</span><span>{{ computeAge(selectedUserData.fechaNacimiento) }}</span></div>
              <div class="row"><span class="label">Sexo</span><span>{{ selectedUserData.persona?.sexo || 'N/D' }}</span></div>
              <div class="row"><span class="label">Ocupación</span><span>{{ selectedUserData.ocupacion || 'N/D' }}</span></div>
              <div class="row"><span class="label">Lugar de nacimiento</span><span>{{ selectedUserData.lugarNacimiento || 'N/D' }}</span></div>
            </section>

            <section class="card-box">
              <h4>Contacto</h4>
              <div class="row"><span class="label">Teléfono</span><span>{{ selectedUserData.telefono || 'N/D' }}</span></div>
              <div class="row"><span class="label">Teléfono alternativo</span><span>{{ selectedUserData.telefono2 || 'N/D' }}</span></div>
              <div class="row"><span class="label">Email</span><span>{{ selectedUserData.email || 'N/D' }}</span></div>
              <div class="row"><span class="label">Preferencia</span><span>{{ selectedUserData.preferenciaContacto || 'N/D' }}</span></div>
              <div class="row"><span class="label">Dirección</span><span>{{ formatAddress(selectedUserData.direccion) }}</span></div>
            </section>

            <section class="card-box">
              <h4>Responsable</h4>
              <div class="row"><span class="label">Nombre</span><span>{{ selectedUserData.responsable?.nombre || 'N/D' }}</span></div>
              <div class="row"><span class="label">Parentesco</span><span>{{ selectedUserData.responsable?.parentesco || 'N/D' }}</span></div>
              <div class="row"><span class="label">Teléfono</span><span>{{ selectedUserData.responsable?.telefono || 'N/D' }}</span></div>
              <div class="row"><span class="label">Email</span><span>{{ selectedUserData.responsable?.email || 'N/D' }}</span></div>
              <div class="row"><span class="label">Dirección</span><span>{{ selectedUserData.responsable?.direccion || 'N/D' }}</span></div>
            </section>

            <section class="card-box wide">
              <h4>Información Médica</h4>
              <div class="row"><span class="label">Tipo de sangre</span><span>{{ selectedUserData.medicalInfo?.bloodGroup || 'N/D' }}</span></div>
              <div class="row"><span class="label">Peso</span><span>{{ selectedUserData.medicalInfo?.peso ? selectedUserData.medicalInfo.peso + ' kg' : 'N/D' }}</span></div>
              <div class="row"><span class="label">Altura</span><span>{{ selectedUserData.medicalInfo?.altura ? selectedUserData.medicalInfo.altura + ' cm' : 'N/D' }}</span></div>
              <div class="row"><span class="label">IMC</span><span>{{ selectedUserData.medicalInfo?.imc || 'N/D' }}</span></div>
              <div class="row"><span class="label">Condiciones crónicas</span><span>{{ formatChronic(selectedUserData.medicalInfo?.chronic) }}</span></div>
              <div class="row"><span class="label">Alergias</span><span>{{ (selectedUserData.medicalInfo?.allergies?.length && selectedUserData.medicalInfo.allergies.join(', ')) || 'Ninguna registrada' }}</span></div>
              <div class="row"><span class="label">Antecedentes familiares</span><span>{{ selectedUserData.medicalInfo?.antecedentesFamiliares || 'N/D' }}</span></div>
            </section>

            <section class="card-box">
              <h4>Seguro</h4>
              <div class="row"><span class="label">Aseguradora</span><span>{{ selectedUserData.seguro?.nombre || 'N/D' }}</span></div>
              <div class="row"><span class="label">Número de póliza</span><span>{{ selectedUserData.seguro?.polid || 'N/D' }}</span></div>
            </section>

            <section class="card-box wide">
              <h4>Observaciones y notas</h4>
              <p>{{ selectedUserData.observaciones || 'Sin observaciones' }}</p>
            </section>
          </div>

          <div class="actions">
            
            <button class="primary" @click="printProfile">Imprimir Ficha</button>
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
import { computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'

const route = useRoute()
const router = useRouter()
const adminStore = useAdminStore()

const selectedId = computed(() => route.query.id || (adminStore.selectedUser?.value?.id))

const recentPatients = computed(() => (adminStore.users?.value || []).slice(0, 20))

const selectedUserData = computed(() => {
  if (adminStore.selectedUser?.value) return adminStore.selectedUser.value
  // fallback: try to find in users list
  const list = adminStore.users?.value || []
  return list.find(u => u.id === (route.query.id)) || null
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
  // ensure store selects the user (for detail fetch)
  if (typeof adminStore.selectUser === 'function') adminStore.selectUser(p.id)
}

const editCurrent = () => {
  // placeholder: navigate to edit route if exists
  router.push({ name: 'AdminPatientEdit', query: { id: selectedId.value } }).catch(()=>{})
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

// Ensure users are loaded
onMounted(async () => {
  if ((!adminStore.users || (adminStore.users.value || []).length === 0) && typeof adminStore.fetchUsers === 'function') {
    await adminStore.fetchUsers()
  }
  if (route.query.id && typeof adminStore.selectUser === 'function') {
    adminStore.selectUser(route.query.id)
  }
})

// react to query change
watch(() => route.query.id, (id) => {
  if (id && typeof adminStore.selectUser === 'function') adminStore.selectUser(id)
})
</script>

<style scoped>
.admin-page { padding: 1.5rem; display:flex; gap:1rem }
.layout-two-col { align-items:flex-start }
.sidebar { width:280px }
.patient-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:0.5rem }
.patient-list li { display:flex; gap:0.75rem; align-items:center; padding:0.5rem; border-radius:8px; cursor:pointer }
.patient-list li:hover { background:#f8fafc }
.patient-list li.active { background:#eef2ff }
.mini-avatar { width:40px; height:40px; border-radius:50%; background:linear-gradient(135deg,#3b82f6,#1d4ed8); color:white; display:flex; align-items:center; justify-content:center; font-weight:600 }
.meta .name { font-weight:600 }
.meta .sub { color:#6b7280; font-size:0.85rem }
.sidebar-footer { margin-top:0.5rem; color:#6b7280 }
.content { flex:1 }
.profile-card { padding:1rem; border-radius:8px; box-shadow:0 6px 18px rgba(17,24,39,0.04) }
.profile-header { display:flex; gap:1rem; align-items:center }
.profile-header .avatar { width:72px; height:72px; border-radius:12px; background:#2563eb; color:white; display:flex; align-items:center; justify-content:center; font-size:1.25rem }
.muted { color:#6b7280 }
.two-cols { display:flex; gap:1.5rem }
.section { margin-top:1rem }
.actions { display:flex; gap:0.5rem; margin-top:1rem }
.primary { background:#2563eb; color:white; border:none; padding:0.5rem 1rem; border-radius:6px }
.secondary { background:#f3f4f6; color:#111827; border:none; padding:0.4rem 0.8rem; border-radius:6px }
/* New report-like profile layout */
.profile-grid { display:grid; grid-template-columns: repeat(2,1fr); gap:1rem }
.card-box { background:#fff; padding:1rem; border-radius:10px; box-shadow:0 6px 18px rgba(17,24,39,0.03) }
.card-box.wide { grid-column: 1 / -1 }
.row { display:flex; gap:0.75rem; padding:6px 0; align-items:flex-start }
.row .label { width:35%; font-weight:700; color:#111827 }
.card-box h4 { margin:0 0 0.5rem 0 }
.profile-card { padding:1rem; border-radius:10px }
@media (max-width:900px) {
  .admin-page { flex-direction:column }
  .sidebar { width:100% }
}
</style>