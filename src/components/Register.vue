<template>
  <div class="register-container">
    <header class="register-header">
      <img
        class="brand-mark"
        src="/Logo.png"
        alt="VITALSYSTEMS Logo Icon"
        onerror="this.style.display='none'"
      />
      <div class="brand-text">VITALSYSTEMS</div>
    </header>

    <main class="register-card">
      <button class="back-button" aria-label="Volver" @click="goBack">
        &#x2190;
      </button>

      <h1 class="title">Registrarse</h1>
      <p class="subtitle">
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
      </p>

      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group-group">
          <div class="form-group">
            <label for="fullName">Nombre completo: <span class="required">*</span></label>
            <input 
              id="fullName" 
              v-model="fullName" 
              type="text" 
              placeholder="Juan Pérez" 
              required 
            />
          </div>

          <div class="form-group">
            <label for="password">Contraseña: <span class="required">*</span></label>
            <input 
              id="password" 
              v-model="password" 
              type="password" 
              placeholder="••••••••" 
              required 
              minlength="6"
            />
          </div>

          <div class="form-group">
            <label for="email">Correo electrónico: <span class="required">*</span></label>
            <input 
              id="email" 
              v-model="email" 
              type="email" 
              placeholder="tucorreo@gmail.com" 
              required 
            />
          </div>
        </div>

        <div class="form-group-group">
          <div class="form-group">
            <label for="phone">Número de celular: <span class="required">*</span></label>
            <input 
              id="phone" 
              v-model="phone" 
              type="tel" 
              placeholder="(+591) 70000000" 
              required 
            />
          </div>

          <div class="form-group">
            <label for="dob">Fecha de nacimiento: <span class="required">*</span></label>
            <input 
              id="dob" 
              v-model="dob" 
              type="date" 
              required 
            />
          </div>
        </div>

        <button type="submit" class="submit-button" :disabled="isLoading">
          {{ isLoading ? 'Registrando...' : 'Registrarse' }}
        </button>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { auth } from '@/firebase.js'; // Importamos la instancia de auth ya inicializada

// Variables reactivas
const fullName = ref('');
const password = ref('');
const email = ref('');
const phone = ref('');
const dob = ref('');
const isLoading = ref(false);

const router = useRouter();

// Función para manejar el registro de usuario
const handleRegister = async () => {
  // Validación básica
  if (!fullName.value.trim() || !email.value.trim() || !password.value.trim()) {
    alert('Por favor, completa todos los campos requeridos.');
    return;
  }

  if (password.value.length < 6) {
    alert('La contraseña debe tener al menos 6 caracteres.');
    return;
  }

  isLoading.value = true;

  try {
    // Crear usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      email.value.trim(), 
      password.value
    );
    
    const user = userCredential.user;
    
    // Actualizar el perfil del usuario con información adicional
    await updateProfile(user, {
      displayName: fullName.value.trim(),
    });

    console.log("Usuario registrado exitosamente:", user);

    // Aquí podrías guardar información adicional en Firestore si lo necesitas
    // como el teléfono y fecha de nacimiento

    alert("¡Registro exitoso! Bienvenido a VITALSYSTEMS.");
    
    // Redirigir al login o dashboard
    router.push("/login");

  } catch (error) {
    console.error("Error al registrarse:", error);
    
    // Manejo de errores más específico
    let errorMessage = "Error al registrarse. ";
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage += "Este correo electrónico ya está registrado.";
        break;
      case 'auth/invalid-email':
        errorMessage += "El correo electrónico no es válido.";
        break;
      case 'auth/operation-not-allowed':
        errorMessage += "El registro con email/contraseña no está habilitado.";
        break;
      case 'auth/weak-password':
        errorMessage += "La contraseña es muy débil.";
        break;
      default:
        errorMessage += error.message;
    }
    
    alert(errorMessage);
  } finally {
    isLoading.value = false;
  }
};

// Función para volver a la página anterior
const goBack = () => {
  router.go(-1); // Mejor práctica que window.history.back()
};
</script>

<style scoped>
/* General styles for the container and header */
.register-container {
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

.register-header {
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: white;
  padding: 10px 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.5rem;
}

.brand-mark {
  height: 70px;
  width: auto;
}

.brand-text {
  font-weight: 600;
  letter-spacing: 1px;
  font-size: clamp(24px, 2.8vw, 34px);
  background: linear-gradient(90deg, #37c8ee, #8e7ff2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0px 1px 1px rgba(255, 255, 255, 0.5);
}

/* Card Styles */
.register-card {
  position: relative;
  background: linear-gradient(180deg, #A7C7E7, #7FA5C1);
  padding: 80px 40px 40px;
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
  width: 35px;
  height: 35px;
  font-size: 1.5rem;
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
  font-size: 2.4rem;
  font-weight: bold;
  margin: 10px 0;
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

/* Form Group (Columns) */
.form-group-group {
  display: flex;
  gap: 30px;
  justify-content: space-between;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 1rem;
  color: #fff;
}

.form-group .required {
  color: #ffdddd;
}

.form-group input {
  width: 100%;
  padding: 15px 20px;
  border: none;
  border-radius: 15px;
  background: #fff;
  box-sizing: border-box;
  font-size: 1.1rem;
}

.submit-button {
  width: 100%;
  padding: 18px;
  margin-top: 15px;
  background: #0d2a4c;
  color: #fff;
  border: none;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover:not(:disabled) {
  background: #1a4a8a;
}

.submit-button:disabled {
  background: #6c7b87;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .form-group-group {
    flex-direction: column;
    gap: 0;
  }
  
  .register-card {
    padding: 60px 25px 25px;
  }
}
</style>