<template>
  <AdminLayout>
    <div class="users-management">
      <!-- Header -->
      <div class="page-header">
        <div class="header-content">
          <h2>Gestión de Usuarios</h2>
          <p>Administra usuarios registrados en VitalSystems</p>
        </div>
        <button @click="refreshData" class="refresh-btn" :disabled="loading">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Actualizar
        </button>
      </div>

      <!-- Filters -->
      <div class="filters-section">
        <div class="filter-row">
          <div class="search-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <input 
              type="text" 
              placeholder="Buscar por nombre, email o teléfono..."
              v-model="searchQuery"
              @input="updateSearch"
            >
          </div>
          
          <select v-model="roleFilter" @change="updateRoleFilter" class="role-filter">
            <option value="all">Todos los roles</option>
            <option value="user">Usuarios</option>
            <option value="admin">Administradores</option>
            <option value="super_admin">Super Admins</option>
          </select>
          
          <select v-model="sortBy" @change="updateSort" class="sort-select">
            <option value="createdAt">Fecha de registro</option>
            <option value="nombres">Nombre</option>
            <option value="email">Email</option>
            <option value="role">Rol</option>
          </select>
          
          <button @click="toggleSortOrder" class="sort-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M7 4v16l4-4M17 20V4l-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Stats Bar -->
      <div class="stats-bar">
        <div class="stat-item">
          <span class="stat-number">{{ filteredUsers.length }}</span>
          <span class="stat-label">usuarios mostrados</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ stats.totalUsers }}</span>
          <span class="stat-label">total</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ stats.totalAdmins }}</span>
          <span class="stat-label">administradores</span>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Cargando usuarios...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
          <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
        </svg>
        <h3>Error al cargar usuarios</h3>
        <p>{{ error }}</p>
        <button @click="refreshData" class="retry-btn">Reintentar</button>
      </div>

      <!-- Users Table -->
      <div v-else class="users-table">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Información de Contacto</th>
                <th>Rol</th>
                <th>Fecha de Registro</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user.id" class="user-row">
                <td class="user-info">
                  <div class="user-avatar">
                    {{ getUserInitial(user) }}
                  </div>
                  <div class="user-details">
                    <span class="user-name">{{ getUserFullName(user) }}</span>
                    <span class="user-id">ID: {{ user.id.substring(0, 8) }}...</span>
                  </div>
                </td>
                
                <td class="contact-info">
                  <div class="contact-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2" fill="none"/>
                      <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <span>{{ user.email }}</span>
                  </div>
                  <div class="contact-item" v-if="user.telefono">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2" fill="none"/>
                    </svg>
                    <span>{{ user.telefono }}</span>
                  </div>
                </td>
                
                <td class="role-info">
                  <span class="role-badge" :class="user.role">
                    {{ getRoleDisplayName(user.role) }}
                  </span>
                </td>
                
                <td class="date-info">
                  {{ formatDate(user.createdAt) }}
                </td>
                
                <td class="status-info">
                  <span class="status-badge active">
                    <span class="status-dot"></span>
                    Activo
                  </span>
                </td>
                
                <td class="actions-info">
                  <div class="action-buttons">
                    <button @click="viewUser(user)" class="action-btn view" title="Ver detalles">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                      </svg>
                    </button>
                    <button @click="editUser(user)" class="action-btn edit" title="Editar usuario" v-if="canManageUsers">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
                      </svg>
                    </button>
                    <button @click="deleteUser(user)" class="action-btn delete" title="Eliminar usuario" v-if="canDeleteUsers">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <polyline points="3,6 5,6 21,6" stroke="currentColor" stroke-width="2"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" stroke-width="2"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- Empty State -->
          <div v-if="filteredUsers.length === 0" class="empty-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
            <h3>No se encontraron usuarios</h3>
            <p>Prueba ajustando los filtros de búsqueda</p>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdmin } from '@/composables/useAdmin'
import { useAdminStore } from '@/stores/admin'
import AdminLayout from '@/components/admin/AdminLayout.vue'

const { canManageUsers, canDeleteUsers } = useAdmin()
const adminStore = useAdminStore()

// State
const searchQuery = ref('')
const roleFilter = ref('all')
const sortBy = ref('createdAt')
const sortOrder = ref('desc')

// Computed properties
const loading = computed(() => adminStore.loading)
const error = computed(() => adminStore.error)
const stats = computed(() => adminStore.stats)
const filteredUsers = computed(() => adminStore.filteredUsers)

// Methods
const refreshData = async () => {
  await adminStore.refreshData()
}

const updateSearch = () => {
  adminStore.updateFilters({ search: searchQuery.value })
}

const updateRoleFilter = () => {
  adminStore.updateFilters({ role: roleFilter.value })
}

const updateSort = () => {
  adminStore.updateFilters({ sortBy: sortBy.value })
}

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  adminStore.updateFilters({ sortOrder: sortOrder.value })
}

const getUserInitial = (user) => {
  if (user.persona?.nombres) {
    return user.persona.nombres.charAt(0).toUpperCase()
  } else if (user.email) {
    return user.email.charAt(0).toUpperCase()
  }
  return 'U'
}

const getUserFullName = (user) => {
  if (user.persona?.nombres || user.persona?.apellidos) {
    return `${user.persona?.nombres || ''} ${user.persona?.apellidos || ''}`.trim()
  }
  return user.email?.split('@')[0] || 'Usuario sin nombre'
}

const getRoleDisplayName = (role) => {
  const roleNames = {
    'user': 'Usuario',
    'admin': 'Administrador',
    'super_admin': 'Super Admin'
  }
  return roleNames[role] || role
}

const formatDate = (timestamp) => {
  if (!timestamp) return 'No disponible'
  
  let date
  if (timestamp.toDate) {
    date = timestamp.toDate()
  } else {
    date = new Date(timestamp)
  }
  
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const viewUser = (user) => {
  // Implementar modal de vista de usuario
  console.log('Ver usuario:', user)
}

const editUser = (user) => {
  // Implementar modal de edición de usuario
  console.log('Editar usuario:', user)
}

const deleteUser = (user) => {
  // Implementar confirmación y eliminación de usuario
  console.log('Eliminar usuario:', user)
}

onMounted(async () => {
  await refreshData()
})
</script>

<style scoped>
.users-management {
  padding: 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.header-content h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.875rem;
  font-weight: 600;
  color: #1f2937;
}

.header-content p {
  margin: 0;
  color: #6b7280;
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.refresh-btn:hover:not(:disabled) {
  background: #2563eb;
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.filters-section {
  margin-bottom: 1.5rem;
}

.filter-row {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-box svg {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.search-box input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.role-filter, .sort-select {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  cursor: pointer;
}

.sort-btn {
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sort-btn:hover {
  background: #e5e7eb;
}

.stats-bar {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
}

.stat-label {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.loading-state, .error-state {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.retry-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
}

.users-table {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  overflow: hidden;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: #f9fafb;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
  border-bottom: 1px solid #e5e7eb;
}

td {
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
}

.user-row:hover {
  background: #f9fafb;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 500;
  color: #1f2937;
}

.user-id {
  font-size: 0.75rem;
  color: #9ca3af;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.role-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.role-badge.user {
  background: #dbeafe;
  color: #1e40af;
}

.role-badge.admin {
  background: #fed7aa;
  color: #c2410c;
}

.role-badge.super_admin {
  background: #fce7f3;
  color: #be185d;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-badge.active {
  background: #dcfce7;
  color: #166534;
}

.status-dot {
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 50%;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.action-btn.view {
  background: #e0f2fe;
  color: #0369a1;
}

.action-btn.view:hover {
  background: #bae6fd;
}

.action-btn.edit {
  background: #fef3c7;
  color: #d97706;
}

.action-btn.edit:hover {
  background: #fde68a;
}

.action-btn.delete {
  background: #fee2e2;
  color: #dc2626;
}

.action-btn.delete:hover {
  background: #fecaca;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
}

.empty-state svg {
  margin: 0 auto 1rem;
  color: #d1d5db;
}

.empty-state h3 {
  margin-bottom: 0.5rem;
  color: #374151;
}

@media (max-width: 768px) {
  .filter-row {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    max-width: none;
  }
  
  .stats-bar {
    flex-direction: column;
    gap: 1rem;
  }
  
  .page-header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .table-container {
    font-size: 0.875rem;
  }
  
  th, td {
    padding: 0.75rem 0.5rem;
  }
}
</style>
