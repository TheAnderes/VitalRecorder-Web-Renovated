<template>
  <div class="login-container">
    <header class="login-header">
      <img 
        class="brand-mark" 
        src="/Logo.png" 
        alt="VITALSYSTEMS Logo Icon" 
        onerror="this.style.display='none'"
        @click="goHome"
      />
      <div class="brand-text" @click="goHome">VITALSYSTEMS</div>
    </header>

    <BaseCard class="login-card">
      <button class="back-button" aria-label="Volver" @click="goBack">
        &#x2190;
      </button>

      <h1 class="title">Iniciar Sesión</h1>
      <p class="subtitle">¿Es tu primera vez? <a href="/register">Regístrate aquí</a></p>

      <form @submit.prevent="handleLogin" class="login-form">
        <BaseInput
          label="Correo electrónico:"
          id="email"
          type="email"
          v-model="email"
          placeholder="tucorreo@gmail.com"
          required
        />

        <BaseInput
          label="Contraseña:"
          id="password"
          type="password"
          v-model="password"
          placeholder="Contraseña"
          required
        />

        <a href="/recuperar-contrasena" class="forgot-password">¿Olvidaste tu contraseña?</a>

        <PrimaryButton type="submit" name="Iniciar Sesión" />
      </form>
    </BaseCard>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase"; // Importa la configuración de Firebase
import { useRouter } from "vue-router"; // Importa Vue Router
import { useAdmin } from '@/composables/useAdmin'
import Swal from 'sweetalert2'; // Importar SweetAlert2
import PrimaryButton from './shared/PrimaryButton.vue';
import BaseCard from './shared/BaseCard.vue'
import BaseInput from './shared/BaseInput.vue'

const email = ref("");
const password = ref("");
const router = useRouter(); // Usa Vue Router

const handleLogin = async () => {
  try {
    // Intentamos iniciar sesión con el email y la contraseña proporcionada
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;
    console.log("Usuario logueado exitosamente:", user);

    // Verificar rol del usuario para redirigir correctamente
    const { getUserRole } = useAdmin()
    const userRole = await getUserRole(user.uid)
    
    let redirectPath = '/dashboard' // Por defecto usuario normal
    let welcomeText = 'Bienvenido a tu dashboard de usuario.'
    
    if (userRole === 'admin' || userRole === 'super_admin') {
      redirectPath = '/admin/dashboard'
      welcomeText = 'Bienvenido al panel de administración.'
    }

    // Alerta de éxito con SweetAlert2
    Swal.fire({
      icon: 'success',
      title: '¡Inicio de sesión exitoso!',
      text: welcomeText,
      timer: 2000, // La alerta se cierra automáticamente después de 2 segundos
      showConfirmButton: false
    });

    // Redirige al usuario según su rol
    setTimeout(() => {
      router.push(redirectPath);
    }, 2000);

  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);

    // Alerta de error
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error al iniciar sesión: ' + error.message,
      timer: 3000,
      showConfirmButton: true
    });
  }
};

// Función para volver a la página anterior
const goBack = () => {
  window.history.back();
};

// Función para ir al inicio
const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: clamp(1rem, 4vw, 2rem) clamp(0.75rem, 3vw, 1rem);
  background: linear-gradient(170deg, #e0f2f1, #b2dfdb);
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
}

.login-header {
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

.login-card {
  position: relative;
  background: #ffffff;
  padding: clamp(2rem, 6vw, 3.5rem) clamp(1rem, 5vw, 2.5rem) clamp(1.5rem, 5vw, 2.5rem);
  border-radius: 1.5rem;
  width: 100%;
  max-width: 450px;
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

.login-form {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 4vw, 1.5rem);
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

@media (max-width: 480px) {
    .login-header {
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.75rem;
    }

    .brand-text {
        font-size: 1.5rem;
    }

    .login-card {
        padding: 3rem 1.5rem 2rem;
    }

    .title {
        font-size: 1.8rem;
    }
}
</style>
