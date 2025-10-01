<template>
  <div class="dashboard-container">
    <div class="dashboard-main">
      <!-- Sección de bienvenida -->
      <div class="welcome-section">
        <div class="user-avatar">
          <div class="avatar-circle">
            <span class="avatar-initial">{{ getUserInitial }}</span>
          </div>
        </div>
        <h1 class="welcome-title">¡Bienvenido a VitalSystems!</h1>
        <p class="welcome-subtitle">Tu plataforma de monitoreo de salud inteligente</p>
      </div>

      <!-- Información del usuario -->
      <div class="user-info-section">
        <BaseCard class="user-info-card">
          <h2 class="section-title">Información del Usuario</h2>
          
          <div class="user-details">
            <div class="detail-item">
              <div class="detail-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#1f2b6c"/>
                  <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#1f2b6c"/>
                </svg>
              </div>
              <div class="detail-content">
                <span class="detail-label">Nombre Completo</span>
                <span class="detail-value">{{ userName || 'No disponible' }}</span>
              </div>
            </div>

            <div class="detail-item">
              <div class="detail-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#1f2b6c" stroke-width="2" fill="none"/>
                  <path d="M22 6L12 13L2 6" stroke="#1f2b6c" stroke-width="2" fill="none"/>
                </svg>
              </div>
              <div class="detail-content">
                <span class="detail-label">Correo Electrónico</span>
                <span class="detail-value">{{ userEmail || 'No disponible' }}</span>
              </div>
            </div>

            <div class="detail-item">
              <div class="detail-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92V21C22 21.5304 21.7893 22.0391 21.4142 22.4142C21.0391 22.7893 20.5304 23 20 23C15.4 22.97 11.01 21.24 7.39 18.41C4.08 15.81 1.72 12.98 0.280024 9.59C0.030024 8.87 0.0100238 8.1 0.170024 7.37C0.330024 6.64 0.670024 5.97 1.16002 5.41L4.79002 1.78C5.34002 1.23 6.12002 0.97 6.89002 1.07C7.66002 1.17 8.35002 1.62 8.74002 2.29L11.28 7.09C11.54 7.58 11.61 8.15 11.47 8.69C11.33 9.23 10.99 9.7 10.52 10.02L8.93002 11.17C10.08 13.1 11.9 14.92 13.83 16.07L14.98 14.48C15.3 14.01 15.77 13.67 16.31 13.53C16.85 13.39 17.42 13.46 17.91 13.72L22.71 16.26C23.38 16.65 23.83 17.34 23.93 18.11C24.03 18.88 23.77 19.66 23.22 20.21L22 16.92Z" fill="#1f2b6c"/>
                </svg>
              </div>
              <div class="detail-content">
                <span class="detail-label">Estado de la Cuenta</span>
                <span class="detail-value verified">
                  <span class="status-indicator"></span>
                  Cuenta Verificada
                </span>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <!-- Sección de descarga de app -->
      <div class="app-download-section">
        <BaseCard class="download-card">
          <div class="download-content">
            <div class="download-info">
              <h2 class="download-title">Descarga VitalRecorder</h2>
              <p class="download-description">
                Lleva el monitoreo de tu salud a cualquier lugar con nuestra aplicación móvil. 
                Registra tus signos vitales, recibe alertas y mantén un seguimiento completo de tu bienestar.
              </p>
              <ul class="app-features">
                <li>📱 Interfaz intuitiva y fácil de usar</li>
                <li>📊 Seguimiento en tiempo real</li>
                <li>🔔 Alertas personalizables</li>
                <li>☁️ Sincronización en la nube</li>
              </ul>
            </div>
            
            <div class="download-action">
              <img 
                src="@/components/icons/IconApp.svg" 
                alt="VitalRecorder App - Descargar en Google Play" 
                class="app-logo-clickable"
                @click="downloadApp" 
                title="Haz clic para descargar en Google Play"
              >
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '@/firebase.js'
import { onAuthStateChanged } from 'firebase/auth'
import BaseCard from '@/components/shared/BaseCard.vue'
import Swal from 'sweetalert2'

const router = useRouter()

// Estado reactivo
const user = ref(null)
const loading = ref(true)

// Computed properties
const userName = computed(() => {
  return user.value?.displayName || user.value?.email?.split('@')[0] || 'Usuario'
})

const userEmail = computed(() => {
  return user.value?.email || 'No disponible'
})

const getUserInitial = computed(() => {
  if (user.value?.displayName) {
    return user.value.displayName.charAt(0).toUpperCase()
  } else if (user.value?.email) {
    return user.value.email.charAt(0).toUpperCase()
  }
  return 'U'
})

// Funciones
const downloadApp = () => {
  // Redireccionar al archivo APK en Google Drive
  window.open('https://drive.google.com/file/d/1X1kfyRmOlHzWPFpjSQW-10kk2j1tcBnl/view', '_blank')
}

// Lifecycle
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      user.value = currentUser
      loading.value = false
    } else {
      // Si no hay usuario, redirigir al login
      router.push('/auth')
    }
  })
})
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%);
  padding: 2rem 1rem;
  font-family: 'Poppins', sans-serif;
}

.dashboard-main {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Sección de bienvenida */
.welcome-section {
  text-align: center;
  padding: 2rem 0;
}

.user-avatar {
  margin-bottom: 1.5rem;
}

.avatar-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2dd4bf, #60a5fa);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 8px 25px rgba(45, 212, 191, 0.3);
}

.avatar-initial {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.welcome-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #1f2b6c;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(31, 43, 108, 0.1);
}

.welcome-subtitle {
  font-size: 1.2rem;
  color: #64748b;
  font-weight: 500;
}

/* Sección de información del usuario */
.user-info-section {
  width: 100%;
}

.user-info-card {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2b6c;
  margin-bottom: 1.5rem;
  text-align: center;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(240, 253, 250, 0.6);
  border-radius: 12px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.detail-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(45, 212, 191, 0.15);
}

.detail-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(31, 43, 108, 0.1);
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.detail-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2b6c;
}

.detail-value.verified {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #059669;
}

.status-indicator {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

/* Sección de descarga */
.app-download-section {
  width: 100%;
}

.download-card {
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.download-content {
  display: grid;
  gap: 2rem;
  align-items: center;
}

.download-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1f2b6c;
  margin-bottom: 1rem;
}

.download-description {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.app-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.app-features li {
  font-size: 0.95rem;
  color: #374151;
  font-weight: 500;
}

.download-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.app-logo-clickable {
  width: 200px;
  height: 200px;
  object-fit: contain;
  cursor: pointer;
  transition: all 0.3s ease;
  filter: drop-shadow(0 4px 15px rgba(45, 212, 191, 0.2));
  border-radius: 20px;
}

.app-logo-clickable:hover {
  transform: translateY(-6px) scale(1.08);
  filter: drop-shadow(0 8px 25px rgba(45, 212, 191, 0.5));
}

.app-logo-clickable:active {
  transform: translateY(-3px) scale(1.04);
  filter: drop-shadow(0 6px 20px rgba(45, 212, 191, 0.4));
}

/* Animaciones */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Responsive */
@media (max-width: 768px) {
  .app-logo-clickable {
    width: 150px;
    height: 150px;
  }
}

@media (max-width: 480px) {
  .app-logo-clickable {
    width: 120px;
    height: 120px;
  }
}

@media (min-width: 768px) {
  .download-content {
    grid-template-columns: 1fr auto;
  }
  
  .download-action {
    flex-direction: row;
  }
  
  .user-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .dashboard-main {
    gap: 3rem;
  }
  
  .user-info-card,
  .download-card {
    padding: 3rem;
  }
  
  .app-logo-clickable {
    width: 250px;
    height: 250px;
  }
}

/* Estilos para SweetAlert2 (reutilizados) */
:deep(.vital-systems-popup) {
  border-radius: 1.5rem !important;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2), 
              0 8px 25px rgba(45, 212, 191, 0.15) !important;
  border: 1px solid rgba(45, 212, 191, 0.2) !important;
  backdrop-filter: blur(15px) !important;
  font-family: 'Poppins', sans-serif !important;
}

:deep(.vital-systems-title) {
  color: #1f2b6c !important;
  font-size: 1.8rem !important;
  font-weight: 700 !important;
  font-family: 'Poppins', sans-serif !important;
}

:deep(.vital-systems-content) {
  color: #374151 !important;
  font-size: 1.1rem !important;
  font-family: 'Poppins', sans-serif !important;
}

:deep(.vital-systems-button) {
  background: linear-gradient(135deg, #2dd4bf, #60a5fa) !important;
  border: none !important;
  border-radius: 12px !important;
  padding: 0.875rem 2rem !important;
  font-family: 'Poppins', sans-serif !important;
}
</style>
