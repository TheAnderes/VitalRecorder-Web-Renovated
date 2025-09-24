<template>
  <header class="header">
    <div class="shell">
      <!-- Sección izquierda: Menú hamburguesa -->
      <div class="header-left">
        <button class="hamburger" @click="toggleMenu" aria-label="Abrir menú">
          <span :class="{ open: isOpen }"></span>
          <span :class="{ open: isOpen }"></span>
          <span :class="{ open: isOpen }"></span>
        </button>
      </div>

      <!-- Sección centro: Marca -->
      <div class="header-center">
        <router-link to="/" class="brand" @click="closeMenu">
          <img
            class="brand-mark"
            src="/Logo.png"
            alt="VITALSYSTEMS"
            onerror="this.src='/favicon.ico'; this.classList.add('fallback')"
          />
          <div class="brand-text">VITALSYSTEMS</div>
        </router-link>
      </div>

      <!-- Sección derecha: Auth y Links -->
      <div class="header-right">
        <!-- Auth: DERECHA en móvil -->
        <div class="auth-slot">
          <button v-if="user" @click="handleLogout" class="btn">Cerrar Sesión</button>
          <router-link v-else to="/login" class="btn">Iniciar Sesión</router-link>
        </div>

        <!-- Links de escritorio (ocultos en móvil) -->
        <ul class="links desktop-only">
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/about-us">Sobre Nosotros</router-link></li>
          <li 
            class="dropdown-container" 
            @mouseenter="openProductsDropdown" 
            @mouseleave="closeProductsDropdown"
          >
            <a href="#" class="dropdown-trigger" @click.prevent>Productos</a>
            <ul class="dropdown-menu" :class="{ 'show': showProductsDropdown }">
              <li><router-link to="/product1">Vital Recorder</router-link></li>
              <li><router-link to="/product2">Vital Connect</router-link></li>
            </ul>
          </li>
          <li><router-link to="/contact-us">Contáctanos</router-link></li>
        </ul>
      </div>
    </div>

    <!-- Overlay móvil a pantalla completa -->
    <transition name="fade">
      <div v-if="isOpen" class="mobile-overlay" @click.self="closeMenu">
        <div class="overlay-header">
          <button class="close" @click="closeMenu" aria-label="Cerrar menú">×</button>
        </div>
        <ul class="overlay-links" @click="closeMenu">
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/about-us">Sobre Nosotros</router-link></li>
          <li class="mobile-dropdown-container">
            <button 
              class="mobile-dropdown-trigger" 
              @click.stop="toggleMobileProductsDropdown"
            >
              Productos
              <span class="dropdown-arrow" :class="{ 'open': showMobileProductsDropdown }">▼</span>
            </button>
            <ul class="mobile-dropdown-menu" :class="{ 'show': showMobileProductsDropdown }">
              <li><router-link to="/product1">Vital Recorder</router-link></li>
              <li><router-link to="/product2">Vital Connect</router-link></li>
            </ul>
          </li>
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
import { signOut } from '../firebase'
import { auth } from '../firebase'

const user = ref(null)
const isOpen = ref(false)
const showProductsDropdown = ref(false)
const showMobileProductsDropdown = ref(false)

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

// Funciones del dropdown de productos
const openProductsDropdown = () => {
  showProductsDropdown.value = true
}

const closeProductsDropdown = () => {
  showProductsDropdown.value = false
}

// Funciones del dropdown móvil de productos
const toggleMobileProductsDropdown = () => {
  showMobileProductsDropdown.value = !showMobileProductsDropdown.value
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
.header {
  background: #0f172a;
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 9999;
  width: 100%;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
}

.shell {
  width: clamp(320px, 92vw, 1440px);
  margin: 0 auto;
  height: clamp(56px, 7vh, 72px);
  padding: 0 clamp(12px, 2vw, 28px);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  column-gap: 12px;
}

/* --- SECCIONES DEL HEADER --- */
.header-left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.header-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* En escritorio, mover el brand a la izquierda */
@media (min-width: 1024px) {
  .header-center {
    justify-content: flex-start;
  }
}

.header-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease;
  border-radius: 8px;
  padding: 4px 8px;
}

.brand:hover {
  transform: scale(1.02);
}

.brand img {
  width: clamp(32px, 8vw, 50px);
  height: auto;
  transition: transform 0.2s ease;
}

.brand:hover img {
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
  transition: transform 0.2s ease;
}

.brand:hover .brand-text {
  transform: scale(1.02);
}

/* Fallback para navegadores que no soportan background-clip */
@supports not (-webkit-background-clip: text) {
  .brand-text {
    background: none;
    color: #60a5fa !important;
    -webkit-text-fill-color: initial;
  }
}

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

.hamburger span.open:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger span.open:nth-child(2) {
  opacity: 0;
}

.hamburger span.open:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.auth-slot {
  justify-self: end;
}

.links {
  display: none;
  align-items: center;
  gap: clamp(10px, 2vw, 24px);
  list-style: none;
  margin: 0;
  padding: 0;
}

/* Ocultar elementos en móvil ya que están en el menú overlay */
@media (max-width: 1023px) {
  .auth-slot {
    display: none;
  }
  
  .links {
    display: none;
  }
  
  /* Ocultar sección derecha completamente en móvil */
  .header-right {
    display: none;
  }
  
  /* Ajustar grid para que solo tenga hamburguesa y marca centrada */
  .shell {
    grid-template-columns: auto 1fr;
  }
}

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

.overlay-links a.router-link-active {
  color: #fff;
}

.overlay-auth {
  margin-top: 12px;
}

.btn.full {
  display: block;
  width: 100%;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.btn {
  background: #1e293b;
  padding: .5em .9em;
  border-radius: 10px;
  text-decoration: none;
  color: #cbd5e1;
  font-size: 14px;
  border: 1px solid transparent;
  transition: background .3s, color .3s;
  white-space: nowrap; /* Evita que el texto del botón se divida */
}


.btn:hover {
  background: #334155;
  color: #fff;
}

@media (min-width: 1024px) {
  .shell {
    display: grid;
    grid-template-columns: 1fr auto auto;
    justify-content: start;
  }

  .hamburger {
    display: none;
  }

  .header-left {
    display: none;
  }

  .header-center {
    justify-content: flex-start;
    padding-right: 2rem;
  }

  .auth-slot {
    order: 3;
  }

  .brand {
    order: 1;
    justify-self: unset;
  }

  .links {
    display: flex;
    order: 2;
    margin-left: auto;
    margin-right: 16px;
  }

  .brand-text {
    font-size: clamp(22px, 2.6vw, 34px);
  }
}

a {
  color: #cbd5e1;
  text-decoration: none;
  font-size: clamp(.9rem, 1vw, 1rem);
}

a.router-link-active {
  color: #fff;
}

/* === ESTILOS DEL DROPDOWN === */
.dropdown-container {
  position: relative;
}

.dropdown-trigger {
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
}

.dropdown-trigger:hover {
  color: #fff;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #1e293b;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  padding: 8px 0;
  margin: 8px 0 0;
  min-width: 160px;
  list-style: none;
  z-index: 10000;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-50%) translateY(-10px);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.dropdown-menu li {
  padding: 0;
  margin: 0;
}

.dropdown-menu a {
  display: block;
  padding: 12px 20px;
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  border-radius: 4px;
  margin: 2px 8px;
}

.dropdown-menu a:hover {
  background: #334155;
  color: #fff;
  transform: translateX(2px);
}

.dropdown-menu a.router-link-active {
  background: linear-gradient(90deg, #2dd4bf, #60a5fa);
  color: #fff;
  font-weight: 600;
}

/* === ESTILOS DEL DROPDOWN MÓVIL === */
.mobile-dropdown-container {
  margin: 0;
}

.mobile-dropdown-trigger {
  background: none;
  border: none;
  color: #e2e8f0;
  font-size: 1.05rem;
  width: 100%;
  text-align: left;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: color 0.3s ease;
}

.mobile-dropdown-trigger:hover {
  color: #fff;
}

.dropdown-arrow {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
}

.dropdown-arrow.open {
  transform: rotate(180deg);
}

.mobile-dropdown-menu {
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  background: rgba(30, 41, 59, 0.5);
  border-radius: 6px;
  margin-left: 16px;
}

.mobile-dropdown-menu.show {
  max-height: 200px;
  padding: 8px 0;
}

.mobile-dropdown-menu li {
  margin: 0;
}

.mobile-dropdown-menu a {
  display: block;
  padding: 10px 16px;
  color: #cbd5e1;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border-radius: 4px;
  margin: 2px 8px;
}

.mobile-dropdown-menu a:hover {
  background: #334155;
  color: #fff;
  transform: translateX(4px);
}

.mobile-dropdown-menu a.router-link-active {
  background: linear-gradient(90deg, #2dd4bf, #60a5fa);
  color: #fff;
  font-weight: 600;
}
</style>
