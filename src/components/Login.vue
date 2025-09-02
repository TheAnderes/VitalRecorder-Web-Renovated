<template>
  <div class="login-container">
    <header class="login-header">
      <img
        class="brand-mark"
        src="/Logo.png"
        alt="VITALSYSTEMS Logo Icon"
        onerror="this.style.display='none'"
      />
      <div class="brand-text">VITALSYSTEMS</div>
    </header>

    <main class="login-card">
      <button class="back-button" aria-label="Volver">
        &#x2190;
      </button>

      <h1 class="title">Iniciar Sesión</h1>
      <p class="subtitle">
        ¿Es tu primera vez? <a href="/register">Regístrate aquí</a>
      </p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Correo electrónico: <span class="required">*</span></label>
          <input type="email" id="email" v-model="email" placeholder="tucorreo@gmail.com" required />
        </div>

        <div class="form-group">
          <label for="password">Contraseña: <span class="required">*</span></label>
          <input type="password" id="password" v-model="password" placeholder="tucorreo@gmail.com" required />
        </div>

        <a href="/recuperar-contrasena" class="forgot-password">¿Olvidaste tu contraseña?</a>

        <button type="submit" class="submit-button">Iniciar Sesión</button>
      </form>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const handleLogin = () => {
  console.log('Iniciando sesión con:', {
    email: email.value,
    password: password.value,
  });
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: Arial, sans-serif;
  padding: 10vh 20px 20px 20px; /* Increased top padding (10vh) for more space */
  min-height: 100vh;
  background-color: white;
  box-sizing: border-box;
}

.login-header {
  display: flex;
  align-items: center;
  gap: 20px; /* Increased space between logo and text */
  background-color: white;
  padding: 20px 30px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem; /* Increased margin */
}

.brand-mark {
  height: 70px; /* Increased logo size */
  width: auto;
}

.brand-text {
  font-weight: 600;
  letter-spacing: 1px;
  font-size: clamp(28px, 3vw, 36px); /* Increased text size */
  background: linear-gradient(90deg, #37c8ee, #8e7ff2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0px 1px 1px rgba(255, 255, 255, 0.5);
}

.login-card {
  position: relative;
  background: linear-gradient(180deg, #00c6ff, #0072ff);
  padding: 60px 40px 40px; /* Increased padding for a larger form */
  border-radius: 25px;
  width: 100%;
  max-width: 600px; /* Increased width for the card */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
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
  height: 40px; /* Increased button size */
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
  font-size: 2.5rem; /* Increased title font size */
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 20px;
  color: #011a3e;
}

.subtitle {
  text-align: center;
  margin-bottom: 30px;
  font-size: 1rem; /* Increased subtitle font size */
}

.subtitle a {
  color: #011a3e;
  font-weight: bold;
  text-decoration: underline;
}

.form-group {
  margin-bottom: 25px; /* Increased bottom margin */
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 1rem; /* Increased font size */
  color: #fff;
}

.form-group input {
  width: 100%;
  padding: 15px 18px; /* Increased padding */
  border: none;
  border-radius: 20px; /* Increased border radius */
  background-color: white;
  box-sizing: border-box;
  font-size: 1.1rem; /* Increased font size */
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
  font-size: 1.2rem; /* Increased button text size */
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #1a4a8a;
}

.social-login {
  text-align: center;
  margin-top: 30px;
  color: #fff;
}

.social-login p {
  margin-bottom: 20px;
  font-size: 1rem;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 30px; /* Increased gap between social buttons */
}

.social-button {
  background: white;
  border: none;
  border-radius: 50%;
  width: 60px; /* Increased size */
  height: 60px; /* Increased size */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.social-button:hover {
  transform: scale(1.1);
}

.social-button img {
  width: 35px;
  height: auto;
}
</style>
