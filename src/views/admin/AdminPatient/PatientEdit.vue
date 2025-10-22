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
            <div class="address-grid">
              <input v-model="local.direccion.calle" placeholder="Calle" />
              <input v-model="local.direccion.numero" placeholder="Número" />
              <input v-model="local.direccion.zona" placeholder="Zona" />
              <input v-model="local.direccion.ciudad" placeholder="Ciudad" />
              <input v-model="local.direccion.provincia" placeholder="Provincia" />
            </div>
        </div>
      </div>

      <!-- RESPONSABLE -->
      <!-- Responsable section removed as requested -->

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
import * as AdminPatientService from '@/services/AdminPatientService'
import { userService } from '@/services/userService'

const route = useRoute()
const router = useRouter()

const editId = route.query.editId || route.query.id
const patient = ref(null)
const patients = ref([])
const loading = ref(false)
const local = reactive({
  persona: {},
  direccion: {},
  // responsable removed
  medicalInfo: { chronic: {}, allergies: [] },
  seguro: {}
})
const allergyText = ref('')

const loadPatients = async () => {
  try {
    loading.value = true
    console.log("🔄 [PatientEdit] Cargando pacientes desde Firebase...")
    const list = await AdminPatientService.listPatients()
    patients.value = list || []
    console.log("✅ [PatientEdit] Pacientes cargados:", patients.value.length)
    
    // Buscar el paciente a editar
    const found = patients.value.find(u => u.id === editId)
    if (found) {
      patient.value = found
      const clone = JSON.parse(JSON.stringify(found))
      // shallow copy top-level simple fields
  local.persona = clone.persona || {}
  local.direccion = clone.direccion || {}
      // ensure medicalInfo structure exists
      local.medicalInfo = clone.medicalInfo || { chronic: {}, allergies: [] }
      if (!local.medicalInfo.chronic) local.medicalInfo.chronic = {}
      if (!Array.isArray(local.medicalInfo.allergies)) local.medicalInfo.allergies = []
  local.seguro = clone.seguro || {}
      // copy simple top-level primitive fields if present
      local.fechaNacimiento = clone.fechaNacimiento || local.fechaNacimiento
      local.dni = clone.dni || local.dni
      local.ocupacion = clone.ocupacion || local.ocupacion
      local.telefono = clone.telefono || local.telefono
      local.telefono2 = clone.telefono2 || local.telefono2
      local.email = clone.email || local.email
      local.preferenciaContacto = clone.preferenciaContacto || local.preferenciaContacto
      local.observaciones = clone.observaciones || local.observaciones
      allergyText.value = (local.medicalInfo?.allergies || []).join(', ')
      console.log("👤 [PatientEdit] Paciente cargado para edición:", patient.value)
    } else {
      console.warn("⚠️ [PatientEdit] No se encontró el paciente con id:", editId)
      // Intentar crear un documento mínimo en patients si existe un usuario con este id
      try {
        const possibleUser = await userService.getUserById(editId)
        if (possibleUser) {
          console.log('ℹ️ [PatientEdit] Se encontró usuario pero no paciente. Creando paciente mínimo...')
          const minimal = {
            persona: {
              nombres: possibleUser.persona?.nombres || '',
              apellidos: possibleUser.persona?.apellidos || '',
              sexo: possibleUser.persona?.sexo || ''
            },
            dni: possibleUser.dni || possibleUser.ci || '',
            telefono: possibleUser.telefono || possibleUser.phone || '',
            email: possibleUser.email || '',
            direccion: {
              calle: '',
              numero: '',
              zona: '',
              ciudad: possibleUser.direccion?.ciudad || 'N/D',
              provincia: possibleUser.direccion?.provincia || 'N/D'
            },
            medicalInfo: { chronic: {}, allergies: [] },
            seguro: {},
            observaciones: '',
            estado: 'Activo',
            isActive: true,
            userUid: possibleUser.id
          }

          const newId = await AdminPatientService.createPatient(minimal)
          console.log('✅ [PatientEdit] Paciente mínimo creado con ID:', newId)
          // recargar la lista y setear el paciente creado
          const newDoc = await AdminPatientService.getPatient(newId)
          if (newDoc) {
            patients.value.push(newDoc)
            patient.value = newDoc
            const clone = JSON.parse(JSON.stringify(newDoc))
            local.persona = clone.persona || {}
            local.direccion = clone.direccion || {}
            local.medicalInfo = clone.medicalInfo || { chronic: {}, allergies: [] }
            if (!local.medicalInfo.chronic) local.medicalInfo.chronic = {}
            if (!Array.isArray(local.medicalInfo.allergies)) local.medicalInfo.allergies = []
            local.seguro = clone.seguro || {}
            local.fechaNacimiento = clone.fechaNacimiento || local.fechaNacimiento
            local.dni = clone.dni || local.dni
            local.ocupacion = clone.ocupacion || local.ocupacion
            local.telefono = clone.telefono || local.telefono
            local.telefono2 = clone.telefono2 || local.telefono2
            local.email = clone.email || local.email
            local.preferenciaContacto = clone.preferenciaContacto || local.preferenciaContacto
            local.observaciones = clone.observaciones || local.observaciones
            allergyText.value = (local.medicalInfo?.allergies || []).join(', ')
            console.log('👤 [PatientEdit] Paciente mínimo cargado para edición:', patient.value)
          }
        }
      } catch (createErr) {
        console.error('❌ [PatientEdit] Error creando paciente mínimo:', createErr)
      }
    }
  } catch (err) {
    console.error("❌ [PatientEdit] Error cargando pacientes:", err)
  } finally {
    loading.value = false
  }
}

watch(allergyText, (val) => {
  local.medicalInfo.allergies = val.split(',').map(a => a.trim()).filter(Boolean)
})

const save = async () => {
  if (!patient.value) return
  try {
    // Comprobar si el documento existe en Firestore antes de intentar update
    const existing = await AdminPatientService.getPatient(patient.value.id)
    if (existing) {
      await AdminPatientService.updatePatient(patient.value.id, local)
      console.log("✅ [PatientEdit] Paciente actualizado en Firebase (update)")
    } else {
      // Si no existe, crear un nuevo documento en la colección patients
      const newId = await AdminPatientService.createPatient(local)
      console.log("ℹ️ [PatientEdit] Paciente no existía: creado nuevo ID:", newId)
      // actualizar referencia local y patient.value.id para mantener consistencia
      patient.value.id = newId
    }
    // Si el paciente está vinculado a un usuario, actualizar también los datos compartidos
    try {
      const userId = patient.value.userUid || patient.value.userDocId || patient.value.userId || null
      if (userId) {
        // Construir payload para users: mantener la misma estructura que usan los usuarios
        const userPatch = {}
        // persona
        userPatch.persona = {
          nombres: local.persona?.nombres || '',
          apellidos: local.persona?.apellidos || '',
          fecha_nac: local.fechaNacimiento || null
        }
        // telefono y email si están presentes
        if (local.telefono !== undefined) userPatch.telefono = local.telefono
        if (local.email !== undefined) userPatch.email = local.email

        console.log('🔁 [PatientEdit] Actualizando usuario vinculado', userId, userPatch)
        await userService.updateUser(userId, userPatch)
        console.log('✅ [PatientEdit] Usuario vinculado actualizado')
      }
    } catch (uErr) {
      console.error('❌ [PatientEdit] Error actualizando user vinculado:', uErr)
      // No abortar el flujo principal; el paciente ya fue actualizado
    }
    router.push({ name: 'admin-patient-perfil', query: { id: patient.value.id } })
  } catch (e) {
    console.error('Error guardando edición:', e)
  }
}

const cancel = () => router.back()

onMounted(async () => {
  await loadPatients()
})
</script>

<style scoped>
.form-card {
  padding:1.15rem;
  border-radius:12px;
  background:white;
  box-shadow:0 8px 24px rgba(2,6,23,0.04);
  max-width: 1100px; /* prevent the card stretching too wide */
  margin: 0 auto; /* center on wide screens */
}
.form-grid {
  display:grid;
  grid-template-columns: repeat(2, minmax(0,1fr));
  gap:1rem;
  align-items: start; /* make rows align at top so labels/controls don't vertically center */
}
.field.wide { grid-column: 1 / -1 }
h3 { margin-top:1.2rem; color:#111827; font-size:1.1rem }
.form-actions { display:flex; justify-content:flex-end; gap:0.6rem; margin-top:1.15rem }
.primary { background:#2563eb; color:white; border:none; padding:0.8rem 1rem; border-radius:10px; font-weight:600 }
.secondary { background:#f3f4f6; color:#0f172a; border:none; padding:0.75rem 0.95rem; border-radius:10px }
.form-card input, .form-card textarea, .form-card select {
  width:100%;
  padding:0.7rem 0.9rem;
  border-radius:10px;
  border:1px solid #e6e9ee;
  box-sizing: border-box;
  display: block;
}

/* Ensure labels sit above inputs and fields stack vertically */
.form-grid .field {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.35rem;
}
.form-grid .field label {
  display: block;
  margin: 0;
  padding: 0;
  margin-bottom: 0.35rem;
  font-weight: 600;
  color: #111827;
}
.form-card input[type='date'] { max-width: 320px }
.form-card input:focus, textarea:focus, select:focus { outline:none; border-color:rgba(37,99,235,0.9); box-shadow:0 6px 18px rgba(37,99,235,0.06) }
textarea { resize: vertical; min-height:80px; width:100%; max-width:100%; }

/* Address grid: compact layout for address subfields */
.address-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr; /* calle | numero | zona */
  gap: 0.6rem;
}
.address-grid input { width:100%; max-width:100%; }

/* Ensure wide fields span the full grid width */
.field.wide textarea, .field.wide input { width: 100%; max-width: 100%; }

/* make additional address fields appear below on smaller screens */
.address-grid input[placeholder='Ciudad'],
.address-grid input[placeholder='Provincia'] {
  grid-column: 1 / -1;
  margin-top: 0.35rem;
}

@media (max-width: 900px) {
  .form-card { max-width: 920px }
  .form-grid { grid-template-columns: 1fr }
  .address-grid { grid-template-columns: 1fr }
}

@media (max-width:768px) { .form-grid{ grid-template-columns: 1fr } }
</style>
