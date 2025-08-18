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
          <label for="name">Nombre: <span class="required">*</span></label>
          <input id="name" v-model="name" type="text" placeholder="Juan Pérez" required />
        </div>

        <div class="form-group">
          <label for="age">Edad: <span class="required">*</span></label>
          <input id="age" v-model="age" type="number" placeholder="20" required />
        </div>

        <div class="form-group">
          <label for="email">E-mail: <span class="required">*</span></label>
          <input id="email" v-model="email" type="email" placeholder="tucorreo@gmail.com" required />
        </div>

        <div class="form-group">
          <label for="password">Contraseña: <span class="required">*</span></label>
          <input id="password" v-model="password" type="password" placeholder="••••••••" required />
        </div>

        <button type="submit" class="submit-button">Registrarse</button>
      </form>

      <div class="social-login">
        <p>O regístrate con:</p>
        <div class="social-icons">
          <!-- Botón Google (SVG inline) -->
          <button class="social-button" aria-label="Registrarse con Google" @click="withGoogle">
            <svg width="26" height="26" viewBox="0 0 48 48" aria-hidden="true">
              <path fill="#FFC107" d="M43.6 20.5h-1.9V20H24v8h11.3C33.8 31.9 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.7 2.9l5.7-5.7C33.6 5 28.9 3 24 3 12.3 3 3 12.3 3 24s9.3 21 21 21c10.5 0 20-7.6 20-21 0-1.4-.1-2.7-.4-3.9z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C15 16.2 19.2 13 24 13c3 0 5.7 1.1 7.7 2.9l5.7-5.7C33.6 5 28.9 3 24 3 16 3 9 7.4 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 45c5.2 0 9.8-1.7 13.4-4.7l-6.2-5.1C29.3 35 26.8 36 24 36c-5.2 0-9.6-3.3-11.2-7.9l-6.5 5C9 40.6 16.1 45 24 45z"/>
              <path fill="#1976D2" d="M43.6 20.5H24v8h11.3c-1 2.9-3.1 5.1-5.9 6.7l6.2 5.1c3.6-2.6 7.4-7 7.4-15 0-1.4-.1-2.7-.4-3.9z"/>
            </svg>
          </button>

          <!-- Botón Facebook (SVG inline) -->
          <button class="social-button" aria-label="Registrarse con Facebook" @click="withFacebook">
            <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="12" fill="#1877F2"/>
              <path d="M13.5 8.5h1.6V6.2c-.3 0-1.1-.1-2.1-.1-2 0-3.4 1.2-3.4 3.5v2h-2v2.6h2V21h2.6v-6.8h2.1l.3-2.6h-2.4v-1.6c0-.7.2-1.1 1.3-1.1z" fill="#fff"/>
            </svg>
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const age = ref('')
const email = ref('')
const password = ref('')

const handleRegister = () => {
  console.log('Registrando:', { name: name.value, age: age.value, email: email.value })
}

const withGoogle = () => {
  // aquí pones tu flujo OAuth
  console.log('Registro con Google')
}
const withFacebook = () => {
  // aquí pones tu flujo OAuth
  console.log('Registro con Facebook')
}
</script>

<style scoped>
/* Contenedor y header: idénticos a tu login */
.register-container {
  display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
  font-family: Arial, sans-serif; padding: 5vh 20px 20px; min-height: 100vh; background: #fff; box-sizing: border-box;
}
.register-header {
  display: flex; align-items: center; gap: 15px; background: #fff; padding: 10px 25px; border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,.08); margin-bottom: 1.5rem;
}
.brand-mark { height: 50px; width: auto; }
.brand-text {
  font-weight: 600; letter-spacing: 1px; font-size: clamp(24px, 2.6vw, 32px);
  background: linear-gradient(90deg, #37c8ee, #8e7ff2);
  -webkit-background-clip: text; background-clip: text; color: transparent; text-shadow: 0 1px 1px rgba(255,255,255,.5);
}

/* Card */
.register-card {
  position: relative; background: linear-gradient(180deg, #00c6ff, #0072ff);
  padding: 40px 30px 30px; border-radius: 25px; width: 100%; max-width: 400px;
  box-shadow: 0 10px 25px rgba(0,0,0,.1); color: #0d2a4c;
}
.back-button {
  position: absolute; top: 15px; left: 15px; background: rgba(255,255,255,.3); border: none; border-radius: 50%;
  width: 35px; height: 35px; font-size: 1.5rem; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: background-color .2s;
}
.back-button:hover { background: rgba(255,255,255,.5); }

.title { text-align: center; font-size: 2.2rem; font-weight: bold; margin: 10px 0; color: #011a3e; }
.subtitle { text-align: center; margin-bottom: 25px; font-size: .9rem; color: #011a3e; }
.subtitle a { color: #011a3e; font-weight: bold; text-decoration: underline; }

/* Formulario */
.form-group { margin-bottom: 15px; }
.form-group label { display: block; margin-bottom: 8px; font-weight: bold; font-size: .9rem; color: #fff; }
.form-group .required { color: #ffdddd; }
.form-group input {
  width: 100%; padding: 12px 15px; border: none; border-radius: 15px; background: #fff; box-sizing: border-box; font-size: 1rem;
}
.submit-button {
  width: 100%; padding: 15px; margin-top: 10px; background: #0d2a4c; color: #fff; border: none; border-radius: 25px;
  font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: background-color .3s ease;
}
.submit-button:hover { background: #1a4a8a; }

/* Social */
.social-login { text-align: center; margin-top: 20px; color: #fff; }
.social-login p { margin-bottom: 15px; font-size: .9rem; }
.social-icons { display: flex; justify-content: center; gap: 20px; }

.social-button {
  background: #fff; border: none; border-radius: 50%; width: 50px; height: 50px;
  display: flex; align-items: center; justify-content: center; cursor: pointer;
  transition: transform .2s, box-shadow .2s; box-shadow: 0 4px 8px rgba(0,0,0,.15);
}
.social-button:hover { transform: scale(1.1); box-shadow: 0 6px 12px rgba(0,0,0,.25); }
</style>
