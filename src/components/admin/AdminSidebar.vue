<template>
  <aside class="admin-sidebar" :class="{ 'collapsed': isCollapsed }">
    <div class="sidebar-header">
      <div class="logo-section">
        <div class="logo-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" fill="#2563eb"/>
            <path d="M8 12l2 2 4-4" stroke="white" stroke-width="2" fill="none"/>
          </svg>
        </div>
        <div class="logo-text" v-show="!isCollapsed">
          <h3>VitalAdmin</h3>
        </div>
      </div>
    </div>

    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li class="nav-item">
          <router-link 
            to="/admin/dashboard" 
            class="nav-link"
            :class="{ active: $route.name === 'admin-dashboard' }"
          >
            <div class="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor"/>
              </svg>
            </div>
            <span class="nav-text" v-show="!isCollapsed">Dashboard</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link 
            to="/admin/users" 
            class="nav-link"
            :class="{ active: $route.name === 'admin-users' }"
          >
            <div class="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" fill="currentColor"/>
              </svg>
            </div>
            <span class="nav-text" v-show="!isCollapsed">Gestión de Usuarios</span>
          </router-link>
        </li>

        <li class="nav-item ">
          
            <router-link 
              to="/admin/patient" 
              class="nav-link"
              
              :class="{ active: $route.path.startsWith('/admin/patient') }"
            >
              <div class="nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3z" fill="currentColor"/>
                </svg>
              </div>
              <span class="nav-text" v-show="!isCollapsed">Registro y Administración de Cuidadores</span>
                          <button
              class="submenu-toggle"
              v-show="!isCollapsed"
              @click.stop.prevent="togglePatientSubmenu"
              :aria-expanded="patientSubmenuOpen"
              title="Mostrar submódulos"
            >
              <svg :class="{ open: patientSubmenuOpen }" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            </router-link>

          <!-- Submenu: submódulos específicos -->
          <ul class="submenu" v-show="patientSubmenuOpen && !isCollapsed">
            <li class="submenu-item" v-for="mod in patientSubmodules" :key="mod.id">
              <router-link
                :to="`/admin/patient/${mod.id}`"
                class="nav-link sub-link"
                :class="{ active: route.path === `/admin/patient/${mod.id}` }">
                <span class="sub-dot" aria-hidden></span>
                <span class="nav-text">{{ mod.name }}</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <router-link 
            to="/admin/analytics" 
            class="nav-link"
            :class="{ active: $route.path.startsWith('/admin/analytics') || $route.path.startsWith('/admin/revenue') }"
          >
            <div class="nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2.5 2.25h-15A2.25 2.25 0 012 17V4.75A2.25 2.25 0 014.25 2.5h15A2.25 2.25 0 0121.5 4.75V17a2.25 2.25 0 01-2.25 2.25z" fill="currentColor"/>
              </svg>
            </div>
            <span class="nav-text" v-show="!isCollapsed">Analíticas y Reportes</span>
            <button
              class="submenu-toggle"
              v-show="!isCollapsed"
              @click.stop.prevent="toggleReportsSubmenu"
              :aria-expanded="reportsSubmenuOpen"
              title="Mostrar submódulos"
            >
              <svg :class="{ open: reportsSubmenuOpen }" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </router-link>

          <!-- Submenu: Reports submodules -->
          <ul class="submenu" v-show="reportsSubmenuOpen && !isCollapsed">
            <li class="submenu-item">
              <router-link
                to="/admin/analytics"
                class="nav-link sub-link"
                :class="{ active: $route.path === '/admin/analytics' }">
                <span class="sub-dot" aria-hidden></span>
                <span class="nav-text">Analíticas</span>
              </router-link>
            </li>
            <li class="submenu-item">
              <router-link
                to="/admin/revenue"
                class="nav-link sub-link"
                :class="{ active: $route.path === '/admin/revenue' }">
                <span class="sub-dot" aria-hidden></span>
                <span class="nav-text">Ingresos</span>
              </router-link>
            </li>
          </ul>
        </li>

      </ul>
    </nav>

    <!-- User Info Section -->
    <div class="sidebar-footer">
      <div class="user-info" v-show="!isCollapsed">
        <button
          class="user-role-badge logout-button logout-danger"
          @click="$emit('logout')"
          title="Cerrar sesión"
          aria-label="Cerrar sesión"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAdmin } from '@/composables/useAdmin'

const props = defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  }
})

// Forzar el sidebar siempre abierto independientemente de props entrantes
const isCollapsed = ref(false)

const route = useRoute()
const { userRole, canEditUserRoles } = useAdmin()

// submenu state for patient item
const patientSubmenuOpen = ref(true)

function togglePatientSubmenu() {
  patientSubmenuOpen.value = !patientSubmenuOpen.value
}

// submenu state for reports item
const reportsSubmenuOpen = ref(true)

function toggleReportsSubmenu() {
  reportsSubmenuOpen.value = !reportsSubmenuOpen.value
}

// lista de submódulos para la sección de pacientes (ahora cuidadores)
const patientSubmodules = [
  { id: 'registro', name: 'Registro de Cuidadores' },
  { id: 'perfil', name: 'Perfil del Cuidador' },

]

defineEmits(['toggle','logout'])
</script>

<style scoped>
.admin-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  background: linear-gradient(180deg, #1e293b 0%, #334155 100%);
  color: white;
  transition: width 0.3s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.admin-sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  flex-shrink: 0;
}

.logo-text h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #f1f5f9;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 0.25rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: #cbd5e1;
  text-decoration: none;
  transition: all 0.2s ease;
  border-radius: 0;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-link.active {
  background-color: #2563eb;
  color: white;
  position: relative;
}

.nav-link.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: #60a5fa;
}

.nav-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-text {
  font-weight: 500;
  font-size: 0.875rem;
}

.sidebar-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-role-badge {
  background: #059669;
  color: white;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 700;
  text-align: center;
  display: inline-block;
  line-height: 1;
}

.logout-button {
  display: block;
  width: 100%;
  text-align: center;
  border: none;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  font: inherit;
  color: inherit;
  transition: transform 0.06s ease, background-color 0.15s ease, box-shadow 0.12s ease;
}

.logout-danger {
  background: #ef4444; /* red-500 */
  color: #ffffff;
  box-shadow: 0 6px 18px rgba(239,68,68,0.12);
}

.logout-danger:hover {
  background: #dc2626; /* red-600 */
  transform: translateY(-1px);
}

.logout-button:focus {
  outline: 2px solid rgba(255,255,255,0.12);
  outline-offset: 2px;
}

/* Patient submenu styles */


.submenu-toggle {
  background: transparent;
  border: none;
  color: #cbd5e1;
  cursor: pointer;
  padding: 0.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.submenu-toggle svg {
  transition: transform 0.2s ease;
}

.submenu-toggle svg.open {
  transform: rotate(180deg);
}

.submenu {
  list-style: none;
  margin: 0;
  padding: 0 0 0 2rem;
  transition: max-height 0.2s ease;
}

.submenu-item {
  margin: 0.25rem 0;
}

.sub-link {
  padding: 0.4rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #cbd5e1;
  font-size: 0.85rem;
}

.sub-link:hover {
  background: rgba(255,255,255,0.03);
  color: white;
}

.sub-dot {
  width: 8px;
  height: 8px;
  background: #60a5fa;
  border-radius: 50%;
  display: inline-block;
}

.sub-link.active {
  background: rgba(37,99,235,0.12);
  color: white;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .admin-sidebar {
    transform: translateX(-100%);
    z-index: 1100;
    transition: transform 0.3s ease;
  }
  
  .admin-sidebar.collapsed {
    transform: translateX(-100%);
  }
  
  .admin-sidebar:not(.collapsed) {
    transform: translateX(0);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }
  
  .nav-text {
    display: block !important;
  }
  
  .logo-text {
    display: block !important;
  }
  
  .user-info {
    display: block !important;
  }
}

@media (max-width: 480px) {
  .admin-sidebar {
    width: 280px;
  }
  
  .sidebar-header {
    padding: 1rem;
  }
  
  .nav-link {
    padding: 1rem 1.25rem;
  }
  
  .nav-text {
    font-size: 0.9rem;
  }
  
  .sidebar-footer {
    padding: 1rem 1.25rem;
  }
}
</style>
