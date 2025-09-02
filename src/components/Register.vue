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
        &#x2190;
      </button>

      <h1 class="title">Registrarse</h1>
      <p class="subtitle">
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
      </p>

      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label for="fullName">Nombre completo: <span class="required">*</span></label>
          <input id="fullName" v-model="fullName" type="text" placeholder="Juan Pérez" required />
        </div>

        <div class="form-group">
          <label for="password">Contraseña: <span class="required">*</span></label>
          <div class="password-field">
            <input 
              id="password" 
              v-model="password" 
              type="password" 
              placeholder="••••••••" 
              required 
            />
          </div>
        </div>

        <div class="form-group">
          <label for="email">Correo electrónico: <span class="required">*</span></label>
          <input id="email" v-model="email" type="email" placeholder="tucorreo@gmail.com" required />
        </div>

        <div class="form-group">
          <label for="phone">Número de celular: <span class="required">*</span></label>
          <input id="phone" v-model="phone" type="tel" placeholder="(+591) 70000000" required />
        </div>

        <div class="form-group">
          <label for="dob">Fecha de nacimiento: <span class="required">*</span></label>
          <input 
            id="dob" 
            v-model="dob" 
            type="date" 
            placeholder="DD/MM/YYYY" 
            required 
            class="date-picker"
          />
        </div>

        <button type="submit" class="submit-button">Registrarse</button>
      </form>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fullName = ref('')
const password = ref('')
const email = ref('')
const phone = ref('')
const dob = ref('')
const showPassword = ref(false)

const handleRegister = () => {
  console.log('Registrando:', { fullName: fullName.value, password: password.value, email: email.value, phone: phone.value, dob: dob.value })
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-family: Arial, sans-serif;
  padding: 10vh 20px 20px;
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
  width: auto;
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
  background: linear-gradient(180deg, #00c6ff, #0072ff);
  padding: 60px 40px 40px;
  border-radius: 25px;
  width: 100%;
  max-width: 500px;
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
  font-size: 2.2rem;
  font-weight: bold;
  margin: 10px 0;
  color: #011a3e;
}

.subtitle {
  text-align: center;
  margin-bottom: 30px;
  font-size: 0.9rem;
}

.subtitle a {
  color: #011a3e;
  font-weight: bold;
  text-decoration: underline;
}

.form-group {
  margin-bottom: 20px;
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
  background: #fff;
  box-sizing: border-box;
  font-size: 1rem;
}

.password-field {
  align-items: center;
  gap: 10px;
}

.password-toggle {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
}

.submit-button {
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  background: #0d2a4c;
  color: #fff;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background: #1a4a8a;
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
  background: #fff;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.social-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
}
</style>
