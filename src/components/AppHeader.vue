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
          <!-- Menú de usuario cuando está logueado -->
          <div v-if="user" class="user-menu-container" @click.stop>
            <button 
              class="user-menu-trigger"
              @click="toggleUserMenu"
              :class="{ 'active': showUserMenu }"
              aria-label="Menú de usuario"
            >
              <div class="user-avatar">
                <span class="user-initial">{{ getUserInitial() }}</span>
              </div>
              <div class="user-info">
                <span class="user-name">{{ getUserName() }}</span>
                <span class="session-status">Sesión iniciada</span>
              </div>
              <svg class="dropdown-arrow" :class="{ 'rotated': showUserMenu }" width="12" height="12" viewBox="0 0 12 12">
                <path fill="currentColor" d="M6 9L1.5 4.5h9L6 9z"/>
              </svg>
            </button>
            
            <div class="user-dropdown" :class="{ 'show': showUserMenu }">
              <router-link to="/dashboard" class="user-dropdown-item" @click="closeUserMenu">
                <svg class="item-icon" width="16" height="16" viewBox="0 0 16 16">
                  <path fill="currentColor" d="M8 8a3 3 0 100-6 3 3 0 000 6zm2-3a2 2 0 11-4 0 2 2 0 014 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
                Ver mi perfil
              </router-link>
              <button class="user-dropdown-item logout-item" @click="handleLogout">
                <svg class="item-icon" width="16" height="16" viewBox="0 0 16 16">
                  <path fill="currentColor" d="M10 12.5a.5.5 0 01-.5.5h-8a.5.5 0 01-.5-.5v-9a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v2a.5.5 0 001 0v-2A1.5 1.5 0 009.5 2h-8A1.5 1.5 0 000 3.5v9A1.5 1.5 0 001.5 14h8a1.5 1.5 0 001.5-1.5v-2a.5.5 0 00-1 0v2z"/>
                  <path fill="currentColor" d="M15.854 8.354a.5.5 0 000-.708l-3-3a.5.5 0 00-.708.708L14.293 7.5H5.5a.5.5 0 000 1h8.793l-2.147 2.146a.5.5 0 00.708.708l3-3z"/>
                </svg>
                Cerrar sesión
              </button>
            </div>
          </div>
          
          <!-- Botón de iniciar sesión cuando no está logueado -->
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
import { ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { auth, signOut } from '../firebase'
import { useAuth } from '@/composables/useAuth'

const { user, getUserName, getUserInitial } = useAuth()
const isOpen = ref(false)
const showProductsDropdown = ref(false)
const showMobileProductsDropdown = ref(false)
const showUserMenu = ref(false)

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

// Funciones del menú de usuario
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const closeUserMenu = () => {
  showUserMenu.value = false
}

onBeforeUnmount(unlockScroll)

const handleLogout = async () => {
  try {
    await signOut(auth)
    closeMenu()
    closeUserMenu() // Cerrar el menú de usuario
    // Redirigir a la página de inicio en lugar de login
    router.push('/') 
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

/* === ESTILOS DEL MENÚ DE USUARIO === */
.user-menu-container {
  position: relative;
}

.user-menu-trigger {
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 8px 12px;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  min-width: 220px;
  backdrop-filter: blur(10px);
}

.user-menu-trigger:hover,
.user-menu-trigger.active {
  background: rgba(45, 212, 191, 0.1);
  border-color: rgba(45, 212, 191, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(45, 212, 191, 0.2);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2dd4bf, #60a5fa);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(45, 212, 191, 0.3);
}

.user-initial {
  font-size: 14px;
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.user-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.session-status {
  font-size: 11px;
  color: #10b981;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dropdown-arrow {
  transition: transform 0.3s ease;
  color: #cbd5e1;
  flex-shrink: 0;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.user-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(45, 212, 191, 0.1);
  padding: 8px 0;
  min-width: 200px;
  z-index: 10000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.user-dropdown.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.user-dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  color: #cbd5e1;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
}

.user-dropdown-item:hover {
  background: rgba(45, 212, 191, 0.1);
  color: #2dd4bf;
  transform: translateX(2px);
}

.user-dropdown-item.logout-item:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.item-icon {
  flex-shrink: 0;
  opacity: 0.8;
}

/* Responsive para el menú de usuario */
@media (max-width: 1023px) {
  .user-menu-container {
    display: none;
  }
}

@media (max-width: 480px) {
  .user-menu-trigger {
    min-width: 180px;
    padding: 6px 10px;
  }
  
  .user-name {
    font-size: 13px;
  }
  
  .session-status {
    font-size: 10px;
  }
}
</style>
