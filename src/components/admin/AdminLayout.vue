<template>
  <div class="admin-layout">
    <!-- Mobile Overlay -->
    <div 
      v-if="!sidebarCollapsed" 
      class="mobile-overlay"
      @click="toggleSidebar"
    ></div>
    
    <!-- Sidebar -->
    <AdminSidebar 
      :is-collapsed="sidebarCollapsed"
      @toggle="toggleSidebar"
    />
    
    <!-- Main Content -->
    <div class="admin-main" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <!-- Header -->
      <AdminHeader 
        :user="user"
        @toggle-sidebar="toggleSidebar"
        @logout="handleLogout"
      />
      
      <!-- Content Area -->
      <main class="admin-content">
        <div class="content-container">
          <slot />
        </div>
      </main>
      <!-- Footer -->
      <footer class="admin-footer" aria-label="Footer de administración">
        <div class="content-container">
          <div class="admin-footer__top">panel de administracion</div>
          <div class="admin-footer__divider" aria-hidden="true"></div>
          <div class="admin-footer__bottom">vital sistem</div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { useAuth } from '@/composables/useAuth'
import AdminSidebar from './AdminSidebar.vue'
import AdminHeader from './AdminHeader.vue'

const router = useRouter()
const { user } = useAuth()

const sidebarCollapsed = ref(true) // Start collapsed on mobile

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const handleLogout = async () => {
  try {
    await signOut(auth)
    router.push('/')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
}

.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 280px;
  transition: margin-left 0.3s ease;
}

.admin-main.sidebar-collapsed {
  margin-left: 80px;
}

.admin-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
}

/* Simple admin footer */
.admin-footer {
  padding: 1rem 0;
  /* dark subtle gradient for a professional look */
  background: linear-gradient(180deg, #0f172a 0%, #0b1220 100%);
  color: #ffffff;
  text-align: center;
  box-shadow: 0 -1px 8px rgba(2,6,23,0.25);
}
.admin-footer .content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.admin-footer__top {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.75);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
}
.admin-footer__divider {
  width: 90px;
  height: 1px;
  background: rgba(255,255,255,0.12);
  margin: 6px 0;
  border-radius: 2px;
}
.admin-footer__bottom {
  font-weight: 700;
  font-size: 1.05rem;
  color: #fff;
}

@media (max-width: 480px) {
  .admin-footer__top { font-size: 0.8rem; }
  .admin-footer__bottom { font-size: 0.95rem; }
  .admin-footer__divider { width: 60px; }
}

.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1050;
  display: none;
}

@media (max-width: 768px) {
  .admin-main {
    margin-left: 0;
  }
  
  .admin-main.sidebar-collapsed {
    margin-left: 0;
  }
  
  .admin-content {
    padding: 1rem;
  }
  
  .mobile-overlay {
    display: block;
  }
}

@media (max-width: 480px) {
  .admin-content {
    padding: 0.75rem;
  }
  
  .content-container {
    max-width: none;
  }
}
</style>
