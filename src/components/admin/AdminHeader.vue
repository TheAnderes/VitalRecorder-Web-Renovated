<template>
  <header class="admin-header">
    <div class="header-left">
      <button 
        @click="$emit('toggle-sidebar')" 
        class="sidebar-toggle"
        title="Toggle Sidebar"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
      
      <div class="page-title">
        <h1>{{ pageTitle }}</h1>
      </div>
    </div>

    <div class="header-right">
      <!-- User Menu -->
      <div class="user-menu" @click="toggleUserMenu" ref="userMenuRef">
        <div class="user-avatar">
          <div class="avatar-circle">
            {{ userInitial }}
          </div>
        </div>
        <div class="user-info">
          <span class="user-name">{{ userName }}</span>
          <span class="user-role">{{ userRole || 'user' }}</span>
        </div>
        <div class="dropdown-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>

        <!-- Dropdown Menu -->
        <div class="dropdown-menu" :class="{ show: showUserMenu }">
          <router-link v-if="!(userRole === 'admin' || userRole === 'super_admin')" to="/dashboard" class="dropdown-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
            Dashboard Usuario
          </router-link>
          <div class="dropdown-divider"></div>
          <button @click="$emit('logout')" class="dropdown-item logout-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useAdmin } from '@/composables/useAdmin'

const props = defineProps({
  user: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['toggle-sidebar', 'logout'])

const route = useRoute()
const { getUserName, getUserInitial } = useAuth()
const { userRole } = useAdmin()

const showUserMenu = ref(false)
const userMenuRef = ref(null)

// Computed properties
const userName = computed(() => {
  return getUserName() || 'Admin'
})

const userInitial = computed(() => {
  return getUserInitial() || 'A'
})

const pageTitle = computed(() => {
  const routeNames = {
    'admin-dashboard': 'Dashboard',
    'admin-users': 'Gestión de Usuarios',
    'admin-patient-list': 'Registro y Administración de Pacientes',
    'admin-patient-registro': 'Registro de Pacientes',
    'admin-patient-perfil': 'Perfil de Paciente',
    'admin-analytics': 'Analíticas',
    'admin-user-roles': 'Gestión de Roles'
  }
  return routeNames[route.name] || 'Panel de Administración'
})

// Methods
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const handleClickOutside = (event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.admin-header {
  height: 70px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sidebar-toggle {
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-toggle:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.page-title h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-menu {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.user-menu:hover {
  background-color: #f9fafb;
}

.avatar-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.user-name {
  font-weight: 500;
  font-size: 0.875rem;
  color: #1f2937;
}

.user-role {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: capitalize;
}

.dropdown-arrow {
  color: #9ca3af;
  transition: transform 0.2s ease;
}

.user-menu:hover .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
  z-index: 1000;
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #374151;
  font-size: 0.875rem;
  border: none;
  background: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: left;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}

.dropdown-item:first-child {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.dropdown-item:last-child {
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.logout-btn:hover {
  background-color: #fef2f2;
  color: #dc2626;
}

.dropdown-divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 0.25rem 0;
}

@media (max-width: 768px) {
  .admin-header {
    padding: 0 1rem;
    height: 60px;
  }
  
  .page-title h1 {
    font-size: 1.25rem;
  }
  
  .user-info {
    display: none;
  }
  
  .sidebar-toggle {
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
  
  .user-menu {
    padding: 0.25rem 0.5rem;
  }
  
  .avatar-circle {
    width: 36px;
    height: 36px;
    font-size: 0.8rem;
  }
  
  .dropdown-menu {
    right: 0;
    left: auto;
    width: 180px;
  }
}

@media (max-width: 480px) {
  .admin-header {
    padding: 0 0.75rem;
    height: 56px;
  }
  
  .page-title h1 {
    font-size: 1.125rem;
  }
  
  .header-left {
    gap: 0.75rem;
  }
  
  .sidebar-toggle {
    padding: 0.4rem;
  }
  
  .avatar-circle {
    width: 32px;
    height: 32px;
  }
  
  .dropdown-menu {
    width: 160px;
  }
}
</style>
