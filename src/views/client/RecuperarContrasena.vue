<template>
  <div class="reset-container">
    <div class="reset-main">
        <div class="auth-card">
          <button class="back-button" aria-label="Volver" @click="goBack">&#x2190;</button>

          <div class="card-left">
            <div class="left-inner">
              <div class="logo-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" fill="#60a5fa"/>
                  <path d="M8 12l2 2 4-4" stroke="white" stroke-width="2" fill="none"/>
                </svg>
              </div>
              <h2 class="welcome-title">BIENVENIDO</h2>
              <h3 class="welcome-sub">Recupera tu cuenta</h3>
              <p class="welcome-text">Ingresa tu correo y te enviaremos un enlace seguro para restablecer tu contraseña.</p>
            </div>
          </div>

          <div class="card-right">
            <div class="right-inner">
              <h1 class="reset-title">Recuperar Contraseña</h1>
              <p class="reset-subtitle">Introduce el correo asociado a tu cuenta y te mandaremos el enlace.</p>

              <form @submit.prevent="handlePasswordReset" class="reset-form">
                <BaseInput
                  id="reset-email"
                  type="email"
                  v-model="resetEmail"
                  placeholder="correo@ejemplo.com"
                  required
                />

                <PrimaryButton 
                  type="submit" 
                  name="Enviar enlace" 
                  :disabled="loading || !resetEmail.trim()" 
                />
              </form>

              <div class="reset-footer">
                <p>¿Recordaste tu contraseña? <router-link to="/login" class="login-link">Volver al inicio de sesión</router-link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import PrimaryButton from '@/components/shared/PrimaryButton.vue'
import BaseCard from '@/components/shared/BaseCard.vue'
import BaseInput from '@/components/shared/BaseInput.vue'

const router = useRouter()

// Estado reactivo
const resetEmail = ref('')
const loading = ref(false)

// Función para ir atrás
const goBack = () => {
  router.push('/login')
}

// Función para manejar el reset de contraseña (por ahora solo frontend)
const handlePasswordReset = async () => {
  loading.value = true
  
  try {
    // Simulamos una petición con un delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mostrar mensaje de éxito
    Swal.fire({
      icon: 'success',
      title: '¡Enlace enviado!',
      text: `Se ha enviado un enlace de recuperación a ${resetEmail.value}. Revisa tu bandeja de entrada y spam.`,
      confirmButtonText: 'Entendido'
    }).then(() => {
      // Limpiar el formulario y redirigir al login
      resetEmail.value = ''
      router.push('/login')
    })
  } catch (error) {
    // Mostrar error
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al enviar el enlace de recuperación. Inténtalo de nuevo.',
      confirmButtonText: 'Reintentar'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.reset-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: clamp(0.5rem, 2vw, 1rem);
  background-image: url('@/components/icons/ImageProductVitarRecorner.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
}

.reset-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(8, 14, 25, 0.45);
  backdrop-filter: blur(1px);
  z-index: 1;
}

.reset-main {
  display: flex;
  gap: 3rem;
  width: 100%;
  max-width: 1200px;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
}

.auth-card {
  width: 100%;
  max-width: 1000px;
  display: flex;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(2,6,23,0.25);
  background: #fff;
  position: relative;
}

.card-left {
  width: 48%;
  background: linear-gradient(180deg,#0f2447 0%, #06132a 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2.5rem;
}

.left-inner {
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.logo-placeholder { margin-bottom: 1.25rem }
.welcome-title { font-size: 1.05rem; letter-spacing: .06em; opacity: .9; margin: 0 }
.welcome-sub { font-size: 1.6rem; font-weight: 800; margin: .25rem 0 1rem }
.welcome-text { color: rgba(255,255,255,0.85); line-height: 1.5 }

.card-right { width: 52%; padding: 3rem 2.5rem; display:flex; align-items:center }
.right-inner { width:100%; max-width:420px; margin:0 auto }
.reset-title {
  font-size: 1.6rem;
  font-weight: 800;
  margin: 0 0 0.5rem 0;
  color: #0f172a;
}

.reset-subtitle {
  margin: 0 0 1.4rem 0;
  color: #475569;
}

.back-button {
  position: absolute;
  top: 18px;
  left: 18px;
  background: rgba(255,255,255,0.12);
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 1.35rem;
  color: #fff;
  cursor: pointer;
  display: grid;
  place-items: center;
  z-index: 5;
}

.back-button:hover { transform: translateY(-2px) }

.reset-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 1.6rem;
}

.reset-footer { text-align:left }
.reset-footer p { margin:0; color:#475569 }

.login-link { color: var(--blue-primary, #1f2b6c); font-weight:600 }

.welcome-text { margin-top:.6rem }

/* Desktop view */
@media (min-width: 1024px) {
  .reset-main { justify-content: space-between }
}

/* Tablet y móvil */
@media (max-width: 1023px) {
  .reset-main { flex-direction: column; align-items: center }
  .auth-card { flex-direction: column; border-radius: 16px }
  .card-left, .card-right { width: 100%; padding: 2rem }
  .back-button { top: 12px; left: 12px }
}

@media (max-width: 767px) {
  .left-inner { text-align: center }
  .right-inner { padding-top: 0 }
}
</style>
