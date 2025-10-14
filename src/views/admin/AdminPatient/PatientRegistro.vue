<template>
  <div class="admin-page patient-registro">
    <div class="page-header">
      <div class="header-content">
        <h2>Registro de Pacientes</h2>
        <p>Complete los datos para el alta inicial del paciente.</p>
      </div>
      <div>
        <button class="primary" @click="openPreview">Registrar Nuevo Paciente</button>
      </div>
    </div>

    <div class="card form-card">
      <form @submit.prevent="openPreview">
        <!-- Datos Personales -->
        <section class="section">
          <h3>Datos Personales</h3>
          <div class="form-grid">
            <div class="field">
              <label>Nombre(s) *</label>
              <input v-model="form.persona.nombres" @input="validateField('nombres')" :class="{'invalid': errors.nombres}" placeholder="Nombre(s)" />
              <small v-if="errors.nombres" class="error-msg">{{ errors.nombres }}</small>
            </div>

            <div class="field">
              <label>Apellido(s) *</label>
              <input v-model="form.persona.apellidos" @input="validateField('apellidos')" :class="{'invalid': errors.apellidos}" placeholder="Apellido(s)" />
              <small v-if="errors.apellidos" class="error-msg">{{ errors.apellidos }}</small>
            </div>

            <div class="field">
              <label>Fecha de Nacimiento *</label>
              <input type="date" v-model="form.fechaNacimiento" @change="recalculate" :class="{'invalid': errors.fechaNacimiento}" />
              <small v-if="errors.fechaNacimiento" class="error-msg">{{ errors.fechaNacimiento }}</small>
            </div>

            <div class="field">
              <label>Edad</label>
              <input :value="ageString" readonly />
            </div>

            <div class="field">
              <label>Sexo/Género</label>
              <select v-model="form.persona.sexo">
                <option value="">Seleccione...</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div class="field">
              <label>Documento (CI/DNI/Pass) *</label>
              <input v-model="form.dni" @input="validateField('dni'); checkDuplicates()" :class="{'invalid': errors.dni}" placeholder="Número de documento" />
              <small v-if="errors.dni" class="error-msg">{{ errors.dni }}</small>
            </div>

            <div class="field">
              <label>Lugar de Nacimiento</label>
              <input v-model="form.lugarNacimiento" placeholder="Ciudad, País" />
            </div>

            <div class="field">
              <label>Estado Civil</label>
              <select v-model="form.estadoCivil">
                <option value="">Seleccione...</option>
                <option>Soltero</option>
                <option>Casado</option>
                <option>Divorciado</option>
                <option>Viudo</option>
              </select>
            </div>

            <div class="field">
              <label>Ocupación / Profesión</label>
              <input v-model="form.ocupacion" placeholder="Profesión u ocupación" />
            </div>

            <div class="field photo-field">
              <label>Fotografía del paciente</label>
              <div class="photo-controls">
                <input ref="photoInput" type="file" accept="image/*" capture="environment" @change="onPhotoSelected" />
                <div class="photo-preview" v-if="photoDataUrl">
                  <img :src="photoDataUrl" alt="Preview" />
                  <button type="button" class="link-btn" @click="removePhoto">Quitar</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Datos de Contacto -->
        <section class="section">
          <h3>Datos de Contacto</h3>
          <div class="form-grid">
            <div class="field">
              <label>Teléfono principal *</label>
              <input v-model="form.telefono" @input="validateField('telefono')" :class="{'invalid': errors.telefono}" placeholder="+51 9xxxxxxxx" />
              <small v-if="errors.telefono" class="error-msg">{{ errors.telefono }}</small>
            </div>

            <div class="field">
              <label>Teléfono alternativo</label>
              <input v-model="form.telefono2" placeholder="Teléfono alternativo" />
            </div>

            <div class="field">
              <label>Correo electrónico</label>
              <input v-model="form.email" @input="validateField('email')" :class="{'invalid': errors.email}" placeholder="correo@ejemplo.com" />
              <small v-if="errors.email" class="error-msg">{{ errors.email }}</small>
            </div>

            <div class="field">
              <label>Preferencia de contacto</label>
              <select v-model="form.preferenciaContacto">
                <option value="telefono">Teléfono</option>
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>

            <div class="field">
              <label>Calle / Avenida</label>
              <input v-model="form.direccion.calle" placeholder="Calle / Avenida" />
            </div>

            <div class="field">
              <label>Número</label>
              <input v-model="form.direccion.numero" placeholder="Número" />
            </div>

            <div class="field">
              <label>Zona / Barrio</label>
              <input v-model="form.direccion.zona" placeholder="Barrio / Zona" />
            </div>

            <div class="field">
              <label>Ciudad</label>
              <input v-model="form.direccion.ciudad" placeholder="Ciudad" />
            </div>

            <div class="field">
              <label>Departamento / Provincia</label>
              <input v-model="form.direccion.provincia" placeholder="Departamento / Provincia" />
            </div>
          </div>
        </section>

        <!-- Información Médica Básica -->
        <section class="section">
          <h3>Información Médica Básica</h3>
          <div class="form-grid">
            <div class="field">
              <label>Tipo de sangre</label>
              <select v-model="form.medicalInfo.bloodGroup">
                <option value="">Seleccione...</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>

            <div class="field">
              <label>Peso (kg)</label>
              <input type="number" v-model.number="form.medicalInfo.peso" @input="recalculate" placeholder="kg" min="0" step="0.1" />
            </div>

            <div class="field">
              <label>Altura (cm)</label>
              <input type="number" v-model.number="form.medicalInfo.altura" @input="recalculate" placeholder="cm" min="0" step="0.1" />
            </div>

            <div class="field">
              <label>IMC</label>
              <input :value="imcString" readonly />
            </div>

            <div class="field full">
              <label>Alergias conocidas</label>
              <div class="tag-input">
                <input v-model="_allergy_temp" placeholder="Agregar alergia y presionar Enter" @keyup.enter.prevent="addAllergy" />
                <div class="tags">
                  <span class="tag" v-for="(a, i) in form.medicalInfo.allergies" :key="i">{{ a }} <button type="button" @click="removeAllergy(i)">&times;</button></span>
                </div>
              </div>
            </div>

            <div class="field full">
              <label>Condiciones preexistentes / crónicas</label>
              <div class="checkboxes">
                <label><input type="checkbox" v-model="form.medicalInfo.chronic.diabetes" /> Diabetes</label>
                <label><input type="checkbox" v-model="form.medicalInfo.chronic.hipertension" /> Hipertensión</label>
                <label><input type="checkbox" v-model="form.medicalInfo.chronic.asma" /> Asma</label>
                <label><input type="checkbox" v-model="form.medicalInfo.chronic.cardiopatias" /> Cardiopatías</label>
              </div>
              <input v-model="form.medicalInfo.chronic.otras" placeholder="Otras (describa)" />
            </div>

            <div class="field full">
              <label>Antecedentes médicos familiares</label>
              <textarea v-model="form.medicalInfo.antecedentesFamiliares" rows="2" placeholder="Detalles"></textarea>
            </div>

            <div class="field full">
              <label>Observaciones generales</label>
              <textarea v-model="form.observaciones" rows="2" placeholder="Observaciones"></textarea>
            </div>
          </div>
        </section>

        <!-- Tutor / Familiar Responsable -->
        <section class="section">
          <h3>Tutor / Familiar Responsable</h3>
          <div class="form-grid">
            <div class="field">
              <label>Nombre del responsable</label>
              <input v-model="form.responsable.nombre" placeholder="Nombre completo" />
            </div>

            <div class="field">
              <label>Parentesco</label>
              <select v-model="form.responsable.parentesco">
                <option value="">Seleccione...</option>
                <option>Padre</option>
                <option>Madre</option>
                <option>Hijo</option>
                <option>Cónyuge</option>
                <option>Otro</option>
              </select>
            </div>

            <div class="field">
              <label>Teléfono de emergencia</label>
              <input v-model="form.responsable.telefono" placeholder="Teléfono" />
            </div>

            <div class="field">
              <label>Correo responsable</label>
              <input v-model="form.responsable.email" placeholder="correo@ejemplo.com" />
            </div>

            <div class="field full">
              <label>Dirección del responsable (si es diferente)</label>
              <input v-model="form.responsable.direccion" placeholder="Dirección completa" />
            </div>

            <div class="field">
              <label>Autorización legal</label>
              <label class="checkbox-inline"><input type="checkbox" v-model="form.responsable.autorizacion" /> Autorización firmada</label>
            </div>
          </div>
        </section>

        <!-- Datos administrativos -->
        <section class="section">
          <h3>Datos Administrativos</h3>
          <div class="form-grid">
            <div class="field">
              <label>Responsable (usuario que registra)</label>
              <input :value="currentUserName" readonly />
            </div>

            <div class="field">
              <label>Fecha de registro</label>
              <input :value="registrationDate" readonly />
            </div>

            <div class="field">
              <label>Hora de registro</label>
              <input :value="registrationTime" readonly />
            </div>

            <div class="field">
              <label>ID único del paciente</label>
              <input :value="form.id" readonly />
            </div>

            <div class="field">
              <label>Número de expediente</label>
              <input :value="form.expediente" readonly />
            </div>

            <div class="field">
              <label>Estado inicial</label>
              <input :value="form.estado" readonly />
            </div>

            <div class="field">
              <label>Seguro médico</label>
              <input v-model="form.seguro.nombre" placeholder="Aseguradora" />
            </div>

            <div class="field">
              <label>Número de póliza</label>
              <input v-model="form.seguro.polid" placeholder="Número de póliza" />
            </div>
          </div>
        </section>

        <!-- Form actions -->
        <div class="form-actions">
          <button type="button" class="secondary" @click="onCancel">Cancelar</button>
          <button type="button" class="primary" @click="saveAndCreateAnother">Guardar y Crear Otro</button>
          <button type="button" class="primary" @click="saveAndView">Guardar y Ver Perfil</button>
        </div>
      </form>
    </div>

    <!-- Duplicate warnings -->
    <div v-if="duplicateWarning" class="card warning-card">
      <strong>Advertencia:</strong>
      <p v-for="(m, i) in duplicateWarningMessages" :key="i">{{ m }}</p>
    </div>

    <!-- Preview Modal -->
    <div v-if="showPreview" class="modal-overlay">
      <div class="modal">
        <h3>Previsualización del registro</h3>
        <div class="preview">
          <div class="preview-row">
            <div><strong>Nombre:</strong> {{ form.persona.nombres }} {{ form.persona.apellidos }}</div>
            <div><strong>DNI:</strong> {{ form.dni }}</div>
          </div>
          <div class="preview-row">
            <div><strong>Edad:</strong> {{ ageString }}</div>
            <div><strong>Sexo:</strong> {{ form.persona.sexo }}</div>
          </div>
          <div class="preview-row">
            <div><strong>Teléfono:</strong> {{ form.telefono }}</div>
            <div><strong>Email:</strong> {{ form.email || 'N/A' }}</div>
          </div>
          <div class="preview-row">
            <div><strong>Tipo de sangre:</strong> {{ form.medicalInfo.bloodGroup || 'N/D' }}</div>
            <div><strong>IMC:</strong> {{ imcString }}</div>
          </div>
          <div class="preview-row">
            <div><strong>Alergias:</strong> {{ form.medicalInfo.allergies.join(', ') || 'Ninguna' }}</div>
          </div>
          <div class="preview-row photo-preview-big" v-if="photoDataUrl">
            <img :src="photoDataUrl" alt="Foto paciente" />
          </div>
        </div>

        <div class="modal-actions">
          <button class="secondary" @click="showPreview = false">Editar</button>
          <button class="primary" @click="confirmSave(false)">Guardar</button>
          <button class="primary" @click="confirmSave(true)">Guardar y Ver Perfil</button>
          <button class="link-btn" @click="printPreview">Imprimir ficha</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdmin } from '@/composables/useAdmin'
import { useAuth } from '@/composables/useAuth'
import * as AdminPatientService from '@/services/AdminPatientService'

const { canManageUsers } = useAdmin()
const { user, getUserName } = useAuth()
const router = useRouter()
const patients = ref([])
const loading = ref(false)

// Helpers
const generateId = () => `p-${Date.now()}-${Math.floor(Math.random()*9000+1000)}`
const generateExpediente = () => `EXP-${new Date().getFullYear()}-${Math.floor(Math.random()*90000)}`

// Form state
const form = reactive({
  id: generateId(),
  expediente: generateExpediente(),
  estado: 'Activo',
  usuarioRegistro: '',
  persona: { nombres: '', apellidos: '', sexo: '' },
  fechaNacimiento: '',
  dni: '',
  lugarNacimiento: '',
  estadoCivil: '',
  ocupacion: '',
  telefono: '',
  telefono2: '',
  email: '',
  preferenciaContacto: 'telefono',
  direccion: { calle: '', numero: '', zona: '', ciudad: '', provincia: '' },
  medicalInfo: { bloodGroup: '', peso: null, altura: null, imc: null, allergies: [], chronic: { diabetes:false, hipertension:false, asma:false, cardiopatias:false, otras: '' }, antecedentesFamiliares: '' },
  observaciones: '',
  responsable: { nombre: '', parentesco: '', telefono: '', email: '', direccion: '', autorizacion: false },
  seguro: { nombre: '', polid: '' },
  createdAt: new Date().toISOString()
})

const errors = reactive({})
const _allergy_temp = ref('')
const photoFile = ref(null)
const photoDataUrl = ref('')
const showPreview = ref(false)
const duplicateWarning = ref(false)
const duplicateWarningMessages = ref([])

const currentUserName = computed(() => getUserName() || user.value?.email || 'Sistema')

const registrationDate = computed(() => new Date().toLocaleDateString('es-ES'))
const registrationTime = computed(() => new Date().toLocaleTimeString('es-ES'))

const age = computed(() => {
  if (!form.fechaNacimiento) return null
  const b = new Date(form.fechaNacimiento)
  const now = new Date()
  let years = now.getFullYear() - b.getFullYear()
  const m = now.getMonth() - b.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) years--
  return years
})

const ageString = computed(() => age.value === null ? '' : `${age.value} años`)

const imc = computed(() => {
  const peso = Number(form.medicalInfo.peso)
  const alturaCm = Number(form.medicalInfo.altura)
  if (!peso || !alturaCm) return null
  const alturaM = alturaCm / 100
  const val = peso / (alturaM * alturaM)
  return Math.round(val * 10) / 10
})

const imcString = computed(() => imc.value ? `${imc.value} kg/m²` : '')

const validateField = (field) => {
  switch (field) {
    case 'nombres':
      errors.nombres = form.persona.nombres && form.persona.nombres.trim().length > 1 ? '' : 'Nombre requerido (mínimo 2 caracteres)'
      break
    case 'apellidos':
      errors.apellidos = form.persona.apellidos && form.persona.apellidos.trim().length > 1 ? '' : 'Apellido requerido'
      break
    case 'fechaNacimiento':
      errors.fechaNacimiento = form.fechaNacimiento ? '' : 'Fecha de nacimiento requerida'
      break
    case 'dni':
      errors.dni = form.dni && form.dni.trim().length >= 5 ? '' : 'Documento inválido o muy corto'
      break
    case 'telefono':
      errors.telefono = form.telefono && /^\+?\d{7,15}$/.test(form.telefono.replace(/\s+/g, '')) ? '' : 'Teléfono inválido (ej: +51 9xxxxxxx)'
      break
    case 'email':
      errors.email = form.email && /^\S+@\S+\.\S+$/.test(form.email) ? '' : ''
      break
  }
}

const recalculate = () => {
  // Re-evaluate age and imc
  form.medicalInfo.imc = imc.value
}

const addAllergy = () => {
  if (!_allergy_temp.value && !form.medicalInfo.allergies.length) return
  const v = _allergy_temp.value.trim()
  if (v && !form.medicalInfo.allergies.includes(v)) {
    form.medicalInfo.allergies.push(v)
  }
  _allergy_temp.value = ''
}

const removeAllergy = (i) => {
  form.medicalInfo.allergies.splice(i,1)
}

const onPhotoSelected = (e) => {
  const f = e.target.files && e.target.files[0]
  if (!f) return
  photoFile.value = f
  const reader = new FileReader()
  reader.onload = () => { photoDataUrl.value = reader.result }
  reader.readAsDataURL(f)
}

const removePhoto = () => { photoFile.value = null; photoDataUrl.value = '' }

const usersList = computed(() => patients.value)

const checkDuplicates = () => {
  duplicateWarningMessages.value = []
  duplicateWarning.value = false
  if (form.dni) {
    const match = usersList.value.find(u => (u.dni && u.dni.toString() === form.dni.toString()))
    if (match) {
      duplicateWarningMessages.value.push(`Documento duplicado: ya existe paciente con DNI ${form.dni}`)
      duplicateWarning.value = true
    }
  }

  if (form.persona.nombres && form.persona.apellidos && form.fechaNacimiento) {
    const nameDobMatch = usersList.value.find(u => {
      const full = `${u.persona?.nombres || ''}`.trim().toLowerCase() + ' ' + `${u.persona?.apellidos || ''}`.trim().toLowerCase()
      const target = `${form.persona.nombres}`.trim().toLowerCase() + ' ' + `${form.persona.apellidos}`.trim().toLowerCase()
      const sameName = full === target
      const sameDob = u.fechaNacimiento && (new Date(u.fechaNacimiento)).toDateString() === (new Date(form.fechaNacimiento)).toDateString()
      return sameName && sameDob
    })
    if (nameDobMatch) {
      duplicateWarningMessages.value.push('Coincidencia por nombre completo y fecha de nacimiento')
      duplicateWarning.value = true
    }
  }
}

const openPreview = () => {
  // validate required
  validateField('nombres')
  validateField('apellidos')
  validateField('fechaNacimiento')
  validateField('dni')
  validateField('telefono')
  checkDuplicates()
  showPreview.value = true
}

const confirmSave = async (viewAfterSave = false) => {
  console.log("🔵 [PatientRegistro] Iniciando confirmSave, viewAfterSave:", viewAfterSave)
  
  // final validation
  validateField('nombres')
  validateField('apellidos')
  validateField('fechaNacimiento')
  validateField('dni')
  validateField('telefono')
  checkDuplicates()

  console.log("🔍 [PatientRegistro] Errores después de validación:", errors)
  
  const hasErrors = Object.values(errors).some(v => v)
  if (hasErrors) {
    console.warn("⚠️ [PatientRegistro] Hay errores de validación")
    alert('Corrija los campos obligatorios antes de guardar.')
    return
  }

  // Prepare payload
  const payload = JSON.parse(JSON.stringify(form))
  if (photoFile.value) {
    // store a data URL for demo / preview - in real app upload to storage
    payload.photo = photoDataUrl.value
  }

  payload.usuarioRegistro = currentUserName.value
  console.log("📋 [PatientRegistro] Usuario registro:", payload.usuarioRegistro)
  console.log("👤 [PatientRegistro] Usuario autenticado:", user.value)

  if (!user.value) {
    console.error("❌ [PatientRegistro] No hay usuario autenticado")
    alert("Debe iniciar sesión para registrar pacientes")
    return
  }

  try {
    console.log("💾 [PatientRegistro] Guardando paciente en Firebase:", payload)
    const createdId = await AdminPatientService.createPatient(payload)
    console.log("✅ [PatientRegistro] Paciente creado con ID:", createdId)
    
    // Success feedback
    window.alert('Registro guardado correctamente en Firebase')
    showPreview.value = false
    if (viewAfterSave) {
      // navegar a perfil usando router
      router.push({ name: 'admin-patient-perfil', query: { id: createdId } }).catch(()=>{})
    } else {
      // reset form si fue "Guardar y Crear Otro"
      resetForm()
    }
  } catch (e) {
    console.error('❌ [PatientRegistro] Error guardando paciente:', e)
    window.alert('Error guardando paciente. Revise la consola.')
  }
}

const saveAndCreateAnother = () => {
  openPreview()
  // when preview opened user can click guardar - but provide shortcut: save directly without preview
  // For clarity we'll open preview and user can confirm
}

const saveAndView = () => {
  openPreview()
}

const onCancel = () => {
  if (confirm('Descartar cambios?')) resetForm()
}

const resetForm = () => {
  const id = generateId()
  const expediente = generateExpediente()
  Object.keys(form).forEach(k => { if (k !== 'id' && k !== 'expediente') delete form[k] })
  // re-init important fields
  form.id = id
  form.expediente = expediente
  form.estado = 'Activo'
  form.persona = { nombres: '', apellidos: '', sexo: '' }
  form.medicalInfo = { bloodGroup: '', peso: null, altura: null, imc: null, allergies: [], chronic: { diabetes:false, hipertension:false, asma:false, cardiopatias:false, otras: '' }, antecedentesFamiliares: '' }
  form.responsable = { nombre: '', parentesco: '', telefono: '', email: '', direccion: '', autorizacion: false }
  form.direccion = { calle: '', numero: '', zona: '', ciudad: '', provincia: '' }
  form.seguro = { nombre: '', polid: '' }
  form.telefono = ''
  form.email = ''
  form.createdAt = new Date().toISOString()
  photoFile.value = null
  photoDataUrl.value = ''
  Object.keys(errors).forEach(k => delete errors[k])
  duplicateWarning.value = false
  duplicateWarningMessages.value = []
}

const printPreview = () => {
  const w = window.open('', '_blank')
  if (!w) return
  const html = `
    <html><head><title>Ficha paciente</title></head><body>
    <h2>Ficha de registro</h2>
    <pre>${JSON.stringify(form, null, 2)}</pre>
    </body></html>`
  w.document.write(html)
  w.document.close()
  w.print()
}

onMounted(async () => {
  // ensure usuario registro
  form.usuarioRegistro = currentUserName.value
  
  // Cargar pacientes para validación de duplicados
  try {
    loading.value = true
    console.log("🔄 [PatientRegistro] Cargando pacientes para validación...")
    const list = await AdminPatientService.listPatients()
    patients.value = list || []
    console.log("✅ [PatientRegistro] Pacientes cargados:", patients.value.length)
  } catch (err) {
    console.error("❌ [PatientRegistro] Error cargando pacientes:", err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Reutiliza estilos visuales coherentes con PatientList */
.admin-page { padding: 1.5rem; }
.page-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem }
.page-header h2 { margin:0; font-size:1.5rem }
.form-card { background:#fff; padding:1.25rem; border-radius:14px; box-shadow:0 8px 26px rgba(17,24,39,0.06); }
.form-grid { display:grid; grid-template-columns: repeat(2, 1fr); gap:1.1rem; }
.field { display:flex; flex-direction:column; }
.field.full { grid-column: 1 / -1; }
.field label { font-weight:700; margin-bottom:0.45rem; color:#111827; font-size:0.95rem }
.form-card input, .form-card select, .form-card textarea {
  padding:0.95rem 1.05rem;
  border: none; /* remove hard border to avoid boxy look */
  border-radius:18px;
  font-size:1rem;
  min-height:20px;
  background: #f8fafc; /* subtle card-like background */
  box-shadow: inset 0 1px 0 rgba(16,24,40,0.03);
  transition: box-shadow 0.15s ease, transform 0.06s ease;
}
.form-card textarea { resize:vertical; min-height:80px; padding:0.9rem 1rem }
.form-card input[type='date'] { padding-left:0.9rem; padding-right:1.1rem }
.form-card input:focus, .form-card select:focus, .form-card textarea:focus {
  outline: none;
  box-shadow: 0 10px 30px rgba(37,99,235,0.08), inset 0 1px 0 rgba(16,24,40,0.02);
  transform: translateY(-1px);
}
.photo-field .photo-controls input { display:block; }
.form-card input[readonly] { background:#f1f5f9; color:#111827 }
.form-card input::placeholder, .form-card textarea::placeholder { color:#9ca3af }
.form-card input[type='file'] { padding:0.4rem }
.photo-preview img { width:110px; height:110px; object-fit:cover; border-radius:12px; margin-top:0.5rem; box-shadow:0 6px 18px rgba(17,24,39,0.04) }
.photo-preview-big img { width:180px; height:180px; object-fit:cover; border-radius:12px; }
.tag-input { display:flex; flex-direction:column }
.tags { margin-top:0.5rem; display:flex; gap:0.5rem; flex-wrap:wrap }
.tag { background:#f3f4f6; padding:0.25rem 0.5rem; border-radius:999px; display:inline-flex; align-items:center; gap:0.5rem }
.tag button { background:transparent; border:none; cursor:pointer }
.checkboxes label { display:inline-flex; gap:0.5rem; margin-right:0.75rem }
.form-actions { display:flex; gap:0.6rem; justify-content:flex-end; margin-top:1.25rem }
.primary { background:#2563eb; color:#fff; border:none; padding:0.9rem 1.1rem; border-radius:12px; cursor:pointer; font-weight:600; box-shadow:0 8px 20px rgba(37,99,235,0.12) }
.secondary { background:#f3f4f6; color:#0f172a; border:none; padding:0.85rem 1rem; border-radius:12px; cursor:pointer }
.link-btn { background:transparent; border:none; color:#2563eb; cursor:pointer; margin-left:0.5rem }
.invalid {
  /* subtle invalid indication without a hard red box */
  box-shadow: 0 0 0 6px rgba(248,113,113,0.06), inset 0 1px 0 rgba(0,0,0,0.02);
}
.error-msg { color:#dc2626; font-size:0.86rem; margin-top:0.35rem }
.warning-card { background:#fffbeb; border-left:4px solid #f59e0b; padding:0.75rem; margin-top:1rem }

/* Modal */
.modal-overlay { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.4); z-index:60 }
.modal { background:white; padding:1rem; border-radius:8px; width:min(900px,95%); max-height:90vh; overflow:auto }
.preview { display:flex; flex-direction:column; gap:0.5rem; }
.preview-row { display:flex; gap:1rem; justify-content:space-between }
.modal-actions { display:flex; gap:0.5rem; justify-content:flex-end; margin-top:1rem }

@media (max-width:768px) {
  .form-grid { grid-template-columns: 1fr }
}
</style>