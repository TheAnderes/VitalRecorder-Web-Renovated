<template>
  <div class="reset-container">
    <div class="reset-main">
      <BaseCard class="reset-card">
        <button class="back-button" aria-label="Volver" @click="goBack">
          &#x2190;
        </button>

        <div class="reset-header">
          <h1 class="reset-title">Recuperar Contraseña</h1>
          <p class="reset-subtitle">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </p>
        </div>

        <form @submit.prevent="handlePasswordReset" class="reset-form">
          <BaseInput
            label="Correo electrónico:"
            id="reset-email"
            type="email"
            v-model="resetEmail"
            placeholder="tucorreo@gmail.com"
            required
          />

          <PrimaryButton 
            type="submit" 
            name="Enviar enlace de recuperación" 
            :disabled="loading || !resetEmail.trim()" 
          />
        </form>

        <div class="reset-footer">
          <p>
            ¿Recordaste tu contraseña? 
            <router-link to="/login" class="login-link">Volver al inicio de sesión</router-link>
          </p>
        </div>
      </BaseCard>

      <!-- Sección informativa -->
      <div class="info-section">
        <h2 class="info-title">VitalSystems</h2>
        <div class="info-description-box">
          <p class="info-description">
            No te preocupes, es normal olvidar las contraseñas. Te ayudaremos a recuperar el acceso a tu cuenta de manera segura.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import PrimaryButton from '../components/PrimaryButton.vue'
import BaseCard from '../components/BaseCard.vue'
import BaseInput from '../components/BaseInput.vue'

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
  background: rgba(224, 242, 241, 0.75);
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

.reset-card {
  position: relative;
  background: rgba(255, 255, 255, 0.98);
  padding: clamp(2rem, 5vw, 3rem) clamp(1.5rem, 5vw, 2.5rem);
  border-radius: 1.5rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  color: #333;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.back-button {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  background: #f1f1f1;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  font-size: 1.6rem;
  color: #555;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: #e0e0e0;
  color: #000;
  transform: translateY(-2px);
}

.reset-header {
  text-align: center;
  margin-bottom: 2rem;
}

.reset-title {
  font-size: clamp(1.6rem, 5vw, 2.2rem);
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1f2b6c;
  line-height: 1.2;
}

.reset-subtitle {
  font-size: clamp(0.9rem, 3vw, 1.1rem);
  color: #666;
  line-height: 1.5;
  margin: 0;
}

.reset-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
}

.reset-footer {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.reset-footer p {
  margin: 0;
  font-size: 0.95rem;
  color: #666;
}

.login-link {
  color: var(--blue-primary, #1f2b6c);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
}

.login-link:hover {
  text-decoration: underline;
  color: #2dd4bf;
}

/* Sección informativa */
.info-section {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  max-width: 350px;
  height: 100%;
  min-height: 500px;
  position: relative;
  z-index: 2;
  padding: 0.5rem 1rem 2rem 1rem;
  gap: 1.5rem;
}

.info-title {
  font-size: 4.2rem;
  font-weight: 900;
  color: #0f2147;
  text-align: center;
  margin: 0;
  line-height: 1.1;
  text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3), 
               0 2px 4px rgba(15, 33, 71, 0.2),
               0 0 15px rgba(255, 255, 255, 0.8);
  letter-spacing: -0.5px;
}

.info-description-box {
  background: rgba(255, 255, 255, 0.98);
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.18), 
              0 4px 15px rgba(31, 43, 108, 0.1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  width: 100%;
  max-width: 380px;
  position: relative;
  transform: translateY(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-description-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.22),
              0 6px 20px rgba(31, 43, 108, 0.15);
}

.info-description {
  font-size: 1.15rem;
  color: #374151;
  line-height: 1.75;
  margin: 0;
  text-align: center;
  font-weight: 500;
  letter-spacing: 0.2px;
}

/* Desktop view */
@media (min-width: 1024px) {
  .info-section {
    display: flex;
  }
  
  .reset-main {
    justify-content: space-between;
  }
}

/* Tablet y móvil */
@media (max-width: 1023px) {
  .reset-main {
    flex-direction: column;
    align-items: center;
  }
  
  .reset-card {
    max-width: 90%;
  }
}

@media (max-width: 767px) {
  .reset-card {
    margin: 1rem;
    border-radius: 1.25rem;
  }
  
  .back-button {
    top: 1rem;
    left: 1rem;
    width: 40px;
    height: 40px;
    font-size: 1.4rem;
  }
}
</style>
