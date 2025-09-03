<template>
  <div class="login-container">
    <header class="login-header">
      <img class="brand-mark" src="/Logo.png" alt="VITALSYSTEMS Logo Icon" onerror="this.style.display='none'" />
      <div class="brand-text">VITALSYSTEMS</div>
    </header>

    <main class="login-card">
      <button class="back-button" aria-label="Volver" @click="goBack">
        &#x2190;
      </button>

      <h1 class="title">Iniciar Sesión</h1>
      <p class="subtitle">¿Es tu primera vez? <a href="/register">Regístrate aquí</a></p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Correo electrónico: <span class="required">*</span></label>
          <input type="email" id="email" v-model="email" placeholder="tucorreo@gmail.com" required />
        </div>

        <div class="form-group">
          <label for="password">Contraseña: <span class="required">*</span></label>
          <input type="password" id="password" v-model="password" placeholder="Contraseña" required />
        </div>

        <a href="/recuperar-contrasena" class="forgot-password">¿Olvidaste tu contraseña?</a>

        <button type="submit" class="submit-button">Iniciar Sesión</button>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Importa la configuración de Firebase
import { useRouter } from "vue-router"; // Importa Vue Router
import Swal from 'sweetalert2'; // Importar SweetAlert2

const email = ref("");
const password = ref("");
const router = useRouter(); // Usa Vue Router

const handleLogin = async () => {
  try {
    // Intentamos iniciar sesión con el email y la contraseña proporcionada
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;
    console.log("Usuario logueado exitosamente:", user);

    // Alerta de éxito con SweetAlert2
    Swal.fire({
      icon: 'success',
      title: '¡Inicio de sesión exitoso!',
      text: 'Bienvenido a tu página principal.',
      timer: 2000, // La alerta se cierra automáticamente después de 2 segundos
      showConfirmButton: false
    });

    // Redirige al usuario a la vista "VitalRecorder"
    setTimeout(() => {
      router.push("/vital-recorder"); // Redirige a la página de Vital Recorder
    }, 2000); // Espera para que la alerta se vea antes de la redirección

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
</script>

<style scoped>
/* Estilos existentes */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: Arial, sans-serif;
  padding: 10vh 20px 20px 20px;
  min-height: 100vh;
  background-color: white;
  box-sizing: border-box;
}

.login-header {
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: white;
  padding: 20px 30px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.brand-mark {
  height: 70px;
  width: auto;
}

.brand-text {
  font-weight: 600;
  letter-spacing: 1px;
  font-size: clamp(28px, 3vw, 36px);
  background: linear-gradient(90deg, #37c8ee, #8e7ff2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0px 1px 1px rgba(255, 255, 255, 0.5);
}

/* Card Styles */
.login-card {
  position: relative;
  background: linear-gradient(180deg, #A7C7E7, #7FA5C1);
  padding: 60px 40px 40px;
  border-radius: 25px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
  color: #0d2a4c;
}

.back-button {
  position: absolute;
  top: 15px;
  left: 15px;
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.7rem;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 20px;
  color: #011a3e;
}

.subtitle {
  text-align: center;
  margin-bottom: 30px;
  font-size: 1rem;
}

.subtitle a {
  color: #011a3e;
  font-weight: bold;
  text-decoration: underline;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 1rem;
  color: #fff;
}

.form-group input {
  width: 100%;
  padding: 15px 18px;
  border: none;
  border-radius: 20px;
  background-color: white;
  box-sizing: border-box;
  font-size: 1.1rem;
}

.forgot-password {
  display: block;
  text-align: left;
  margin-top: -12px;
  margin-bottom: 30px;
  font-size: 0.9rem;
  color: #fff;
  text-decoration: underline;
}

.submit-button {
  width: 100%;
  padding: 18px;
  background-color: #0d2a4c;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #1a4a8a;
}
</style>
