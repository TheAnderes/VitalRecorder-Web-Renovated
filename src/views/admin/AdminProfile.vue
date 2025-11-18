<template>
  <AdminLayout>
    <div class="admin-profile-page">
      <div class="page-header">
        <h2>Mi Perfil</h2>
        <p class="muted">Ver y actualizar información de cuenta y solicitar cambio de contraseña</p>
      </div>

      <div class="profile-grid">
        <div class="profile-card">
          <h3>Información Personal</h3>
          <form @submit.prevent="saveProfile">
            <label class="field">
              <span>Nombre</span>
              <input v-model="form.persona.nombres" type="text" />
            </label>

            <label class="field">
              <span>Apellidos</span>
              <input v-model="form.persona.apellidos" type="text" />
            </label>

            <label class="field">
              <span>Email</span>
              <input v-model="form.email" type="email" disabled />
            </label>

            <label class="field">
              <span>Teléfono</span>
              <input v-model="form.persona.telefono" type="text" />
            </label>

            <div class="actions">
              <button type="submit" class="btn primary">Guardar</button>
            </div>
          </form>
        </div>

        <div class="profile-card">
          <h3>Seguridad</h3>
            <p class="muted">Para cambiar la contraseña, introduce tu contraseña actual y la nueva. Puedes mostrar los campos con el toggle para verificar lo que escribes.</p>
            <label class="field" style="display:flex;flex-direction:column;gap:8px">
              <div style="display:flex;align-items:center;gap:8px">
                <span style="flex:1">Contraseña Actual</span>
                <div v-if="verified" style="background:#ecfdf5;color:#065f46;padding:4px 8px;border-radius:999px;font-size:12px">Contraseña verificada</div>
              </div>
              <div style="display:flex;gap:8px;align-items:center">
                <input style="flex:1" :type="showPasswords ? 'text' : 'password'" v-model="form.currentPassword" />
                <button type="button" @click="verifyCurrentPassword" class="btn outline" :disabled="verificationInProgress">Verificar</button>
              </div>
            </label>
            <label class="field">
              <span>Nueva Contraseña</span>
              <input :type="showPasswords ? 'text' : 'password'" v-model="form.newPassword" />
            </label>
            <label class="field">
              <span>Confirmar Nueva Contraseña</span>
              <input :type="showPasswords ? 'text' : 'password'" v-model="form.confirmPassword" />
            </label>
            <label class="field" style="align-items:center;flex-direction:row;gap:8px">
              <input type="checkbox" v-model="showPasswords" id="showPwd" /> <label for="showPwd">Mostrar contraseñas</label>
            </label>
            <div class="actions">
              <button @click="changePassword" :disabled="changingPassword" class="btn primary">Cambiar Contraseña</button>
            </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import AdminLayout from '@/components/admin/AdminLayout.vue'
import { useAuth } from '@/composables/useAuth'
import { userService } from '@/services/userService'
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth'
import { auth } from '@/firebase'

const loading = ref(false)
const saving = ref(false)
const changingPassword = ref(false)
const verificationInProgress = ref(false)
const verified = ref(false)
const showPasswords = ref(false)
const { user, getUserData } = useAuth()

const form = reactive({
  id: '',
  email: '',
  persona: {
    nombres: '',
    apellidos: '',
    telefono: ''
  },
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const loadProfile = async () => {
  try {
    loading.value = true
    const authUser = user.value
    if (!authUser) {
      const data = getUserData()
      if (data) form.email = data.email
    }

    const uid = authUser ? authUser.uid : (getUserData() && getUserData().uid)
    if (!uid) return

    const record = await userService.getUserById(uid)
    if (!record) return

    form.id = record.id
    form.email = record.email || ''
    form.persona.nombres = record.persona?.nombres || ''
    form.persona.apellidos = record.persona?.apellidos || ''
    form.persona.telefono = record.persona?.telefono || ''
  } catch (err) {
    console.error('Error cargando perfil:', err)
    alert('Error cargando perfil. Revisa la consola.')
  } finally {
    loading.value = false
  }
}

const saveProfile = async () => {
  try {
    saving.value = true
    if (!form.id) return alert('Usuario no identificado')
    const update = {
      persona: {
        nombres: form.persona.nombres,
        apellidos: form.persona.apellidos,
        telefono: form.persona.telefono
      }
    }
    await userService.updateUser(form.id, update)
    alert('Perfil actualizado correctamente')
  } catch (err) {
    console.error('Error guardando perfil:', err)
    alert('Error al guardar. Revisa la consola.')
  } finally {
    saving.value = false
  }
}

// Note: send-reset-by-email removed per request. Password change is handled via reauthentication + updatePassword.

const changePassword = async () => {
  try {
    if (!form.currentPassword) return alert('Ingrese su contraseña actual')
    if (form.newPassword.length < 6) return alert('La nueva contraseña debe tener al menos 6 caracteres')
    if (form.newPassword !== form.confirmPassword) return alert('Las contraseñas no coinciden')
    changingPassword.value = true

    const currentUser = user.value || auth.currentUser
    if (!currentUser) return alert('Usuario no autenticado')

    // Only reauthenticate here if we haven't recently verified the current password
    if (!verified.value) {
      const credential = EmailAuthProvider.credential(currentUser.email, form.currentPassword)
      await reauthenticateWithCredential(currentUser, credential)
    }

    await updatePassword(currentUser, form.newPassword)
    alert('Contraseña actualizada correctamente')
    // limpiar campos y estado de verificación
    form.currentPassword = ''
    form.newPassword = ''
    form.confirmPassword = ''
    verified.value = false
  } catch (err) {
    console.error('Error cambiando contraseña:', err)
    // Proveer mensajes útiles según código
    if (err.code === 'auth/wrong-password') alert('Contraseña actual incorrecta')
    else if (err.code === 'auth/requires-recent-login') alert('Re-autentíquese y vuelva a intentar')
    else alert('No se pudo cambiar la contraseña. Revisa la consola.')
  } finally {
    changingPassword.value = false
  }
}

const verifyCurrentPassword = async () => {
  try {
    if (!form.currentPassword) return alert('Ingrese su contraseña actual para verificar')
    verificationInProgress.value = true
    const currentUser = user.value || auth.currentUser
    if (!currentUser) return alert('Usuario no autenticado')

    const credential = EmailAuthProvider.credential(currentUser.email, form.currentPassword)
    await reauthenticateWithCredential(currentUser, credential)
    verified.value = true
    alert('Contraseña verificada correctamente')
  } catch (err) {
    console.error('Error verificando contraseña:', err)
    if (err.code === 'auth/wrong-password') alert('Contraseña actual incorrecta')
    else alert('No se pudo verificar la contraseña. Revisa la consola.')
  } finally {
    verificationInProgress.value = false
  }
}

onMounted(() => {
  loadProfile()
})
</script>

<style scoped>
.admin-profile-page { padding: 1.5rem; }
.page-header h2 { margin: 0; font-size: 1.5rem }
.muted { color: #6b7280; margin-top: 4px }
.profile-grid { display: grid; grid-template-columns: 1fr 360px; gap: 1rem; margin-top: 1rem }
.profile-card { background: #fff; padding: 1rem; border-radius: 10px; box-shadow: 0 6px 18px rgba(2,6,23,0.04) }
.profile-card h3 { margin: 0 0 8px 0 }
.field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 10px }
.field span { font-size: 0.85rem; color: #374151 }
.field input { padding: 8px 10px; border: 1px solid #e5e7eb; border-radius: 6px }
.actions { display:flex; gap:8px; margin-top:12px }
.btn { padding: 8px 12px; border-radius: 6px; cursor: pointer; border: none }
.btn.primary { background: #3b82f6; color: white }
.btn.outline { background: transparent; border: 1px solid #cbd5e1; color: #374151 }

@media (max-width: 900px) {
  .profile-grid { grid-template-columns: 1fr; }
}
</style>
