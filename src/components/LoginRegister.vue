<template>
  <div class="auth-container">
    <!-- Header común -->
    <header class="auth-header">
      <img 
        class="brand-mark" 
        src="/Logo.png" 
        alt="VITALSYSTEMS Logo Icon" 
        onerror="this.style.display='none'"
        @click="goHome"
      />
      <div class="brand-text" @click="goHome">VITALSYSTEMS</div>
    </header>

    <!-- Contenedor principal -->
    <div class="auth-main">
      <!-- Panel de Login -->
      <div class="auth-panel login-panel" :class="{ 'active': activePanel === 'login' }">
        <BaseCard class="auth-card">
          <button class="back-button" aria-label="Volver" @click="goBack">
            &#x2190;
          </button>

          <h1 class="title">Iniciar Sesión</h1>
          <p class="subtitle">
            ¿Es tu primera vez? 
            <a href="#" @click.prevent="switchToRegister">Regístrate aquí</a>
          </p>

          <form @submit.prevent="handleLogin" class="auth-form">
            <BaseInput
              label="Correo electrónico:"
              id="login-email"
              type="email"
              v-model="loginData.email"
              placeholder="tucorreo@gmail.com"
              required
            />

            <BaseInput
              label="Contraseña:"
              id="login-password"
              type="password"
              v-model="loginData.password"
              placeholder="Contraseña"
              required
            />

            <a href="/recuperar-contrasena" class="forgot-password">¿Olvidaste tu contraseña?</a>

            <PrimaryButton type="submit" name="Iniciar Sesión" :disabled="loginLoading" />
          </form>
        </BaseCard>
      </div>

      <!-- Panel de Register -->
      <div class="auth-panel register-panel" :class="{ 'active': activePanel === 'register' }">
        <BaseCard class="auth-card">
          <button class="back-button" aria-label="Volver" @click="goBack">
            &#x2190;
          </button>

          <h1 class="title">Registrarse</h1>
          <p class="subtitle">
            ¿Ya tienes cuenta? 
            <a href="#" @click.prevent="switchToLogin">Inicia sesión aquí</a>
          </p>

          <form @submit.prevent="handleRegister" class="auth-form register-form">
            <div class="form-group-group">
              <BaseInput 
                label="Nombre completo:" 
                id="register-fullName" 
                type="text" 
                v-model="registerData.fullName" 
                placeholder="Juan Pérez" 
                required 
              />

              <BaseInput 
                label="Contraseña:" 
                id="register-password" 
                type="password" 
                v-model="registerData.password" 
                placeholder="••••••••" 
                required 
                minlength="6"
              />

              <BaseInput 
                label="Correo electrónico:" 
                id="register-email" 
                type="email" 
                v-model="registerData.email" 
                placeholder="tucorreo@gmail.com" 
                required 
              />
            </div>

            <div class="form-group-group">
              <BaseInput 
                label="Número de celular:" 
                id="register-phone" 
                type="tel" 
                v-model="registerData.phone" 
                placeholder="(+591) 70000000" 
                required 
              />

              <BaseInput 
                label="Fecha de nacimiento:" 
                id="register-dob" 
                type="date" 
                v-model="registerData.dob" 
                required 
              />
            </div>

            <PrimaryButton type="submit" name="Registrarse" :disabled="registerLoading" />
          </form>
        </BaseCard>
      </div>
    </div>

    <!-- Indicadores para móvil -->
    <div class="mobile-tabs" :class="{ 'register-active': activePanel === 'register' }">
      <button 
        class="tab-button" 
        :class="{ 'active': activePanel === 'login' }"
        @click="switchToLogin"
      >
        Iniciar Sesión
      </button>
      <button 
        class="tab-button" 
        :class="{ 'active': activePanel === 'register' }"
        @click="switchToRegister"
      >
        Registrarse
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useRouter, useRoute } from 'vue-router'
import { auth } from '@/firebase.js'
import Swal from 'sweetalert2'
import PrimaryButton from './PrimaryButton.vue'
import BaseCard from './BaseCard.vue'
import BaseInput from './BaseInput.vue'

const router = useRouter()
const route = useRoute()

// Estado activo
const activePanel = ref('login')

// Detectar modo inicial desde la URL o query params
onMounted(() => {
  // Si viene desde /register o tiene query ?mode=register
  if (route.query.mode === 'register' || 
      route.path.includes('register') || 
      route.name === 'register') {
    activePanel.value = 'register'
  }
})

// Datos de login
const loginData = ref({
  email: '',
  password: ''
})

// Datos de registro
const registerData = ref({
  fullName: '',
  email: '',
  password: '',
  phone: '',
  dob: ''
})

// Estados de carga
const loginLoading = ref(false)
const registerLoading = ref(false)

// Funciones de navegación
const switchToLogin = () => {
  activePanel.value = 'login'
}

const switchToRegister = () => {
  activePanel.value = 'register'
}

const goBack = () => {
  window.history.back()
}

const goHome = () => {
  router.push('/')
}

// Función de login
const handleLogin = async () => {
  loginLoading.value = true
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth, 
      loginData.value.email, 
      loginData.value.password
    )
    const user = userCredential.user
    console.log("Usuario logueado exitosamente:", user)

    Swal.fire({
      icon: 'success',
      title: '¡Inicio de sesión exitoso!',
      text: 'Bienvenido a tu página principal.',
      timer: 2000,
      showConfirmButton: false
    })

    setTimeout(() => {
      router.push("/vital-recorder")
    }, 2000)

  } catch (error) {
    console.error("Error al iniciar sesión:", error.message)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error al iniciar sesión: ' + error.message,
      timer: 3000,
      showConfirmButton: true
    })
  } finally {
    loginLoading.value = false
  }
}

// Función de registro
const handleRegister = async () => {
  // Validación básica
  if (!registerData.value.fullName.trim() || !registerData.value.email.trim() || !registerData.value.password.trim()) {
    Swal.fire({
      icon: 'warning',
      title: 'Campos requeridos',
      text: 'Por favor, completa todos los campos requeridos.'
    })
    return
  }

  if (registerData.value.password.length < 6) {
    Swal.fire({
      icon: 'warning',
      title: 'Contraseña débil',
      text: 'La contraseña debe tener al menos 6 caracteres.'
    })
    return
  }

  registerLoading.value = true

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      registerData.value.email.trim(), 
      registerData.value.password
    )
    
    const user = userCredential.user
    
    await updateProfile(user, {
      displayName: registerData.value.fullName.trim(),
    })

    console.log("Usuario registrado exitosamente:", user)

    Swal.fire({
      title: '¡Registro exitoso!',
      text: 'Bienvenido a VITALSYSTEMS. Ahora puedes iniciar sesión.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      // Cambiar al panel de login después del registro exitoso
      switchToLogin()
      // Limpiar el formulario de registro
      registerData.value = {
        fullName: '',
        email: '',
        password: '',
        phone: '',
        dob: ''
      }
    })

  } catch (error) {
    console.error("Error al registrarse:", error)
    
    let errorMessage = "Error al registrarse. "
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage += "Este correo electrónico ya está registrado."
        break
      case 'auth/invalid-email':
        errorMessage += "El correo electrónico no es válido."
        break
      case 'auth/operation-not-allowed':
        errorMessage += "El registro con email/contraseña no está habilitado."
        break
      case 'auth/weak-password':
        errorMessage += "La contraseña es muy débil."
        break
      default:
        errorMessage += error.message
    }

    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
  } finally {
    registerLoading.value = false
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding: clamp(1rem, 4vw, 2rem) clamp(0.75rem, 3vw, 1rem);
  background: linear-gradient(170deg, #e0f2f1, #b2dfdb);
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
}

.auth-header {
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 3vw, 1.25rem);
  background-color: white;
  padding: clamp(0.75rem, 3vw, 1rem) clamp(1rem, 4vw, 1.5rem);
  border-radius: 1rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: clamp(1rem, 4vw, 2rem);
  max-width: 100%;
  box-sizing: border-box;
}

.brand-mark {
  height: clamp(40px, 8vw, 60px);
  width: auto;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.brand-mark:hover {
  transform: scale(1.05);
}

.brand-text {
  font-weight: 500;
  letter-spacing: .2px;
  font-size: clamp(18px, 5vw, 28px);
  background: linear-gradient(90deg, #2dd4bf, #60a5fa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  white-space: nowrap;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.brand-text:hover {
  transform: scale(1.02);
}

/* Fallback para navegadores que no soportan background-clip */
@supports not (-webkit-background-clip: text) {
  .brand-text {
    background: none;
    color: #1f2b6c !important;
    -webkit-text-fill-color: initial;
  }
}

.auth-main {
  display: flex;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  justify-content: center;
  align-items: flex-start;
}

.auth-panel {
  flex: 1;
  max-width: 500px;
}

.auth-card {
  position: relative;
  background: #ffffff;
  padding: clamp(2rem, 6vw, 3.5rem) clamp(1rem, 5vw, 2.5rem) clamp(1.5rem, 5vw, 2.5rem);
  border-radius: 1.5rem;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  color: #333;
  box-sizing: border-box;
}

.back-button {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #f1f1f1;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  color: #555;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: background-color 0.3s, color 0.3s;
}

.back-button:hover {
  background: #e0e0e0;
  color: #000;
}

.title {
  text-align: center;
  font-size: clamp(1.5rem, 6vw, 2.2rem);
  font-weight: 700;
  margin-bottom: clamp(0.75rem, 3vw, 1rem);
  color: #1f2b6c;
  line-height: 1.2;
}

.subtitle {
  text-align: center;
  margin-bottom: clamp(1.5rem, 4vw, 2rem);
  font-size: clamp(0.9rem, 3vw, 1rem);
  line-height: 1.4;
}

.subtitle a {
  color: var(--blue-primary);
  font-weight: 600;
  text-decoration: none;
}

.subtitle a:hover {
  text-decoration: underline;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 4vw, 1.5rem);
  width: 100%;
}

.register-form .form-group-group {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1rem, 3vw, 1.5rem);
  width: 100%;
}

.forgot-password {
  display: block;
  text-align: right;
  margin-top: clamp(-0.75rem, -2vw, -1rem);
  margin-bottom: clamp(0.75rem, 3vw, 1rem);
  font-size: clamp(0.8rem, 2.5vw, 0.9rem);
  color: var(--blue-secondary);
  text-decoration: none;
}

.mobile-tabs {
  display: none;
  position: relative;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 4px;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.mobile-tabs::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  background: linear-gradient(135deg, #2dd4bf, #60a5fa);
  border-radius: 12px;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(45, 212, 191, 0.3);
  z-index: 1;
}

.mobile-tabs.register-active::before {
  transform: translateX(calc(100% + 4px));
  box-shadow: 0 4px 12px rgba(96, 165, 250, 0.3);
}

.tab-button {
  position: relative;
  flex: 1;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 12px;
  background: transparent;
  color: #64748b;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  z-index: 2;
  white-space: nowrap;
}

.tab-button:hover {
  color: #475569;
  transform: translateY(-1px);
}

.tab-button.active {
  color: white;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
}

.tab-button.active:hover {
  color: white;
  transform: translateY(0);
}

/* Desktop view - lado a lado */
@media (min-width: 1024px) {
  .auth-main {
    gap: 3rem;
  }
  
  .auth-panel {
    max-width: 450px;
  }

  .register-form .form-group-group {
    grid-template-columns: 1fr 1fr;
    gap: clamp(1rem, 3vw, 2rem);
  }
  
  .register-form .form-group-group:first-child .form-group:first-child {
    grid-column: 1 / -1; /* Nombre completo ocupa todo el ancho */
  }
}

/* Tablet view */
@media (max-width: 1023px) and (min-width: 768px) {
  .auth-main {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  
  .auth-panel:not(.active) {
    display: none;
  }
  
  .mobile-tabs {
    display: flex;
    order: -1;
  }

  .register-form .form-group-group {
    grid-template-columns: 1fr 1fr;
    gap: clamp(1rem, 3vw, 1.5rem);
  }
  
  .register-form .form-group-group:first-child .form-group:first-child {
    grid-column: 1 / -1;
  }
}

/* Mobile view */
@media (max-width: 767px) {
  .auth-main {
    flex-direction: column;
    align-items: center;
  }
  
  .auth-panel:not(.active) {
    display: none;
  }
  
  .mobile-tabs {
    display: flex;
    order: -1;
  }
  
  .auth-header {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem;
  }

  .brand-text {
    font-size: 1.5rem;
  }
  
  .auth-card {
    margin: 0;
    border-radius: 1rem;
  }
}

@media (max-width: 480px) {
  .tab-button {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
