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
              <input type="date" v-model="form.fechaNacimiento" @change="recalculate" :max="maxDate" :class="{'invalid': errors.fechaNacimiento}" />
              <small v-if="errors.fechaNacimiento" class="error-msg">{{ errors.fechaNacimiento }}</small>
            </div>

            <div class="field">
              <label>Edad</label>
              <input :value="ageString" readonly />
            </div>

            <div class="field">
              <label>Categoría de Edad</label>
              <input :value="ageCategory" readonly />
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
              <label>🆔 Carnet de Identidad (CI) *</label>
              <input v-model="form.dni" @input="validateField('dni'); checkDuplicates()" :class="{'invalid': errors.dni}" placeholder="Número de CI" />
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

            <!-- Fotografía del paciente (removida) -->

            <!-- Foto del CI (removida) -->
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
              <label>Contraseña (opcional)</label>
              <input type="password" v-model="form.password" placeholder="Dejar vacío si no crear cuenta" />
              <small class="hint">Si proporciona correo y contraseña se intentará crear un usuario en Auth</small>
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

        <!-- Toggle para Información Médica -->
        <div class="toggle-section">
          <label class="toggle-label">
            <input type="checkbox" v-model="showMedicalInfo" class="toggle-checkbox" />
            <span class="toggle-switch"></span>
            <span class="toggle-text">
              <span class="toggle-icon">🏥</span>
              <strong>Agregar Información Médica Completa</strong>
              <span class="toggle-hint">(Opcional)</span>
            </span>
          </label>
        </div>

        <!-- Información Médica Completa -->
        <section class="section" v-if="showMedicalInfo">
          <h3>Información Médica Completa</h3>
          <div class="form-grid">
            
            <!-- Estado del paciente respecto a medicamentos -->
            <div class="field">
              <label>Estado de adherencia al tratamiento *</label>
              <select v-model="form.medicalInfo.estadoAdherencia">
                <option value="">Seleccione...</option>
                <option>Olvidadizo</option>
                <option>Dependiente</option>
                <option>Autónomo</option>
                <option>Supervisado</option>
                <option>Irregular</option>
              </select>
            </div>

            <!-- Estado actual del paciente -->
            <div class="field">
              <label>Estado actual del paciente *</label>
              <select v-model="form.medicalInfo.estadoActual">
                <option value="">Seleccione...</option>
                <option>Recuperación</option>
                <option>Tratamiento</option>
                <option>Observación</option>
                <option>Estable</option>
                <option>Crítico</option>
              </select>
            </div>

            <!-- Alergias -->
            <div class="field full">
              <label>⚠️ Alergias conocidas</label>
              <div class="tag-input">
                <input v-model="_allergy_temp" placeholder="Ej: Penicilina, Polen, Mariscos..." @keyup.enter.prevent="addAllergy" />
                <div class="tags">
                  <span class="tag tag-alergia" v-for="(a, i) in form.medicalInfo.alergias" :key="i">
                    ⚠️ {{ a }} 
                    <button type="button" @click="removeAllergy(i)" class="tag-remove">&times;</button>
                  </span>
                </div>
              </div>
            </div>

            <!-- Enfermedades -->
            <div class="field full">
              <label>🩺 Enfermedades diagnosticadas</label>
              <div class="tag-input">
                <input v-model="_enfermedad_temp" placeholder="Ej: Diabetes, Hipertensión..." @keyup.enter.prevent="addEnfermedad" />
                <div class="tags">
                  <span class="tag tag-enfermedad" v-for="(e, i) in form.medicalInfo.enfermedades" :key="i">
                    🩺 {{ e }} 
                    <button type="button" @click="removeEnfermedad(i)" class="tag-remove">&times;</button>
                  </span>
                </div>
              </div>
            </div>

            <!-- Altura y Peso -->
            <div class="field">
              <label>Altura (cm)</label>
              <input type="number" v-model.number="form.medicalInfo.altura" @input="recalculate" placeholder="cm" min="0" step="0.1" />
            </div>

            <div class="field">
              <label>Peso (kg)</label>
              <input type="number" v-model.number="form.medicalInfo.peso" @input="recalculate" placeholder="kg" min="0" step="0.1" />
            </div>

            <div class="field">
              <label>IMC</label>
              <input :value="imcString" readonly />
            </div>

            <!-- Estado físico -->
            <div class="field">
              <label>Estado físico del paciente *</label>
              <select v-model="form.medicalInfo.estadoFisico">
                <option value="">Seleccione...</option>
                <option>Delicado</option>
                <option>Normal</option>
                <option>Estable</option>
                <option>Crítico</option>
                <option>Requiere atención</option>
              </select>
            </div>

            <!-- Medicamentos -->
            <div class="field full">
              <label>💊 Medicamentos actuales</label>
              <div class="tag-input">
                <input v-model="_medicamento_temp" placeholder="Ej: Ibuprofeno 400mg, Paracetamol..." @keyup.enter.prevent="addMedicamento" />
                <div class="tags">
                  <span class="tag tag-medicamento" v-for="(m, i) in form.medicalInfo.medicamentos" :key="i">
                    💊 {{ m }} 
                    <button type="button" @click="removeMedicamento(i)" class="tag-remove">&times;</button>
                  </span>
                </div>
              </div>
            </div>

            <!-- Recetado por -->
            <div class="field">
              <label>Recetado por (médico tratante)</label>
              <input v-model="form.medicalInfo.recetadoPor" placeholder="Nombre del médico" />
            </div>

            <!-- Foto de receta médica -->
            <div class="field full">
              <label class="photo-label">📄 Fotografía de receta médica</label>
              <div class="photo-upload-container">
                <input 
                  ref="recetaFotoInput"
                  type="file" 
                  accept="image/*" 
                  @change="onRecetaFotoSelected"
                  class="photo-input"
                  id="photo-receta"
                />
                <label for="photo-receta" class="photo-upload-btn" v-if="!recetaFotoDataUrl">
                  <div class="upload-icon">📋</div>
                  <div class="upload-text">
                    <strong>Click para subir receta médica</strong>
                    <small>Formato JPG, PNG o PDF</small>
                  </div>
                </label>
                <div class="photo-preview-enhanced" v-if="recetaFotoDataUrl">
                  <img :src="recetaFotoDataUrl" alt="Receta médica" />
                  <div class="photo-overlay">
                    <button type="button" class="btn-remove-photo" @click="removeRecetaFoto">
                      <span>🗑️</span> Eliminar
                    </button>
                    <button type="button" class="btn-change-photo" @click="$refs.recetaFotoInput.click()">
                      <span>🔄</span> Cambiar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Frecuencia de tratamiento -->
            <div class="field">
              <label>Frecuencia de tratamiento</label>
              <select v-model="form.medicalInfo.frecuenciaTratamiento">
                <option value="">Seleccione...</option>
                <option>Cada 4 horas</option>
                <option>Cada 5 horas</option>
                <option>Cada 6 horas</option>
                <option>Cada 8 horas</option>
                <option>Cada 12 horas</option>
                <option>Cada 24 horas (diario)</option>
                <option>Cada 2 días</option>
                <option>Semanal</option>
                <option>Quincenal</option>
                <option>Mensual</option>
                <option>Según necesidad</option>
              </select>
            </div>

            <!-- Condiciones para tomar medicamento -->
            <div class="field">
              <label>Condición para tomar medicamento</label>
              <select v-model="form.medicalInfo.condicionToma">
                <option value="">Seleccione...</option>
                <option>Antes del desayuno</option>
                <option>Después del desayuno</option>
                <option>Antes del almuerzo</option>
                <option>Después del almuerzo</option>
                <option>Antes de la cena</option>
                <option>Después de la cena</option>
                <option>Con las comidas</option>
                <option>Entre comidas</option>
                <option>En ayunas</option>
                <option>Antes de dormir</option>
              </select>
            </div>

            <!-- Observaciones adicionales -->
            <div class="field full">
              <label>Observaciones médicas adicionales</label>
              <textarea v-model="form.medicalInfo.observaciones" rows="3" placeholder="Información adicional relevante"></textarea>
            </div>

          </div>
        </section>

        <!-- Tutor/Responsable removed as requested -->

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

    <!-- Preview Modal Mejorado -->
    <div v-if="showPreview" class="modal-overlay" @click.self="showPreview = false">
      <div class="modal-preview">
        <div class="modal-header">
          <div class="modal-title">
            <span class="modal-icon">👁️</span>
            <h3>Previsualización del Registro</h3>
          </div>
          <button class="close-modal" @click="showPreview = false">&times;</button>
        </div>

        <div class="preview-content">
          <!-- Sección: Información Personal -->
          <div class="preview-section">
            <div class="section-header">
              <span class="section-icon">👤</span>
              <h4>Información Personal</h4>
            </div>
            <div class="preview-grid">
              <div class="preview-item">
                <div class="preview-photo" v-if="photoDataUrl">
                  <img :src="photoDataUrl" alt="Foto paciente" />
                </div>
                <div class="preview-photo-placeholder" v-else>
                  <span>📷</span>
                  <small>Sin foto</small>
                </div>
              </div>
              <div class="preview-details">
                <div class="preview-field">
                  <label>Nombre completo</label>
                  <div class="value-highlight">{{ form.persona.nombres }} {{ form.persona.apellidos }}</div>
                </div>
                <div class="preview-field">
                  <label>CI</label>
                  <div class="value">{{ form.dni }}</div>
                </div>
                <div class="preview-field">
                  <label>Sexo</label>
                  <div class="value">{{ form.persona.sexo }}</div>
                </div>
                <div class="preview-field">
                  <label>Fecha de Nacimiento</label>
                  <div class="value">{{ form.fechaNacimiento }} ({{ ageString }})</div>
                </div>
                <div class="preview-field" v-if="ageCategory">
                  <label>Categoría</label>
                  <span class="badge badge-category">{{ ageCategory }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Sección: Contacto -->
          <div class="preview-section">
            <div class="section-header">
              <span class="section-icon">📞</span>
              <h4>Información de Contacto</h4>
            </div>
            <div class="preview-grid-3">
              <div class="preview-field">
                <label>Teléfono</label>
                <div class="value">📱 {{ form.telefono || 'N/A' }}</div>
              </div>
              <div class="preview-field">
                <label>Email</label>
                <div class="value">📧 {{ form.email || 'N/A' }}</div>
              </div>
              <div class="preview-field">
                <label>Dirección</label>
                <div class="value">🏠 {{ form.direccion.calle }} {{ form.direccion.numero }}, {{ form.direccion.ciudad || 'N/A' }}</div>
              </div>
            </div>
          </div>

          <!-- Sección: Información Médica -->
          <div class="preview-section" v-if="showMedicalInfo">
            <div class="section-header">
              <span class="section-icon">🏥</span>
              <h4>Información Médica</h4>
            </div>
            <div class="preview-grid-2">
              <div class="preview-field" v-if="form.medicalInfo.estadoAdherencia">
                <label>Estado de adherencia</label>
                <span class="badge badge-info">{{ form.medicalInfo.estadoAdherencia }}</span>
              </div>
              <div class="preview-field" v-if="form.medicalInfo.estadoActual">
                <label>Estado actual</label>
                <span class="badge badge-success">{{ form.medicalInfo.estadoActual }}</span>
              </div>
              <div class="preview-field" v-if="form.medicalInfo.estadoFisico">
                <label>Estado físico</label>
                <span class="badge badge-warning">{{ form.medicalInfo.estadoFisico }}</span>
              </div>
              <div class="preview-field" v-if="imcString">
                <label>IMC</label>
                <div class="value">{{ imcString }}</div>
              </div>
            </div>

            <!-- Alergias -->
            <div class="preview-field-full" v-if="form.medicalInfo.alergias.length > 0">
              <label>⚠️ Alergias</label>
              <div class="tags-preview">
                <span class="tag-preview tag-danger" v-for="(a, i) in form.medicalInfo.alergias" :key="i">{{ a }}</span>
              </div>
            </div>

            <!-- Enfermedades -->
            <div class="preview-field-full" v-if="form.medicalInfo.enfermedades.length > 0">
              <label>🩺 Enfermedades</label>
              <div class="tags-preview">
                <span class="tag-preview tag-purple" v-for="(e, i) in form.medicalInfo.enfermedades" :key="i">{{ e }}</span>
              </div>
            </div>

            <!-- Medicamentos -->
            <div class="preview-field-full" v-if="form.medicalInfo.medicamentos.length > 0">
              <label>💊 Medicamentos</label>
              <div class="tags-preview">
                <span class="tag-preview tag-blue" v-for="(m, i) in form.medicalInfo.medicamentos" :key="i">{{ m }}</span>
              </div>
            </div>

            <!-- Tratamiento -->
            <div class="preview-grid-2" v-if="form.medicalInfo.frecuenciaTratamiento">
              <div class="preview-field">
                <label>Frecuencia de tratamiento</label>
                <div class="value">⏰ {{ form.medicalInfo.frecuenciaTratamiento }}</div>
              </div>
              <div class="preview-field" v-if="form.medicalInfo.condicionToma">
                <label>Condición de toma</label>
                <div class="value">🍽️ {{ form.medicalInfo.condicionToma }}</div>
              </div>
            </div>

            <!-- Fotos médicas -->
            <div class="preview-photos" v-if="ciPhotoDataUrl || recetaFotoDataUrl">
              <div class="photo-item" v-if="ciPhotoDataUrl">
                <label>🆔 Foto CI</label>
                <img :src="ciPhotoDataUrl" alt="CI" />
              </div>
              <div class="photo-item" v-if="recetaFotoDataUrl">
                <label>📄 Receta médica</label>
                <img :src="recetaFotoDataUrl" alt="Receta" />
              </div>
            </div>
          </div>

          <!-- Responsable preview removed -->

          <!-- Expediente y Estado -->
          <div class="preview-section preview-footer">
            <div class="preview-grid-3">
              <div class="preview-field">
                <label>Expediente</label>
                <div class="value-badge">📋 {{ form.expediente }}</div>
              </div>
              <div class="preview-field">
                <label>Estado</label>
                <span class="badge badge-active">{{ form.estado }}</span>
              </div>
              <div class="preview-field">
                <label>Registrado por</label>
                <div class="value">👤 {{ form.usuarioRegistro || currentUserName }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-actions-enhanced">
          <button class="btn-secondary" @click="showPreview = false">
            <span>✏️</span> Editar
          </button>
          <button class="btn-print" @click="printPreview">
            <span>🖨️</span> Imprimir
          </button>
          <button class="btn-primary" @click="confirmSave(false)">
            <span>💾</span> Guardar
          </button>
          <button class="btn-success" @click="confirmSave(true)">
            <span>✅</span> Guardar y Ver Perfil
          </button>
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
import { userService } from '@/services/userService'
// Firebase auth + firestore helpers to create an actual user when email+password provided
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc, Timestamp } from 'firebase/firestore'
import { auth, db } from '@/firebase.js'

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
  password: '',
  preferenciaContacto: 'telefono',
  direccion: { calle: '', numero: '', zona: '', ciudad: '', provincia: '' },
  medicalInfo: { 
    estadoAdherencia: '', 
    estadoActual: '', 
    alergias: [], 
    enfermedades: [], 
    altura: null, 
    peso: null, 
    imc: null, 
    estadoFisico: '', 
    medicamentos: [], 
    recetadoPor: '', 
    frecuenciaTratamiento: '', 
    condicionToma: '', 
    observaciones: '' 
  },
  observaciones: '',
  seguro: { nombre: '', polid: '' },
  createdAt: new Date().toISOString()
})

const errors = reactive({})
const _allergy_temp = ref('')
const _enfermedad_temp = ref('')
const _medicamento_temp = ref('')
const photoFile = ref(null)
const photoDataUrl = ref('')
const ciPhotoFile = ref(null)
const ciPhotoDataUrl = ref('')
const recetaFotoFile = ref(null)
const recetaFotoDataUrl = ref('')
const showPreview = ref(false)
const duplicateWarning = ref(false)
const duplicateWarningMessages = ref([])
const showMedicalInfo = ref(false)

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

const maxDate = computed(() => new Date().toISOString().split('T')[0])

const ageCategory = computed(() => {
  if (!age.value) return ''
  if (age.value < 12) return 'Niño'
  if (age.value < 18) return 'Joven'
  return 'Adulto'
})


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
      errors.dni = form.dni && form.dni.trim().length >= 5 ? '' : 'CI inválido o muy corto (mínimo 5 dígitos)'
      break
    case 'telefono':
      errors.telefono = form.telefono && /^\+?\d{7,15}$/.test(form.telefono.replace(/\s+/g, '')) ? '' : 'Teléfono inválido (ej: +51 9xxxxxxx)'
      break
    case 'email':
      // email optional for patient, but validate format if provided
      errors.email = form.email ? (/^\S+@\S+\.\S+$/.test(form.email) ? '' : 'Correo inválido') : ''
      break
    case 'password':
      // password is optional; if provided must be >=6
      errors.password = form.password ? (form.password.length >= 6 ? '' : 'La contraseña debe tener al menos 6 caracteres') : ''
      break
  }
}

const recalculate = () => {
  // Re-evaluate age and imc
  form.medicalInfo.imc = imc.value
}

const addAllergy = () => {
  if (!_allergy_temp.value && !form.medicalInfo.alergias.length) return
  const v = _allergy_temp.value.trim()
  if (v && !form.medicalInfo.alergias.includes(v)) {
    form.medicalInfo.alergias.push(v)
  }
  _allergy_temp.value = ''
}

const removeAllergy = (i) => {
  form.medicalInfo.alergias.splice(i,1)
}

const addEnfermedad = () => {
  if (!_enfermedad_temp.value && !form.medicalInfo.enfermedades.length) return
  const v = _enfermedad_temp.value.trim()
  if (v && !form.medicalInfo.enfermedades.includes(v)) {
    form.medicalInfo.enfermedades.push(v)
  }
  _enfermedad_temp.value = ''
}

const removeEnfermedad = (i) => {
  form.medicalInfo.enfermedades.splice(i,1)
}

const addMedicamento = () => {
  if (!_medicamento_temp.value && !form.medicalInfo.medicamentos.length) return
  const v = _medicamento_temp.value.trim()
  if (v && !form.medicalInfo.medicamentos.includes(v)) {
    form.medicalInfo.medicamentos.push(v)
  }
  _medicamento_temp.value = ''
}

const removeMedicamento = (i) => {
  form.medicalInfo.medicamentos.splice(i,1)
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

const onCIPhotoSelected = (e) => {
  const f = e.target.files && e.target.files[0]
  if (!f) return
  ciPhotoFile.value = f
  const reader = new FileReader()
  reader.onload = () => { ciPhotoDataUrl.value = reader.result }
  reader.readAsDataURL(f)
}

const removeCIPhoto = () => { ciPhotoFile.value = null; ciPhotoDataUrl.value = '' }

// Responsable (tutor/familiar) handlers removed — no-op kept out on purpose

const onRecetaFotoSelected = (e) => {
  const f = e.target.files && e.target.files[0]
  if (!f) return
  recetaFotoFile.value = f
  const reader = new FileReader()
  reader.onload = () => { recetaFotoDataUrl.value = reader.result }
  reader.readAsDataURL(f)
}

const removeRecetaFoto = () => { recetaFotoFile.value = null; recetaFotoDataUrl.value = '' }

const usersList = computed(() => patients.value)

const checkDuplicates = () => {
  duplicateWarningMessages.value = []
  duplicateWarning.value = false
  if (form.dni) {
    const match = usersList.value.find(u => (u.dni && u.dni.toString() === form.dni.toString()))
    if (match) {
      duplicateWarningMessages.value.push(`⚠️ CI duplicado: Ya existe un paciente con CI ${form.dni}`)
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

  // Asegurar estado activo por defecto
  payload.estado = 'Activo'
  payload.isActive = true
  payload.role = 'user'
  payload.usuarioRegistro = currentUserName.value
  
  console.log("📋 [PatientRegistro] Usuario registro:", payload.usuarioRegistro)
  console.log("👤 [PatientRegistro] Usuario autenticado:", user.value)
  console.log("✅ [PatientRegistro] Estado del paciente:", payload.estado, "- isActive:", payload.isActive)

  if (!user.value) {
    console.error("❌ [PatientRegistro] No hay usuario autenticado")
    alert("Debe iniciar sesión para registrar pacientes")
    return
  }

  try {
    console.log("💾 [PatientRegistro] Guardando paciente en Firebase:", payload)
  // Prepare patient payload: remove fields we don't want in patients collection
  const patientPayload = JSON.parse(JSON.stringify(payload))
  // Removed tutor/responsable per request; also strip seguro from stored patient record
  delete patientPayload.seguro

    // Create or update users collection entry with desired structure
    try {
      // We'll capture a reference to the created user (uid or users doc id)
      let createdUserRef = null
      let createdUid = null

      // If email + password provided attempt to create Auth user
      if (payload.email && payload.password) {
        try {
          console.log('🔐 [PatientRegistro] Intentando crear usuario en Firebase Auth para', payload.email)
          const cred = await createUserWithEmailAndPassword(auth, payload.email.trim(), payload.password)
          const uid = cred.user.uid
          createdUid = uid
          console.log('✅ [PatientRegistro] Auth user creado UID:', uid)

          // create users/{uid} doc in Firestore with expected shape
          const nameParts = (payload.persona?.nombres || '').toString().trim().split(' ')
          const nombres = nameParts[0] || ''
          const apellidos = (payload.persona?.apellidos || '') || nameParts.slice(1).join(' ')

          const userDoc = {
            createdAt: Timestamp.now(),
            email: payload.email.trim().toLowerCase(),
            persona: {
              apellidos: apellidos,
              fecha_nac: payload.fechaNacimiento || null,
              nombres: nombres,
              sexo: payload.persona?.sexo || null
            },
            role: payload.role || 'user',
            settings: {
              familiar_email: null,
              intensidad_vibracion: 2,
              modo_silencio: false,
              notificar_a_familiar: false
            },
            telefono: payload.telefono || ''
          }

          await setDoc(doc(db, 'users', uid), userDoc)
          createdUserRef = { id: uid, ...userDoc }
          console.log('✅ [PatientRegistro] users/{uid} doc creado en Firestore')
        } catch (authErr) {
          console.error('❌ [PatientRegistro] Error creando Auth user:', authErr)
          // If email already in use, fallback to creating a users doc (non-auth) to keep record
          if (authErr.code === 'auth/email-already-in-use') {
            try {
              const userDocFallback = {
                createdAt: new Date(),
                email: payload.email || '',
                persona: {
                  nombres: payload.persona?.nombres || '',
                  apellidos: payload.persona?.apellidos || '',
                  fecha_nac: payload.fechaNacimiento || '',
                  sexo: payload.persona?.sexo || null
                },
                role: payload.role || 'user',
                settings: {
                  familiar_email: null,
                  intensidad_vibracion: 2,
                  modo_silencio: false,
                  notificar_a_familiar: false
                },
                telefono: payload.telefono || ''
              }
              const createdUser = await userService.createUser(userDocFallback)
              createdUserRef = createdUser
              console.log('ℹ️ [PatientRegistro] users doc creado (fallback):', createdUser)
            } catch (uErr) {
              console.error('❌ [PatientRegistro] Error creando users doc fallback:', uErr)
            }
          } else {
            // for other auth errors, log and continue
            console.warn('⚠️ [PatientRegistro] No se pudo crear Auth user, continuando con paciente:', authErr.message || authErr)
          }
        }
      } else {
        // No email+password provided: create a simple users document to keep contact info
        const userDoc = {
          createdAt: new Date(),
          email: payload.email || '',
          persona: {
            nombres: payload.persona?.nombres || '',
            apellidos: payload.persona?.apellidos || '',
            fecha_nac: payload.fechaNacimiento || '',
            sexo: payload.persona?.sexo || null
          },
          role: payload.role || 'user',
          settings: {
            familiar_email: null,
            intensidad_vibracion: 2,
            modo_silencio: false,
            notificar_a_familiar: false
          },
          telefono: payload.telefono || ''
        }
        try {
          const createdUser = await userService.createUser(userDoc)
          createdUserRef = createdUser
          console.log('✅ [PatientRegistro] users doc creado (sin auth):', createdUser)
        } catch (uErr) {
          console.error('❌ [PatientRegistro] Error creando users doc (sin auth):', uErr)
        }
      }

      // Attach linking info to patientPayload so paciente y usuario queden vinculados por correo/uid
      try {
        patientPayload.userEmail = payload.email || ''
        if (createdUid) {
          patientPayload.userUid = createdUid
        } else if (createdUserRef && createdUserRef.id) {
          patientPayload.userDocId = createdUserRef.id
        }

        // Mirror persona names into patient record to ensure they are the same
        if (createdUserRef && createdUserRef.persona) {
          patientPayload.persona = patientPayload.persona || {}
          patientPayload.persona.nombres = createdUserRef.persona.nombres || patientPayload.persona.nombres
          patientPayload.persona.apellidos = createdUserRef.persona.apellidos || patientPayload.persona.apellidos
          // also sync fecha_nac if present
          if (createdUserRef.persona.fecha_nac) patientPayload.fechaNacimiento = createdUserRef.persona.fecha_nac
        }
      } catch (linkErr) {
        console.warn('⚠️ [PatientRegistro] No se pudo vincular completamente paciente<->usuario:', linkErr)
      }
    } catch (uErrOuter) {
      console.error('❌ [PatientRegistro] Error en flujo de creación de usuario:', uErrOuter)
    }

    const createdId = await AdminPatientService.createPatient(patientPayload)
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
  form.medicalInfo = { 
    estadoAdherencia: '', 
    estadoActual: '', 
    alergias: [], 
    enfermedades: [], 
    altura: null, 
    peso: null, 
    imc: null, 
    estadoFisico: '', 
    medicamentos: [], 
    recetadoPor: '', 
    frecuenciaTratamiento: '', 
    condicionToma: '', 
    observaciones: '' 
  }
  form.direccion = { calle: '', numero: '', zona: '', ciudad: '', provincia: '' }
  form.seguro = { nombre: '', polid: '' }
  form.telefono = ''
  form.email = ''
  form.password = ''
  form.createdAt = new Date().toISOString()
  photoFile.value = null
  photoDataUrl.value = ''
  ciPhotoFile.value = null
  ciPhotoDataUrl.value = ''
  recetaFotoFile.value = null
  recetaFotoDataUrl.value = ''
  Object.keys(errors).forEach(k => delete errors[k])
  duplicateWarning.value = false
  duplicateWarningMessages.value = []
}

const printPreview = () => {
  const w = window.open('', '_blank')
  if (!w) return
  
  // Construir HTML profesional para impresión
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Ficha de Paciente - ${form.persona.nombres} ${form.persona.apellidos}</title>
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
        
        .medical-photos {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-top: 15px;
        }
        
        .medical-photo-item {
          text-align: center;
        }
        
        .medical-photo-item img {
          width: 100%;
          max-height: 180px;
          object-fit: contain;
          border: 2px solid #cbd5e1;
          border-radius: 6px;
          margin-top: 8px;
        }
        
        .medical-photo-label {
          font-weight: 700;
          color: #475569;
          font-size: 10pt;
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
        <h1>🏥 Ficha de Registro de Paciente</h1>
        <div class="subtitle">Sistema de Gestión Médica - VitalRecorder</div>
      </div>
      
      <!-- Foto del paciente -->
      ${photoDataUrl.value ? 
        `<img src="${photoDataUrl.value}" class="patient-photo" alt="Foto paciente" />` : 
        '<div class="no-photo">📷</div>'
      }
      
      <!-- Información Personal -->
      <div class="section">
        <div class="section-title">
          <span class="section-icon">👤</span>
          Información Personal
        </div>
        <div class="info-grid">
          <div class="info-item full-width">
            <div class="info-label">Nombre Completo</div>
            <div class="info-value-highlight">${form.persona.nombres} ${form.persona.apellidos}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Cédula de Identidad</div>
            <div class="info-value">🆔 ${form.dni || 'N/A'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Expediente</div>
            <div class="info-value">📋 ${form.expediente}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Fecha de Nacimiento</div>
            <div class="info-value">${form.fechaNacimiento || 'N/A'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Edad</div>
            <div class="info-value">${ageString.value || 'N/A'} ${ageCategory.value ? `<span class="badge badge-primary">${ageCategory.value}</span>` : ''}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Sexo</div>
            <div class="info-value">${form.persona.sexo || 'N/A'}</div>
          </div>
          <div class="info-item">
            <div class="info-label">Estado Civil</div>
            <div class="info-value">${form.estadoCivil || 'N/A'}</div>
          </div>
          ${form.lugarNacimiento ? `
          <div class="info-item">
            <div class="info-label">Lugar de Nacimiento</div>
            <div class="info-value">📍 ${form.lugarNacimiento}</div>
          </div>
          ` : ''}
          ${form.ocupacion ? `
          <div class="info-item">
            <div class="info-label">Ocupación</div>
            <div class="info-value">💼 ${form.ocupacion}</div>
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
            <div class="info-value">📱 ${form.telefono || 'N/A'}</div>
          </div>
          ${form.telefono2 ? `
          <div class="info-item">
            <div class="info-label">Teléfono Secundario</div>
            <div class="info-value">📱 ${form.telefono2}</div>
          </div>
          ` : ''}
          <div class="info-item">
            <div class="info-label">Email</div>
            <div class="info-value">📧 ${form.email || 'N/A'}</div>
          </div>
          <div class="info-item full-width">
            <div class="info-label">Dirección</div>
            <div class="info-value">🏠 ${form.direccion.calle} ${form.direccion.numero}, ${form.direccion.zona || ''} ${form.direccion.ciudad || ''}, ${form.direccion.provincia || ''}</div>
          </div>
        </div>
      </div>
      
      ${showMedicalInfo.value ? `
      <!-- Información Médica -->
      <div class="section">
        <div class="section-title">
          <span class="section-icon">🏥</span>
          Información Médica
        </div>
        <div class="info-grid">
          ${form.medicalInfo.estadoActual ? `
          <div class="info-item">
            <div class="info-label">Estado Actual</div>
            <div class="info-value"><span class="badge badge-success">${form.medicalInfo.estadoActual}</span></div>
          </div>
          ` : ''}
          ${form.medicalInfo.estadoAdherencia ? `
          <div class="info-item">
            <div class="info-label">Adherencia al Tratamiento</div>
            <div class="info-value"><span class="badge badge-primary">${form.medicalInfo.estadoAdherencia}</span></div>
          </div>
          ` : ''}
          ${form.medicalInfo.peso ? `
          <div class="info-item">
            <div class="info-label">Peso</div>
            <div class="info-value">⚖️ ${form.medicalInfo.peso} kg</div>
          </div>
          ` : ''}
          ${form.medicalInfo.altura ? `
          <div class="info-item">
            <div class="info-label">Altura</div>
            <div class="info-value">📏 ${form.medicalInfo.altura} cm</div>
          </div>
          ` : ''}
          ${imcString.value ? `
          <div class="info-item">
            <div class="info-label">IMC</div>
            <div class="info-value"><span class="badge badge-warning">${imcString.value}</span></div>
          </div>
          ` : ''}
          ${form.medicalInfo.estadoFisico ? `
          <div class="info-item">
            <div class="info-label">Estado Físico</div>
            <div class="info-value">${form.medicalInfo.estadoFisico}</div>
          </div>
          ` : ''}
        </div>
        
        ${form.medicalInfo.alergias.length > 0 ? `
        <div class="info-item full-width" style="margin-top: 15px;">
          <div class="info-label">⚠️ Alergias Registradas</div>
          <div class="tags-container">
            ${form.medicalInfo.alergias.map(a => `<span class="tag tag-danger">${a}</span>`).join('')}
          </div>
        </div>
        ` : ''}
        
        ${form.medicalInfo.enfermedades.length > 0 ? `
        <div class="info-item full-width" style="margin-top: 15px;">
          <div class="info-label">🩺 Enfermedades/Condiciones</div>
          <div class="tags-container">
            ${form.medicalInfo.enfermedades.map(e => `<span class="tag tag-purple">${e}</span>`).join('')}
          </div>
        </div>
        ` : ''}
        
        ${form.medicalInfo.medicamentos.length > 0 ? `
        <div class="info-item full-width" style="margin-top: 15px;">
          <div class="info-label">💊 Medicamentos Actuales</div>
          <div class="tags-container">
            ${form.medicalInfo.medicamentos.map(m => `<span class="tag">${m}</span>`).join('')}
          </div>
        </div>
        ` : ''}
        
        ${form.medicalInfo.frecuenciaTratamiento || form.medicalInfo.condicionToma ? `
        <div class="info-grid" style="margin-top: 15px;">
          ${form.medicalInfo.frecuenciaTratamiento ? `
          <div class="info-item">
            <div class="info-label">Frecuencia de Tratamiento</div>
            <div class="info-value">⏰ ${form.medicalInfo.frecuenciaTratamiento}</div>
          </div>
          ` : ''}
          ${form.medicalInfo.condicionToma ? `
          <div class="info-item">
            <div class="info-label">Condición de Toma</div>
            <div class="info-value">🍽️ ${form.medicalInfo.condicionToma}</div>
          </div>
          ` : ''}
        </div>
        ` : ''}
        
        ${form.medicalInfo.recetadoPor ? `
        <div class="info-item full-width" style="margin-top: 15px;">
          <div class="info-label">Recetado por</div>
          <div class="info-value">👨‍⚕️ Dr./Dra. ${form.medicalInfo.recetadoPor}</div>
        </div>
        ` : ''}
        
        ${form.medicalInfo.observaciones ? `
        <div class="info-item full-width" style="margin-top: 15px;">
          <div class="info-label">Observaciones Médicas</div>
          <div class="info-value">${form.medicalInfo.observaciones}</div>
        </div>
        ` : ''}
        
        ${ciPhotoDataUrl.value || recetaFotoDataUrl.value ? `
        <div class="medical-photos">
          ${ciPhotoDataUrl.value ? `
          <div class="medical-photo-item">
            <div class="medical-photo-label">🆔 Foto CI</div>
            <img src="${ciPhotoDataUrl.value}" alt="CI" />
          </div>
          ` : ''}
          ${recetaFotoDataUrl.value ? `
          <div class="medical-photo-item">
            <div class="medical-photo-label">📄 Receta Médica</div>
            <img src="${recetaFotoDataUrl.value}" alt="Receta" />
          </div>
          ` : ''}
        </div>
        ` : ''}
      </div>
      ` : ''}
      
      
      
      ${form.observaciones ? `
      <!-- Observaciones Generales -->
      <div class="section">
        <div class="section-title">
          <span class="section-icon">📝</span>
          Observaciones Generales
        </div>
        <div class="info-item full-width">
          <div class="info-value">${form.observaciones}</div>
        </div>
      </div>
      ` : ''}
      
      <!-- Footer -->
      <div class="footer">
        <div class="footer-item">
          <div class="footer-label">Estado</div>
          <div class="footer-value"><span class="badge badge-success">${form.estado}</span></div>
        </div>
        <div class="footer-item">
          <div class="footer-label">Registrado Por</div>
          <div class="footer-value">👤 ${form.usuarioRegistro || currentUserName.value}</div>
        </div>
        <div class="footer-item">
          <div class="footer-label">Fecha de Registro</div>
          <div class="footer-value">📅 ${registrationDate.value}</div>
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
  
  w.document.write(html)
  w.document.close()
  
  // Dar tiempo para que las imágenes se carguen antes de imprimir
  setTimeout(() => {
    w.print()
  }, 250)
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
.form-card input[readonly] { background:#f1f5f9; color:#111827 }
.form-card input::placeholder, .form-card textarea::placeholder { color:#9ca3af }

/* Estilos mejorados para fotografías */
.photo-label {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
  display: block;
}

.photo-upload-container {
  position: relative;
  width: 100%;
}

.photo-input {
  display: none;
}

.photo-upload-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2.5rem;
  border: 3px dashed #cbd5e1;
  border-radius: 16px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 220px;
}

.photo-upload-btn:hover {
  border-color: #667eea;
  background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.15);
}

.upload-icon {
  font-size: 4rem;
  line-height: 1;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.photo-upload-btn:hover .upload-icon {
  opacity: 1;
  transform: scale(1.1);
}

.upload-text {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.upload-text strong {
  font-size: 1.1rem;
  color: #1e293b;
}

.upload-text small {
  font-size: 0.9rem;
  color: #64748b;
}

.photo-preview-enhanced {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.photo-preview-enhanced:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.photo-preview-enhanced img {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
  display: block;
  background: #f8fafc;
}

.photo-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 70%, transparent 100%);
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.photo-preview-enhanced:hover .photo-overlay {
  opacity: 1;
}

.btn-remove-photo,
.btn-change-photo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-remove-photo {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
}

.btn-remove-photo:hover {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
}

.btn-change-photo {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

.btn-change-photo:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
}
.tag-input { display:flex; flex-direction:column }
.tag-input input { 
  padding: 0.75rem; 
  border: 2px solid #e5e7eb; 
  border-radius: 10px; 
  font-size: 0.95rem;
  transition: all 0.2s;
}
.tag-input input:focus {
  border-color: #2563eb;
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
.tags { 
  margin-top: 0.75rem; 
  display: flex; 
  gap: 0.6rem; 
  flex-wrap: wrap;
  min-height: 2.5rem;
  padding: 0.5rem;
  background: #f9fafb;
  border-radius: 8px;
}
.tag { 
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 0.75rem; 
  border-radius: 20px; 
  display: inline-flex; 
  align-items: center; 
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.25);
  transition: all 0.2s;
}
.tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.35);
}
/* Colores específicos para cada tipo de tag */
.tag-alergia {
  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
}
.tag-alergia:hover {
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
}
.tag-enfermedad {
  background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
}
.tag-enfermedad:hover {
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
}
.tag-medicamento {
  background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}
.tag-medicamento:hover {
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}
.tag button, .tag .tag-remove { 
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all 0.2s;
}
.tag button:hover, .tag .tag-remove:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
}
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

/* Modal Mejorado */
.modal-overlay { 
  position: fixed; 
  inset: 0; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 9999 !important;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-preview {
  background: white;
  border-radius: 20px;
  width: min(1100px, 95%);
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10000 !important;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-bottom: 3px solid rgba(255, 255, 255, 0.2);
}

.modal-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.modal-icon {
  font-size: 2rem;
  line-height: 1;
}

.modal-title h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.close-modal {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.close-modal:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.preview-content {
  overflow-y: auto;
  padding: 2rem;
  background: #f8fafc;
  flex: 1;
}

.preview-section {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e5e7eb;
}

.section-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.section-header h4 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
}

.preview-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.5rem;
  align-items: start;
}

.preview-grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.preview-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.preview-photo {
  width: 150px;
  height: 150px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.preview-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-photo-placeholder {
  width: 150px;
  height: 150px;
  border-radius: 16px;
  background: linear-gradient(135deg, #e5e7eb 0%, #cbd5e1 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 3rem;
  color: #64748b;
}

.preview-photo-placeholder small {
  font-size: 0.875rem;
  color: #64748b;
}

.preview-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.preview-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.preview-field label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.preview-field .value {
  font-size: 1rem;
  color: #1e293b;
  font-weight: 500;
}

.preview-field .value-highlight {
  font-size: 1.25rem;
  color: #667eea;
  font-weight: 700;
}

.value-badge {
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  padding: 0.5rem 1rem;
  border-radius: 12px;
  font-weight: 600;
  color: #1e293b;
  display: inline-block;
}

.preview-field-full {
  margin-top: 1rem;
}

.preview-field-full label {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.75rem;
  display: block;
}

.tags-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tag-preview {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.tag-danger {
  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
}

.tag-purple {
  background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
}

.tag-blue {
  background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
}

.badge {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
}

.badge-category {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  color: white;
}

.badge-info {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
}

.badge-success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.badge-warning {
  background: linear-gradient(135deg, #f59e0b 0%, #dc2626 100%);
  color: white;
}

.badge-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.badge-active {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  font-size: 1rem;
  padding: 0.5rem 1.25rem;
}

.preview-photos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.photo-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.photo-item label {
  font-weight: 700;
  color: #1e293b;
  font-size: 0.95rem;
}

.photo-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.preview-footer {
  background: linear-gradient(135deg, #f8fafc 0%, #e5e7eb 100%);
  border: 2px dashed #cbd5e1;
}

.modal-actions-enhanced {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding: 1.5rem 2rem;
  background: white;
  border-top: 2px solid #e5e7eb;
}

.modal-actions-enhanced button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.btn-secondary {
  background: #f3f4f6;
  color: #1e293b;
}

.btn-secondary:hover {
  background: #e5e7eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-print {
  background: linear-gradient(135deg, #64748b 0%, #475569 100%);
  color: white;
}

.btn-print:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(100, 116, 139, 0.3);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.btn-success:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

/* Toggle Section Styles */
.toggle-section {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 1.25rem 1.5rem;
  border-radius: 14px;
  margin: 1.5rem 0;
  border: 2px dashed #cbd5e1;
  transition: all 0.3s ease;
}

.toggle-section:hover {
  border-color: #94a3b8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  user-select: none;
}

.toggle-checkbox {
  display: none;
}

.toggle-switch {
  position: relative;
  width: 56px;
  height: 30px;
  background: #cbd5e1;
  border-radius: 15px;
  transition: all 0.3s ease;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.toggle-switch::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.toggle-checkbox:checked + .toggle-switch {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.toggle-checkbox:checked + .toggle-switch::after {
  transform: translateX(26px);
}

.toggle-text {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.toggle-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.toggle-text strong {
  color: #1e293b;
  font-size: 1.05rem;
}

.toggle-hint {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 400;
  margin-left: 0.5rem;
}

/* Animación de aparición para las secciones */
.section {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width:768px) {
  .form-grid { grid-template-columns: 1fr }
  
  .toggle-section {
    padding: 1rem;
  }
  
  .toggle-text {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .toggle-hint {
    margin-left: 0;
  }

  /* Modal responsive */
  .modal-preview {
    width: 100%;
    max-height: 100vh;
    border-radius: 0;
  }

  .modal-header {
    padding: 1rem 1.5rem;
  }

  .modal-title h3 {
    font-size: 1.25rem;
  }

  .preview-content {
    padding: 1rem;
  }

  .preview-section {
    padding: 1rem;
  }

  .preview-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .preview-grid-2,
  .preview-grid-3 {
    grid-template-columns: 1fr;
  }

  .preview-details {
    grid-template-columns: 1fr;
  }

  .preview-photo,
  .preview-photo-placeholder {
    width: 100%;
    max-width: 200px;
    margin: 0 auto;
  }

  .modal-actions-enhanced {
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 1rem;
  }

  .modal-actions-enhanced button {
    flex: 1;
    min-width: calc(50% - 0.25rem);
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
}
</style>