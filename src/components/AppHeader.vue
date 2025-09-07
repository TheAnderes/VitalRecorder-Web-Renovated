<template>
  <header class="header">
    <nav class="shell">
      <!-- Botón menú (3 líneas) - IZQUIERDA en móvil -->
      <button class="hamburger" @click="toggleMenu" aria-label="Abrir menú">
        <span :class="{ open: isOpen }"></span>
        <span :class="{ open: isOpen }"></span>
        <span :class="{ open: isOpen }"></span>
      </button>

      <!-- Marca centrada en móvil -->
      <div class="brand">
        <img
          class="brand-mark"
          src="/Logo.png"
          alt="VITALSYSTEMS"
          onerror="this.src='/favicon.ico'; this.classList.add('fallback')"
        />
        <div class="brand-text">VITALSYSTEMS</div>
      </div>

      <!-- Auth: DERECHA en móvil -->
      <div class="auth-slot">
        <button v-if="user" @click="handleLogout" class="btn">Cerrar Sesión</button>
        <router-link v-else to="/login" class="btn">Iniciar Sesión</router-link>
      </div>

      <!-- Links de escritorio (ocultos en móvil) -->
      <ul class="links desktop-only">
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/about-us">Sobre Nosotros</router-link></li>
        <li><router-link to="/product">Producto</router-link></li>
        <li><router-link to="/contact-us">Contáctanos</router-link></li>
      </ul>
    </nav>

    <!-- Overlay móvil a pantalla completa -->
    <transition name="fade">
      <div v-if="isOpen" class="mobile-overlay" @click.self="closeMenu">
        <div class="overlay-header">
          <button class="close" @click="closeMenu" aria-label="Cerrar menú">×</button>
        </div>
        <ul class="overlay-links" @click="closeMenu">
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/about-us">Sobre Nosotros</router-link></li>
          <li><router-link to="/product">Producto</router-link></li>
          <li><router-link to="/contact-us">Contáctanos</router-link></li>
          <li class="overlay-auth">
            <button v-if="user" @click.stop="handleLogout" class="btn full">Cerrar Sesión</button>
            <router-link v-else to="/login" class="btn full">Iniciar Sesión</router-link>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

const user = ref(null)
const isOpen = ref(false)

watch(() => auth.currentUser, (newUser) => (user.value = newUser))
onMounted(() => {
  if (auth.currentUser) user.value = auth.currentUser
})

const lockScroll = () => document.documentElement.classList.add('no-scroll')
const unlockScroll = () => document.documentElement.classList.remove('no-scroll')

const toggleMenu = () => {
  isOpen.value = !isOpen.value
  isOpen.value ? lockScroll() : unlockScroll()
}
const closeMenu = () => {
  isOpen.value = false
  unlockScroll()
}

onBeforeUnmount(unlockScroll)

const handleLogout = async () => {
  try {
    await signOut(auth)
    user.value = null
    closeMenu()
    window.location.href = '/login'
  } catch (error) {
    console.error('Error al cerrar sesión:', error.message)
  }
}

/* ✅ cerrar overlay y desbloquear scroll al cambiar de ruta */
const router = useRouter()
router.afterEach(() => {
  closeMenu()
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
})
</script>

<style scoped>

/* Header base */
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

/* Contenedor: grid para móvil (3 columnas) y flex en desktop */
.shell {
  width: clamp(320px, 92vw, 1440px);
  margin: 0 auto;
  height: clamp(56px, 7vh, 72px);
  padding: 0 clamp(12px, 2vw, 28px);

  display: grid;
  grid-template-columns: auto 1fr auto; /* [hamburger] [brand centrada] [login] */
  align-items: center;
  column-gap: 12px;
}

/* Marca */
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-self: center;
  font-weight: 700;
  letter-spacing: .4px;
}
.brand img {
  width: clamp(32px, 8vw, 50px);
  height: auto;
}
.brand-text {
  font-weight: 500;
  letter-spacing: .2px;
  font-size: clamp(18px, 5vw, 28px);
  background: linear-gradient(90deg, #2dd4bf, #60a5fa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Botón menú (3 líneas) */
.hamburger {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  width: 36px;
  height: 36px;
}
.hamburger span {
  display: block;
  width: 24px;
  height: 3px;
  background: #fff;
  border-radius: 3px;
  transition: transform .3s ease, opacity .3s ease;
}
.hamburger span.open:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.hamburger span.open:nth-child(2) { opacity: 0; }
.hamburger span.open:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

/* Slot de autenticación */
.auth-slot { justify-self: end; }

/* Links escritorio */
.links {
  display: none;
  align-items: center;
  gap: clamp(10px, 2vw, 24px);
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Overlay móvil */
.mobile-overlay {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.96);
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  z-index: 6000;
}
.overlay-header {
  display: flex;
  justify-content: flex-end;
  padding: 12px 16px;
}
.close {
  background: transparent;
  border: none;
  font-size: 32px;
  color: #fff;
  line-height: 1;
  cursor: pointer;
}
.overlay-links {
  list-style: none;
  padding: 24px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.overlay-links a {
  color: #e2e8f0;
  text-decoration: none;
  font-size: 1.05rem;
}
.overlay-links a.router-link-active { color: #fff; }
.overlay-auth { margin-top: 12px; }
.btn.full {
  display: block;
  width: 100%;
  text-align: center;
}

/* Transiciones overlay */
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Botón genérico */
.btn {
  background: #1e293b;
  padding: .5em .9em;
  border-radius: 10px;
  text-decoration: none;
  color: #cbd5e1;
}
.btn:hover { background: #334155; }

/* Escritorio */
@media (min-width: 1024px) {
  .shell {
    display: flex;
    justify-content: space-between;
  }
  .hamburger { display: none; }
  .auth-slot { order: 3; }
  .brand { order: 1; justify-self: unset; }
  .links {
    display: flex;
    order: 2;
    margin-left: auto;
    margin-right: 16px;
  }
  .brand-text { font-size: clamp(22px, 2.6vw, 34px); }
}

a { color: #cbd5e1; text-decoration: none; font-size: clamp(.9rem, 1vw, 1rem); }
a.router-link-active { color: #fff; }
</style>
