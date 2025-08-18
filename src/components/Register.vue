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
      <button class="back-button" aria-label="Volver">
        &#x2190; <!-- Carácter de flecha izquierda -->
      </button>
      
      <h1 class="title">Registrarse</h1>
      <p class="subtitle">
        ¿Ya tiene una cuenta? <a href="/login">Inicia sesión aquí</a>
      </p>

      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label for="name">Nombre: <span class="required">*</span></label>
          <input type="text" id="name" v-model="name" placeholder="Juan Pérez" required>
        </div>
        
        <div class="form-group">
          <label for="age">Edad: <span class="required">*</span></label>
          <input type="number" id="age" v-model="age" placeholder="20" required>
        </div>

        <div class="form-group">
          <label for="email">E-mail: <span class="required">*</span></label>
          <input type="email" id="email" v-model="email" placeholder="tucorreo@gmail.com" required>
        </div>

        <div class="form-group">
          <label for="password">Contraseña: <span class="required">*</span></label>
          <input type="password" id="password" v-model="password" placeholder="••••••••" required>
        </div>

        <button type="submit" class="submit-button">Registrarse</button>
      </form>
      
      <div class="social-login">
        <p>O registrese con:</p>
        <div class="social-icons">
          <button class="social-button google" aria-label="Registrarse con Google">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google">
          </button>
          <button class="social-button facebook" aria-label="Registrarse con Facebook">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Facebook">
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');
const age = ref('');
const email = ref('');
const password = ref('');

const handleRegister = () => {
  // Aquí va tu lógica de registro de usuario
  console.log('Registrando nuevo usuario:', {
    name: name.value,
    age: age.value,
    email: email.value,
    password: password.value
  });
  // Por ejemplo: llamar a una API para crear el usuario.
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
  font-family: Arial, sans-serif;
  padding: 5vh 20px 20px 20px; 
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
  height: 50px;
}

.brand-text {
  font-weight: 600;
  letter-spacing: 1px;
  font-size: clamp(24px, 2.6vw, 32px);
  background: linear-gradient(90deg, #37c8ee, #8e7ff2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0px 1px 1px rgba(255, 255, 255, 0.5);
}

.register-card {
  position: relative;
  background: linear-gradient(180deg, #00d4ff, #007bff);
  padding: 40px 30px 30px;
  border-radius: 25px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
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

.title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #011a3e;
}

.subtitle {
  text-align: center;
  margin-bottom: 25px;
  font-size: 0.9rem;
  color: #011a3e;
}

.subtitle a {
  font-weight: bold;
  text-decoration: underline;
  color: #011a3e;
}

.form-group {
  margin-bottom: 15px; /* Menos espacio entre campos que en el login */
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 0.9rem;
  color: #fff;
}

.form-group .required {
  color: #ffdddd;
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: none;
  border-radius: 15px;
  background-color: white;
  box-sizing: border-box;
  font-size: 1rem;
}

.submit-button {
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  background-color: #0d2a4c;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #1a4a8a;
}

.social-login {
  text-align: center;
  margin-top: 20px;
  color: #fff;
}

.social-login p {
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.social-button {
  border: none;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.social-button.google {
  background: white;
  border-radius: 50%;
}
.social-button.google img {
  width: 28px;
}

.social-button.facebook {
  background-color: #1877F2;
  border-radius: 8px; /* Borde cuadrado como en la imagen */
}
.social-button.facebook img {
  width: 20px;
  filter: brightness(0) invert(1);
}

.social-button:hover {
  transform: scale(1.1);
}
</style>