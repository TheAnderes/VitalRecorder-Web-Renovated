<template>
  <header class="header">
    <nav class="shell">
      <div class="brand">
        <img
          class="brand-mark"
          src="/Logo.png"
          alt="VITALSYSTEMS"
          onerror="this.src='/favicon.ico'; this.classList.add('fallback')"
        />
        <div class="brand-text">VITALSYSTEMS</div>
      </div>

      <ul class="links">
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/about-us">Sobre Nosotros</router-link></li>
        <li><router-link to="/product">Producto</router-link></li>
        <li><router-link to="/contact-us">Contáctanos</router-link></li>

        <!-- Mostrar "Cerrar Sesión" si el usuario está logueado -->
        <li>
          <button v-if="user" @click="handleLogout" class="btn">Cerrar Sesión</button>
          <router-link v-else to="/login" class="btn">Iniciar Sesión</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Importa la configuración de Firebase

const user = ref(null);

// Watch para reaccionar al cambio de estado de autenticación
watch(() => auth.currentUser, (newUser) => {
  user.value = newUser;
});

// Verificamos si el usuario está autenticado cuando se monta el componente
onMounted(() => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    user.value = currentUser;
  }
});

// Función para cerrar sesión
const handleLogout = async () => {
  try {
    await signOut(auth);
    user.value = null;  // Limpiamos el estado del usuario
    // Redirigimos al login después de cerrar sesión
    window.location.href = "/login";
  } catch (error) {
    console.error("Error al cerrar sesión:", error.message);
  }
};
</script>

<style scoped>
.header {
  background: #0f172a;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 5000;
  width: 100%;
  font-family: var(--tipografia);
  font-weight: 600;
}

.shell {
  width: clamp(320px, 92vw, 1440px);
  margin: 0 auto;
  height: clamp(56px, 7vh, 72px);
  padding: 0 clamp(12px, 2vw, 28px);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  letter-spacing: .4px;
}

.brand img {
  width: clamp(50px, 2.2vw, 32px);
  height: auto;
}

.brand-text {
  font-weight: 500;
  letter-spacing: .2px;
  font-size: clamp(22px, 2.6vw, 34px);
  background: linear-gradient(90deg, #2dd4bf, #60a5fa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.links {
  display: flex;
  align-items: center;
  gap: clamp(10px, 2vw, 24px);
  list-style: none;
  margin: 0;
  padding: 0;
}

a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: clamp(.9rem, 1vw, 1rem);
}

a.router-link-active {
  color: #fff;
}

.btn {
  background: #1e293b;
  padding: .5em .9em;
  border-radius: 10px;
}

.btn:hover {
  background: #334155;
}
</style>
