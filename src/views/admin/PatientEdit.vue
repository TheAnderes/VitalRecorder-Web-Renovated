<template>
  <div class="admin-page patient-edit">
    <div class="page-header">
      <div class="header-content">
        <h2>Editar Paciente</h2>
        <p>Modifique los datos del paciente y guarde los cambios.</p>
      </div>
    </div>

    <div class="card form-card" v-if="patient">
      <!-- DATOS PERSONALES -->
      <h3>Datos Personales</h3>
      <div class="form-grid">
        <div class="field"><label>Nombre</label><input v-model="local.persona.nombres" /></div>
        <div class="field"><label>Apellidos</label><input v-model="local.persona.apellidos" /></div>
        <div class="field"><label>DNI</label><input v-model="local.dni" /></div>
        <div class="field"><label>Fecha de Nacimiento</label><input type="date" v-model="local.fechaNacimiento" /></div>
        <div class="field"><label>Sexo</label>
          <select v-model="local.persona.sexo">
            <option value="">Seleccionar...</option>
            <option>Masculino</option>
            <option>Femenino</option>
            <option>Otro</option>
          </select>
        </div>
        <div class="field"><label>Ocupación</label><input v-model="local.ocupacion" /></div>
        <div class="field"><label>Lugar de Nacimiento</label><input v-model="local.lugarNacimiento" /></div>
      </div>

      <!-- CONTACTO -->
      <h3>Contacto</h3>
      <div class="form-grid">
        <div class="field"><label>Teléfono</label><input v-model="local.telefono" /></div>
        <div class="field"><label>Teléfono Alternativo</label><input v-model="local.telefono2" /></div>
        <div class="field"><label>Email</label><input v-model="local.email" /></div>
        <div class="field"><label>Preferencia de Contacto</label><input v-model="local.preferenciaContacto" /></div>
        <div class="field wide">
          <label>Dirección</label>
          <input v-model="local.direccion.calle" placeholder="Calle" />
          <input v-model="local.direccion.numero" placeholder="Número" />
          <input v-model="local.direccion.zona" placeholder="Zona" />
          <input v-model="local.direccion.ciudad" placeholder="Ciudad" />
          <input v-model="local.direccion.provincia" placeholder="Provincia" />
        </div>
      </div>

      <!-- RESPONSABLE -->
      <h3>Responsable</h3>
      <div class="form-grid">
        <div class="field"><label>Nombre</label><input v-model="local.responsable.nombre" /></div>
        <div class="field"><label>Parentesco</label><input v-model="local.responsable.parentesco" /></div>
        <div class="field"><label>Teléfono</label><input v-model="local.responsable.telefono" /></div>
        <div class="field"><label>Email</label><input v-model="local.responsable.email" /></div>
        <div class="field wide"><label>Dirección</label><input v-model="local.responsable.direccion" /></div>
      </div>

      <!-- INFORMACIÓN MÉDICA -->
      <h3>Información Médica</h3>
      <div class="form-grid">
        <div class="field"><label>Tipo de Sangre</label><input v-model="local.medicalInfo.bloodGroup" /></div>
        <div class="field"><label>Peso (kg)</label><input type="number" v-model.number="local.medicalInfo.peso" /></div>
        <div class="field"><label>Altura (cm)</label><input type="number" v-model.number="local.medicalInfo.altura" /></div>
        <div class="field"><label>IMC</label><input v-model="local.medicalInfo.imc" /></div>
        <div class="field wide">
          <label>Condiciones Crónicas</label>
          <textarea v-model="local.medicalInfo.chronic.otras" placeholder="Diabetes, hipertensión, asma, etc."></textarea>
        </div>
        <div class="field wide">
          <label>Alergias</label>
          <textarea v-model="allergyText" placeholder="Separar con comas"></textarea>
        </div>
        <div class="field wide">
          <label>Antecedentes Familiares</label>
          <textarea v-model="local.medicalInfo.antecedentesFamiliares"></textarea>
        </div>
      </div>

      <!-- SEGURO -->
      <h3>Seguro</h3>
      <div class="form-grid">
        <div class="field"><label>Aseguradora</label><input v-model="local.seguro.nombre" /></div>
        <div class="field"><label>Número de Póliza</label><input v-model="local.seguro.polid" /></div>
      </div>

      <!-- OBSERVACIONES -->
      <h3>Observaciones</h3>
      <div class="form-grid">
        <div class="field wide"><textarea v-model="local.observaciones" rows="4"></textarea></div>
      </div>

      <!-- BOTONES -->
      <div class="form-actions">
        <button class="secondary" @click="cancel">Cancelar</button>
        <button class="primary" @click="save">Guardar</button>
      </div>
    </div>

    <div v-else class="card">
      <p>Paciente no encontrado.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'

const route = useRoute()
const router = useRouter()
const adminStore = useAdminStore()

const editId = route.query.editId || route.query.id
const patient = ref(null)
const local = reactive({
  persona: {},
  direccion: {},
  responsable: {},
  medicalInfo: { chronic: {}, allergies: [] },
  seguro: {}
})
const allergyText = ref('')

const load = () => {
  const list = adminStore.users?.value || []
  const found = list.find(u => u.id === editId)
  if (found) {
    patient.value = found
    Object.assign(local, JSON.parse(JSON.stringify(found)))
    allergyText.value = (local.medicalInfo?.allergies || []).join(', ')
  }
}

watch(allergyText, (val) => {
  local.medicalInfo.allergies = val.split(',').map(a => a.trim()).filter(Boolean)
})

const save = async () => {
  if (!patient.value) return
  try {
    if (typeof adminStore.updateUser === 'function') {
      await adminStore.updateUser(patient.value.id, local)
    } else {
      adminStore.users.value = adminStore.users.value.map(u => u.id === patient.value.id ? { ...u, ...local } : u)
    }
    await adminStore.refreshData()
    router.push({ name: 'admin-patient-perfil', query: { id: patient.value.id } })
  } catch (e) {
    console.error('Error guardando edición:', e)
  }
}

const cancel = () => router.back()

onMounted(async () => {
  if ((!adminStore.users || (adminStore.users.value || []).length === 0) && typeof adminStore.fetchUsers === 'function') {
    await adminStore.fetchUsers()
  }
  load()
})
</script>

<style scoped>
.form-card { padding:1.15rem; border-radius:12px; background:white; box-shadow:0 8px 24px rgba(2,6,23,0.04) }
.form-grid { display:grid; grid-template-columns: repeat(2, 1fr); gap:1rem }
.field.wide { grid-column: 1 / -1 }
h3 { margin-top:1.2rem; color:#111827; font-size:1.1rem }
.form-actions { display:flex; justify-content:flex-end; gap:0.6rem; margin-top:1.15rem }
.primary { background:#2563eb; color:white; border:none; padding:0.8rem 1rem; border-radius:10px; font-weight:600 }
.secondary { background:#f3f4f6; color:#0f172a; border:none; padding:0.75rem 0.95rem; border-radius:10px }
.form-card input, textarea, select { width:100%; padding:0.85rem 0.95rem; border-radius:10px; border:1px solid #e6e9ee }
.form-card input:focus, textarea:focus, select:focus { outline:none; border-color:rgba(37,99,235,0.9); box-shadow:0 6px 18px rgba(37,99,235,0.06) }
textarea { resize: vertical; min-height:80px }
@media (max-width:768px) { .form-grid{ grid-template-columns: 1fr } }
</style>
