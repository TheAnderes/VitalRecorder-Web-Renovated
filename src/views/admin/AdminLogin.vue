<template>
  <div class="admin-login-container">
    <div class="admin-login-card">
      <div class="login-header">
        <div class="logo-section">
          <div class="logo-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" fill="#2563eb"/>
              <path d="M8 12l2 2 4-4" stroke="white" stroke-width="2" fill="none"/>
            </svg>
          </div>
          <h1>VitalAdmin</h1>
        </div>
        <p class="login-subtitle">Panel de Administración</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <div class="input-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="input-icon">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2" fill="none"/>
              <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2"/>
            </svg>
            <input 
              type="email" 
              id="email" 
              v-model="email"
              required
              placeholder="admin@vitalsystems.com"
              :disabled="loading"
            >
          </div>
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <div class="input-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="input-icon">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/>
              <circle cx="12" cy="16" r="1" fill="currentColor"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
            <input 
              type="password" 
              id="password" 
              v-model="password"
              required
              placeholder="••••••••"
              :disabled="loading"
            >
          </div>
        </div>

        <div class="form-options">
          <label class="checkbox-wrapper">
            <input type="checkbox" v-model="rememberMe">
            <span class="checkmark"></span>
            Recordarme
          </label>
        </div>

        <button type="submit" class="login-btn" :disabled="loading">
          <span v-if="loading" class="loading-spinner"></span>
          <span v-else>Iniciar Sesión</span>
        </button>

        <div v-if="error" class="error-message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
          </svg>
          {{ error }}
        </div>
      </form>

      <div class="login-footer">
        <p>¿No tienes permisos de administrador?</p>
        <router-link to="/auth" class="user-login-link">Ir al Login de Usuario</router-link>
      </div>
    </div>

    <!-- Background decoration -->
    <div class="bg-decoration">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { useAdmin } from '@/composables/useAdmin'

const router = useRouter()
const { checkAdminPermissions } = useAdmin()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  if (loading.value) return
  
  try {
    loading.value = true
    error.value = ''
    
    // Autenticar con Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    
    // Verificar si tiene permisos de administrador
    const hasAdminPermissions = await checkAdminPermissions()
    
    if (hasAdminPermissions) {
      // Redirigir al dashboard de admin
      router.push('/admin/dashboard')
    } else {
      // No tiene permisos, cerrar sesión y mostrar error
      await auth.signOut()
      error.value = 'No tienes permisos de administrador. Contacta al super administrador.'
    }
  } catch (err) {
    console.error('Error de login:', err)
    
    switch (err.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        error.value = 'Credenciales incorrectas'
        break
      case 'auth/too-many-requests':
        error.value = 'Demasiados intentos fallidos. Intenta más tarde'
        break
      case 'auth/user-disabled':
        error.value = 'Esta cuenta ha sido desactivada'
        break
      default:
        error.value = 'Error de inicio de sesión. Intenta nuevamente'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.admin-login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.admin-login-card {
  background: white;
  border-radius: 1rem;
  padding: 3rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 400px;
  position: relative;
  z-index: 10;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.logo-section h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
}

.login-subtitle {
  margin: 0;
  color: #64748b;
  font-size: 1.125rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.input-wrapper input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.input-wrapper input:disabled {
  background-color: #f9fafb;
  color: #6b7280;
  cursor: not-allowed;
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.875rem;
  color: #6b7280;
}

.checkbox-wrapper input {
  margin-right: 0.5rem;
}

.login-btn {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  border: none;
  padding: 0.875rem 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 48px;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(37, 99, 235, 0.4);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #dc2626;
  background: #fef2f2;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #fecaca;
  font-size: 0.875rem;
}

.login-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.login-footer p {
  margin: 0 0 0.5rem 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.user-login-link {
  color: #2563eb;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
}

.user-login-link:hover {
  text-decoration: underline;
}

.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.floating-shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 100px;
  height: 100px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 80px;
  height: 80px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 60px;
  height: 60px;
  bottom: 20%;
  left: 80%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px); 
  }
  50% { 
    transform: translateY(-20px); 
  }
}

@media (max-width: 480px) {
  .admin-login-card {
    padding: 2rem;
    margin: 1rem;
  }
  
  .logo-section h1 {
    font-size: 1.75rem;
  }
}
</style>
