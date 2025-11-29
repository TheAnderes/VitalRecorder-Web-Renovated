<template>
  <div class="admin-page patient-edit">
    <div class="page-header">
      <div class="header-content">
        <h2>Editar Cuidador</h2>
        <p>Modifique los datos del cuidador y guarde los cambios.</p>
      </div>
    </div>


    <div class="card form-card" v-if="patient">
      <!-- DATOS EDITABLES (solo los mismos del registro) -->
      <h3>Datos</h3>
      <div class="form-grid">
        <div class="field"><label>Nombre</label><input v-model="local.persona.nombres" /></div>
        <div class="field"><label>Apellidos</label><input v-model="local.persona.apellidos" /></div>
        <div class="field">
          <label>Fecha de Nacimiento</label>
          <input type="date" v-model="local.persona.fecha_date" />
        </div>
        <div class="field"><label>Sexo</label>
          <select v-model="local.persona.sexo">
            <option value="">Seleccionar...</option>
            <option>Masculino</option>
            <option>Femenino</option>
            <option>Otro</option>
          </select>
        </div>
        <div class="field"><label>Teléfono</label><input v-model="local.telefono" /></div>
        <div class="field"><label>Email</label><input v-model="local.email" /></div>
        <!-- Rol no editable desde aquí -->
      </div>

      <!-- BOTONES -->
      <div class="form-actions">
        <button class="secondary" @click="cancel">Cancelar</button>
        <button class="primary" @click="save">Guardar</button>
      </div>
    </div>

    <div v-else class="card">
      <p>Cuidador no encontrado.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { userService } from '@/services/userService'
import { Timestamp } from 'firebase/firestore'

const route = useRoute()
const router = useRouter()

// Obtain edit id dynamically from the route (supports either ?editId= or ?id=)
const getEditId = () => route.query.editId || route.query.id
const patient = ref(null)
const loading = ref(false)
const local = reactive({
  persona: { fecha_nac: '', fecha_date: '', fecha_time: '', tz_text: '' },
  telefono: '',
  email: ''
})

// Flexible date parser (same rules as registration): accepts Date, Firestore Timestamp,
// ISO (YYYY-MM-DD), DD/MM/YYYY, and Spanish textual forms like "26 de noviembre de 1983, 12:00:00 a.m. UTC-4".
const parseFlexibleDate = (input) => {
  if (!input && input !== 0) return null
  if (typeof input === 'object') {
    if (typeof input.toDate === 'function') return input.toDate()
    if (input instanceof Date) return input
    return null
  }
  if (typeof input === 'string') {
    const s = input.trim()
    if (!s) return null
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
      const d = new Date(s)
      return isNaN(d.getTime()) ? null : d
    }
    const dmy = /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/.exec(s)
    if (dmy) {
      const day = parseInt(dmy[1], 10)
      const month = parseInt(dmy[2], 10) - 1
      const year = parseInt(dmy[3], 10)
      return new Date(year, month, day)
    }

    const months = { enero:0, febrero:1, marzo:2, abril:3, mayo:4, junio:5, julio:6, agosto:7, septiembre:8, octubre:9, noviembre:10, diciembre:11 }
    const txt = /^(\d{1,2})\s+de\s+([a-zñ]+)\s+de\s+(\d{4})(?:[\,\s]+(.+))?/i.exec(s)
    if (txt) {
      const day = parseInt(txt[1], 10)
      const monthName = (txt[2] || '').toLowerCase()
      const year = parseInt(txt[3], 10)
      const monthIdx = months[monthName]
      if (monthIdx !== undefined) {
        let date = new Date(year, monthIdx, day)
        const timePart = txt[4] || ''
        if (timePart) {
          const timeMatch = /(\d{1,2}):(\d{2})(?::(\d{2}))?/.exec(timePart)
          if (timeMatch) {
            let hours = parseInt(timeMatch[1], 10)
            const minutes = parseInt(timeMatch[2], 10)
            const seconds = parseInt(timeMatch[3] || '0', 10)
            if (/a\.?m\.?|am/i.test(timePart)) {
              if (hours === 12) hours = 0
            } else if (/p\.?m\.?|pm/i.test(timePart)) {
              if (hours < 12) hours += 12
            }
            date = new Date(year, monthIdx, day, hours, minutes, seconds)
          }
          const tzMatch = /UTC(?:\s*|)([+\-]\d{1,2})/.exec(timePart)
          if (tzMatch) {
            const offset = parseInt(tzMatch[1], 10)
            date = new Date(date.getTime() - offset * 3600 * 1000)
          }
        }
        return date
      }
    }

    const fallback = new Date(s)
    return isNaN(fallback.getTime()) ? null : fallback
  }
  return null
}

// Format a Date to Spanish textual form with UTC offset like: "26 de noviembre de 1983, 12:00:00 a.m. UTC-4"
const formatDateToSpanishWithUTCOffset = (date) => {
  if (!date || !(date instanceof Date)) return ''
  const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
  const day = date.getDate()
  const monthName = months[date.getMonth()]
  const year = date.getFullYear()
  const hours24 = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2,'0')
  const seconds = String(date.getSeconds()).padStart(2,'0')
  const ampm = hours24 >= 12 ? 'p.m.' : 'a.m.'
  let hours12 = hours24 % 12
  if (hours12 === 0) hours12 = 12
  const offsetHours = -date.getTimezoneOffset()/60
  const tzStr = `UTC${offsetHours >= 0 ? '+'+offsetHours : offsetHours}`
  return `${day} de ${monthName} de ${year}, ${hours12}:${minutes}:${seconds} ${ampm} ${tzStr}`
}

const loadUser = async () => {
  try {
    loading.value = true
    console.log("🔄 [PatientEdit] Cargando usuario desde users...")
    const id = getEditId()
    const user = await userService.getUserById(id)
      if (user) {
      patient.value = user
      // Map editable fields
      local.persona = local.persona || {}
      local.persona.nombres = user.persona?.nombres || ''
      local.persona.apellidos = user.persona?.apellidos || ''
      // Normalize incoming fecha_nac into date/time/tz fields for the calendar/time inputs
      let rawDob = user.persona?.fecha_nac || user.persona?.fecha_nacimiento || user.fechaNacimiento || ''
      try {
        // If it's a Firestore Timestamp or Date, build ISO date and time
        if (rawDob && typeof rawDob === 'object' && typeof rawDob.toDate === 'function') {
          const d = rawDob.toDate()
          local.persona.fecha_date = d.toISOString().split('T')[0]
          local.persona.fecha_time = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`
          local.persona.tz_text = `UTC${-d.getTimezoneOffset()/60 >= 0 ? '+' + (-d.getTimezoneOffset()/60) : (-d.getTimezoneOffset()/60)}`
          // preserve a human-readable time segment to reuse when saving
          local.persona.original_time_text = (() => {
            const hours24 = d.getHours()
            const minutes = String(d.getMinutes()).padStart(2,'0')
            const seconds = String(d.getSeconds()).padStart(2,'0')
            const ampm = hours24 >= 12 ? 'p.m.' : 'a.m.'
            let hours12 = hours24 % 12
            if (hours12 === 0) hours12 = 12
            return `${hours12}:${minutes}:${seconds} ${ampm}`
          })()
        } else if (rawDob instanceof Date) {
          const d = rawDob
          local.persona.fecha_date = d.toISOString().split('T')[0]
          local.persona.fecha_time = `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`
          local.persona.tz_text = `UTC${-d.getTimezoneOffset()/60 >= 0 ? '+' + (-d.getTimezoneOffset()/60) : (-d.getTimezoneOffset()/60)}`
          local.persona.original_time_text = (() => {
            const hours24 = d.getHours()
            const minutes = String(d.getMinutes()).padStart(2,'0')
            const seconds = String(d.getSeconds()).padStart(2,'0')
            const ampm = hours24 >= 12 ? 'p.m.' : 'a.m.'
            let hours12 = hours24 % 12
            if (hours12 === 0) hours12 = 12
            return `${hours12}:${minutes}:${seconds} ${ampm}`
          })()
        } else if (typeof rawDob === 'string' && rawDob.trim()) {
          // Try to extract parts from textual Spanish form
          const txt = rawDob.trim()
          const tzMatch = /UTC\s*([+\-]?\d{1,2})/.exec(txt)
          if (tzMatch) local.persona.tz_text = `UTC${tzMatch[1]}`
          // Extract day/month/year/time via regex
          const txtMatch = /^(\d{1,2})\s+de\s+([a-zñ]+)\s+de\s+(\d{4})(?:[\,\s]+(.+))?/i.exec(txt)
          if (txtMatch) {
            const day = parseInt(txtMatch[1], 10)
            const monthMap = { enero:0, febrero:1, marzo:2, abril:3, mayo:4, junio:5, julio:6, agosto:7, septiembre:8, octubre:9, noviembre:10, diciembre:11 }
            const monthIdx = monthMap[(txtMatch[2]||'').toLowerCase()]
            const year = parseInt(txtMatch[3], 10)
            // time part
            let hours = 0, minutes = 0, seconds = 0
            if (txtMatch[4]) {
              const timePart = txtMatch[4]
              const tm = /(\d{1,2}):(\d{2})(?::(\d{2}))?/.exec(timePart)
              if (tm) {
                hours = parseInt(tm[1],10)
                minutes = parseInt(tm[2],10)
                seconds = parseInt(tm[3]||'0',10)
                if (/a\.?m\.?|am/i.test(timePart)) { if (hours===12) hours = 0 }
                else if (/p\.?m\.?|pm/i.test(timePart)) { if (hours<12) hours += 12 }
              }
              // preserve original human time portion exactly as in text if possible
              const humanTimeMatch = /(\d{1,2}:\d{2}(?::\d{2})?)\s*(a\.?m\.?|p\.?m\.?|am|pm)/i.exec(timePart)
              if (humanTimeMatch) {
                // normalize to "h:mm:ss a.m./p.m." (no leading zero hour)
                const h = parseInt(humanTimeMatch[1].split(':')[0],10)
                const mm = humanTimeMatch[1].split(':')[1] || '00'
                const ss = humanTimeMatch[1].split(':')[2] || '00'
                const mer = humanTimeMatch[2].toLowerCase().replace(/\./g,'')
                const merText = /p/i.test(mer) ? 'p.m.' : 'a.m.'
                local.persona.original_time_text = `${h}:${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')} ${merText}`
              }
            }
            if (!isNaN(year) && monthIdx !== undefined && !isNaN(day)) {
              const d = new Date(year, monthIdx, day, hours, minutes, seconds)
              local.persona.fecha_date = d.toISOString().split('T')[0]
              local.persona.fecha_time = `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`
              // if we didn't already get a human original_time_text, create one from parsed values
              if (!local.persona.original_time_text) {
                const hours24 = hours
                const ampm = hours24 >= 12 ? 'p.m.' : 'a.m.'
                let hours12 = hours24 % 12
                if (hours12 === 0) hours12 = 12
                local.persona.original_time_text = `${hours12}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')} ${ampm}`
              }
            } else {
              // fallback: try parsing with generic parser
              const parsed = parseFlexibleDate(rawDob)
              if (parsed) {
                local.persona.fecha_date = parsed.toISOString().split('T')[0]
                local.persona.fecha_time = `${String(parsed.getHours()).padStart(2,'0')}:${String(parsed.getMinutes()).padStart(2,'0')}:${String(parsed.getSeconds()).padStart(2,'0')}`
                if (!local.persona.original_time_text) {
                  const hours24 = parsed.getHours()
                  const ampm = hours24 >= 12 ? 'p.m.' : 'a.m.'
                  let hours12 = hours24 % 12
                  if (hours12 === 0) hours12 = 12
                  local.persona.original_time_text = `${hours12}:${String(parsed.getMinutes()).padStart(2,'0')}:${String(parsed.getSeconds()).padStart(2,'0')} ${ampm}`
                }
              }
            }
          } else {
            const parsed = parseFlexibleDate(rawDob)
            if (parsed) {
              local.persona.fecha_date = parsed.toISOString().split('T')[0]
              local.persona.fecha_time = `${String(parsed.getHours()).padStart(2,'0')}:${String(parsed.getMinutes()).padStart(2,'0')}:${String(parsed.getSeconds()).padStart(2,'0')}`
            } else {
              local.persona.fecha_date = ''
              local.persona.fecha_time = ''
            }
          }
        } else {
          local.persona.fecha_date = ''
          local.persona.fecha_time = ''
          local.persona.tz_text = ''
        }
      } catch (dErr) {
        console.warn('⚠️ [PatientEdit] No se pudo extraer fecha_nac, usando raw:', dErr)
        local.persona.fecha_date = ''
        local.persona.fecha_time = ''
        local.persona.tz_text = ''
      }
      local.persona.sexo = user.persona?.sexo || ''
      local.telefono = user.telefono || ''
      local.email = user.email || ''
      console.log('👤 [PatientEdit] Usuario cargado para edición:', patient.value)
    } else {
      console.warn('⚠️ [PatientEdit] No se encontró usuario con id:', id)
    }
  } catch (err) {
    console.error('❌ [PatientEdit] Error cargando usuario:', err)
  } finally {
    loading.value = false
  }
}

const save = async () => {
  if (!patient.value || !patient.value.id) return
  try {
    // Only update existing user in users collection. Do not create patients or users.
    const userId = patient.value.id
    const existingUser = await userService.getUserById(userId)
    if (!existingUser) {
      console.warn('⚠️ [PatientEdit] Usuario no existe en users, no se creará uno nuevo. Abortando save.')
      return
    }
    const userPatch = {
      persona: {
        nombres: local.persona?.nombres || '',
        apellidos: local.persona?.apellidos || '',
        fecha_nac: null,
        sexo: local.persona?.sexo || null
      }
    }

    // Build textual fecha_nac in Spanish with UTC offset, based only on the calendar date.
    try {
      let finalText = null
      if (local.persona && local.persona.fecha_date) {
        const [y, m, d] = (local.persona.fecha_date || '').split('-').map(n => parseInt(n,10))
        // Reuse original human time text if present (keeps same format: e.g. "8:00:00 p.m.")
        const timeText = local.persona.original_time_text || null
        // If tz_text exists use it, otherwise browser offset
        const tzMatch = /UTC\s*([+\-]?\d{1,2})/.exec(local.persona.tz_text || '')
        const tzOffset = tzMatch ? parseInt(tzMatch[1],10) : (-new Date().getTimezoneOffset()/60)
        const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
        const monthName = months[(m-1)]
        if (timeText) {
          // timeText already contains meridiem (a.m./p.m.) and seconds, use it as-is
          finalText = `${d} de ${monthName} de ${y}, ${timeText} UTC${tzOffset >= 0 ? '+'+tzOffset : tzOffset}`
        } else if (local.persona.fecha_time) {
          // fallback: build from numeric time
          const [hh,mm,ss] = (local.persona.fecha_time || '00:00:00').split(':').map(n => parseInt(n,10))
          const ampm = hh >= 12 ? 'p.m.' : 'a.m.'
          let hours12 = hh % 12
          if (hours12 === 0) hours12 = 12
          finalText = `${d} de ${monthName} de ${y}, ${hours12}:${String(mm).padStart(2,'0')}:${String(ss).padStart(2,'0')} ${ampm} UTC${tzOffset >= 0 ? '+'+tzOffset : tzOffset}`
        } else {
          // final fallback: midnight
          finalText = `${d} de ${monthName} de ${y}, 12:00:00 a.m. UTC${tzOffset >= 0 ? '+'+tzOffset : tzOffset}`
        }
      }
      userPatch.persona.fecha_nac = finalText
    } catch (pe) {
      console.warn('⚠️ [PatientEdit] No se pudo construir fecha_nac textual:', pe)
      userPatch.persona.fecha_nac = null
    }
    if (local.telefono !== undefined) userPatch.telefono = local.telefono
    if (local.email !== undefined) userPatch.email = (local.email || '').toLowerCase()

    console.log('🔁 [PatientEdit] Actualizando usuario existente', userId, userPatch)
    await userService.updateUser(userId, userPatch)
    console.log('✅ [PatientEdit] Usuario actualizado en users')
    // No additional patient writes: this editor works only with users collection
    router.push({ name: 'admin-patient-perfil', query: { id: patient.value.id } })
  } catch (e) {
    console.error('Error guardando edición:', e)
  }
}

const cancel = () => router.back()

onMounted(async () => {
  await loadUser()
})

// Reload if route editId/id changes
import { watch } from 'vue'
watch(() => getEditId(), async (newId, oldId) => {
  if (newId && newId !== oldId) {
    await loadUser()
  }
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
