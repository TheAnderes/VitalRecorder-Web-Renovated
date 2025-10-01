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
