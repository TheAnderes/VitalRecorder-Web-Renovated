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
          <div class="data-grid">
            <div class="grid-header">
              <div class="cell user">Usuario</div>
              <div class="cell contact">Información de Contacto</div>
              <div class="cell role center">Rol</div>
              <div class="cell date center">Fecha de Registro</div>
              <div class="cell status center">Estado</div>
              <div class="cell actions center">Acciones</div>
            </div>
            <div class="grid-body">
              <div class="grid-row" v-for="user in filteredUsers" :key="user.id">
                <div class="cell user">
                  <div class="user-info">
                    <div class="user-avatar">
                      {{ getUserInitial(user) }}
                    </div>
                    <div class="user-details">
                      <span class="user-name">{{ getUserFullName(user) }}</span>
                      <span class="user-id">ID: {{ user.id.substring(0, 8) }}...</span>
                    </div>
                  </div>
                </div>
                <div class="cell contact">
                  <div class="contact-info">
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
                  </div>
                </div>
                <div class="cell role center">
                  <span class="role-badge" :class="user.role">
                    {{ getRoleDisplayName(user.role) }}
                  </span>
                </div>
                <div class="cell date center">
                  {{ formatDate(user.createdAt) }}
                </div>
                <div class="cell status center">
                  <span class="status-badge" :class="user.isActive ? 'active' : 'inactive'">
                    <span class="status-dot"></span>
                    {{ user.isActive ? 'Activo' : 'Inactivo' }}
                  </span>
                </div>
                <div class="cell actions center">
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
                </div>
              </div>
            </div>
          </div>

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
    
    <!-- Modals for actions -->
    <div v-if="showViewModal" class="modal-backdrop" @click.self="closeModals">
      <div class="modal user-details-modal">
        <div class="modal-header">
          <h3>Detalles del Usuario</h3>
          <button class="modal-close" @click="closeModals">×</button>
        </div>
        <div class="modal-body">
          <div class="user-summary" v-if="selectedUser">
            <div class="avatar-large">{{ getUserInitial(selectedUser) }}</div>
            <div class="info">
              <div class="row"><span class="label">Nombre:</span><span class="value">{{ getUserFullName(selectedUser) }}</span></div>
              <div class="row"><span class="label">Email:</span><span class="value">{{ selectedUser.email }}</span></div>
              <div class="row" v-if="selectedUser.telefono"><span class="label">Teléfono:</span><span class="value">{{ selectedUser.telefono }}</span></div>
              <div class="row"><span class="label">Rol:</span><span class="value">{{ getRoleDisplayName(selectedUser.role) }}</span></div>
              <div class="row"><span class="label">Estado:</span><span class="value">{{ selectedUser.isActive ? 'Activo' : 'Inactivo' }}</span></div>
              <div class="row"><span class="label">Registrado:</span><span class="value">{{ formatDate(selectedUser.createdAt) }}</span></div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn" @click="closeModals">Cerrar</button>
        </div>
      </div>
    </div>

    <div v-if="showEditModal" class="modal-backdrop" @click.self="closeModals">
      <div class="modal">
        <div class="modal-header">
          <h3>Editar Usuario</h3>
          <button class="modal-close" @click="closeModals">×</button>
        </div>
        <div class="modal-body" v-if="editForm">
          <div class="form-row">
            <label>Nombre</label>
            <input type="text" v-model="editForm.nombres" placeholder="Nombres" />
          </div>
          <div class="form-row">
            <label>Apellidos</label>
            <input type="text" v-model="editForm.apellidos" placeholder="Apellidos" />
          </div>
          <div class="form-row">
            <label>Email</label>
            <input type="email" v-model="editForm.email" placeholder="correo@ejemplo.com" />
          </div>
          <div class="form-row">
            <label>Rol</label>
            <select v-model="editForm.role">
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          <div class="form-row switch">
            <label>Activo</label>
            <input type="checkbox" v-model="editForm.isActive" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn ghost" @click="closeModals">Cancelar</button>
          <button class="btn primary" @click="saveUserEdits">Guardar</button>
        </div>
      </div>
    </div>

    <div v-if="showDeleteModal" class="modal-backdrop" @click.self="closeModals">
      <div class="modal">
        <div class="modal-header">
          <h3>Eliminar Usuario</h3>
          <button class="modal-close" @click="closeModals">×</button>
        </div>
        <div class="modal-body">
          <p>¿Seguro que deseas eliminar al usuario <strong>{{ getUserFullName(selectedUser) }}</strong> ({{ selectedUser?.email }})? Esta acción no se puede deshacer.</p>
        </div>
        <div class="modal-footer">
          <button class="btn ghost" @click="closeModals">Cancelar</button>
          <button class="btn danger" @click="confirmDeleteUser">Eliminar</button>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdmin } from '@/composables/useAdmin'
import { AdminUserService } from '@/services/adminUserService'
import AdminLayout from '@/components/admin/AdminLayout.vue'

const { canManageUsers, canDeleteUsers } = useAdmin()

// State local
const users = ref([])
const loading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const roleFilter = ref('all')
const sortBy = ref('createdAt')
const sortOrder = ref('desc')

// Stats computadas
const stats = computed(() => {
  const total = users.value.length
  const active = users.value.filter(u => u.isActive !== false).length
  const admins = users.value.filter(u => u.role === 'admin').length
  return { totalUsers: total, total, activeUsers: active, adminUsers: admins }
})

// Filtrado y ordenamiento
const filteredUsers = computed(() => {
  let list = [...users.value]
  
  // Búsqueda por texto
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(u => 
      (u.persona?.nombres || '').toLowerCase().includes(q) ||
      (u.persona?.apellidos || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q) ||
      (u.telefono || '').toLowerCase().includes(q)
    )
  }
  
  // Filtro por rol
  if (roleFilter.value && roleFilter.value !== 'all') {
    list = list.filter(u => u.role === roleFilter.value)
  }
  
  // Ordenamiento
  list.sort((a, b) => {
    let aV = a[sortBy.value]
    let bV = b[sortBy.value]
    
    if (sortBy.value === 'name') {
      aV = a.persona?.nombres || a.email || ''
      bV = b.persona?.nombres || b.email || ''
    }
    
    if (aV > bV) return sortOrder.value === 'asc' ? 1 : -1
    if (aV < bV) return sortOrder.value === 'asc' ? -1 : 1
    return 0
  })
  
  return list
})

// Local state for modals
const selectedUser = ref(null)
const showViewModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)

const editForm = ref(null)

// Methods
const loadUsers = async () => {
  try {
    loading.value = true
    error.value = null
    console.log("🔄 [UsersManagement] Cargando usuarios desde Firebase...")
    
    const result = await AdminUserService.getUsersPaginated(null, 100, {})
    users.value = result.users || []
    
    console.log("✅ [UsersManagement] Usuarios cargados:", users.value.length)
  } catch (err) {
    console.error("❌ [UsersManagement] Error cargando usuarios:", err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const refreshData = async () => {
  await loadUsers()
}

const updateSearch = () => {
  // El computed filteredUsers ya es reactivo a searchQuery
}

const updateRoleFilter = () => {
  // El computed filteredUsers ya es reactivo a roleFilter
}

const updateSort = () => {
  // El computed filteredUsers ya es reactivo a sortBy
}

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

// Action handlers
const viewUser = (user) => {
  selectedUser.value = user
  showViewModal.value = true
}

const editUser = (user) => {
  selectedUser.value = user
  editForm.value = {
    nombres: user.persona?.nombres || '',
    apellidos: user.persona?.apellidos || '',
    email: user.email || '',
    role: user.role || 'user',
    isActive: !!user.isActive
  }
  showEditModal.value = true
}

const saveUserEdits = async () => {
  if (!selectedUser.value || !editForm.value) return
  try {
    console.log("💾 [UsersManagement] Actualizando usuario en Firebase:", selectedUser.value.id)
    
    await AdminUserService.updateUserRole(
      selectedUser.value.id,
      editForm.value.role,
      'admin' // TODO: obtener ID del admin actual
    )
    
    console.log("✅ [UsersManagement] Usuario actualizado")
    await loadUsers()
  } catch (e) {
    console.error('❌ [UsersManagement] Error guardando usuario:', e)
    alert('Error al actualizar usuario. Revise la consola.')
  } finally {
    closeModals()
  }
}

const deleteUser = (user) => {
  selectedUser.value = user
  showDeleteModal.value = true
}

const confirmDeleteUser = async () => {
  if (!selectedUser.value) return
  try {
    console.log("🗑️ [UsersManagement] Eliminando usuario de Firebase:", selectedUser.value.id)
    
    await AdminUserService.deleteUser(selectedUser.value.id, 'admin')
    
    console.log("✅ [UsersManagement] Usuario eliminado")
    await loadUsers()
  } catch (e) {
    console.error('❌ [UsersManagement] Error eliminando usuario:', e)
    alert('Error al eliminar usuario. Revise la consola.')
  } finally {
    closeModals()
  }
}

const closeModals = () => {
  showViewModal.value = false
  showEditModal.value = false
  showDeleteModal.value = false
  editForm.value = null
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
    'admin': 'Administrador'
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


onMounted(async () => {
  await loadUsers()
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
  display: grid;
  grid-template-columns: minmax(280px, 1fr) repeat(3, minmax(140px, max-content));
  gap: 0.75rem 1rem;
  align-items: center;
}

.search-box {
  position: relative;
  flex: 1 1 320px;
  min-width: 260px;
  max-width: 600px;
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
  flex: 0 0 auto;
  min-width: 160px;
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
  flex: 0 0 auto;
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

.data-grid {
  width: 100%;
  min-width: 980px;
  --grid-cols: minmax(280px, 1.2fr) minmax(280px, 1fr) 120px 150px 120px 120px;
}

.grid-header,
.grid-row {
  display: grid;
  grid-template-columns: var(--grid-cols);
}

.grid-header {
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
}

.grid-header .cell {
  font-weight: 600;
  font-size: 0.875rem;
  padding: 1rem;
}

.grid-body {
  width: 100%;
}

.grid-row {
  border-bottom: 1px solid #f3f4f6;
  align-items: center;
}

.grid-row .cell {
  padding: 1rem;
}

.grid-row:hover {
  background: #f9fafb;
}

.cell.center {
  text-align: center;
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
  min-width: 0; /* allow truncation */
}

.user-name,
.user-id {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  min-width: 0;
}

.contact-item span {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  display: inline-block;
}

.role-badge.user {
  background: #dbeafe;
  color: #1e40af;
}

.role-badge.admin {
  background: #fed7aa;
  color: #c2410c;
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

.status-badge.inactive {
  background: #fee2e2;
  color: #dc2626;
}

.status-dot {
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 50%;
}

/* Ensure role, status and actions columns are centered */
.role-info,
.status-info,
.actions-info {
  text-align: center;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
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
  .users-management {
    padding: 0;
    margin: 0;
  }

  /* Reset all spacing to start from zero */
  .page-header {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
    margin: 0 0 1rem 0;
    padding: 0 0 1rem 0;
    border-bottom: 1px solid #e5e7eb;
  }

  .page-header .header-content {
    margin: 0;
    padding: 0;
  }

  .page-header .header-content h2 {
    margin: 0 0 0.25rem 0;
    font-size: 1.5rem;
  }

  .page-header .header-content p {
    margin: 0;
    font-size: 0.875rem;
  }
  
  .page-header .refresh-btn {
    width: 100%;
    justify-content: center;
    margin: 0;
    padding: 0.75rem;
  }

  /* Filters section - zero spacing */
  .filters-section {
    margin: 0 0 1rem 0;
    padding: 0;
  }
  
  .filter-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5rem;
    align-items: stretch;
    margin: 0;
    padding: 0;
  }

  .search-box {
    max-width: none;
    margin: 0;
    padding: 0;
  }

  .role-filter, .sort-select {
    width: 100%;
    padding: 0.75rem;
    font-size: 0.875rem;
    margin: 0;
  }
  
  .sort-btn {
    width: 100%;
    justify-content: center;
    padding: 0.75rem;
    margin: 0;
  }
  
  /* Stats bar - zero spacing */
  .stats-bar {
    flex-direction: row;
    gap: 0.5rem;
    text-align: center;
    padding: 0.75rem;
    margin: 0 0 1rem 0;
    border-radius: 0.375rem;
  }
  
  /* Table container - zero spacing */
  .users-table {
    margin: 0;
    padding: 0;
    background: transparent;
    box-shadow: none;
    border-radius: 0;
  }

  .table-container {
    margin: 0;
    padding: 0;
    overflow-x: visible;
  }
  
  /* Hide desktop table structure */
  .data-grid {
    display: block;
    margin: 0;
    padding: 0;
  }
  
  .grid-header {
    display: none;
  }
  
  /* Mobile card design - zero base spacing */
  .grid-row {
    display: block;
    background: white;
    border-radius: 0.5rem;
    margin: 0 0 0.75rem 0;
    padding: 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
    overflow: hidden;
  }
  
  .grid-row:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
    transition: all 0.2s ease;
  }
  
  /* User header section - optimized for mobile */
  .grid-row .cell.user {
    background: linear-gradient(135deg, #f8fafc, #f1f5f9);
    padding: 0.875rem;
    border-bottom: 1px solid #e2e8f0;
    margin: 0;
  }
  
  .grid-row .cell.user .user-info {
    flex-direction: row;
    align-items: center;
    gap: 0.875rem;
  }
  
  .grid-row .cell.user .user-avatar {
    width: 44px;
    height: 44px;
    font-size: 0.95rem;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
  }
  
  .grid-row .cell.user .user-details {
    flex: 1;
  }
  
  .grid-row .cell.user .user-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 0.125rem 0;
    line-height: 1.25;
  }
  
  .grid-row .cell.user .user-id {
    font-size: 0.75rem;
    color: #64748b;
    margin: 0;
  }
  
  /* Other cells - tight spacing */
  .grid-row .cell:not(.user) {
    padding: 0.625rem 0.875rem;
    border-bottom: 1px solid #f1f5f9;
    margin: 0;
  }
  
  .grid-row .cell:last-child {
    border-bottom: none;
    padding-bottom: 0.875rem;
  }
  
  .grid-row .cell::before {
    content: attr(data-label);
    display: block;
    font-weight: 600;
    font-size: 0.7rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.025em;
    margin: 0 0 0.375rem 0;
  }
  
  .cell.user::before { content: none; }
  .cell.contact::before { content: "Información de Contacto"; }
  .cell.role::before { content: "Rol"; }
  .cell.date::before { content: "Fecha de Registro"; }
  .cell.status::before { content: "Estado"; }
  .cell.actions::before { content: "Acciones"; }
  
  /* Contact info styling - compact */
  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0;
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.825rem;
    padding: 0.375rem 0.5rem;
    background: #f8fafc;
    border-radius: 0.25rem;
    margin: 0;
  }
  
  .contact-item svg {
    color: #64748b;
    flex-shrink: 0;
    width: 14px;
    height: 14px;
  }
  
  /* Role and status badges - compact */
  .role-badge, .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.625rem;
    border-radius: 0.375rem;
    font-size: 0.8rem;
    font-weight: 500;
    margin: 0;
  }
  
  /* Action buttons - compact layout */
  .action-buttons {
    display: flex;
    justify-content: flex-start;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
  }
  
  .action-btn {
    width: auto;
    height: auto;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.8rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.375rem;
    margin: 0;
  }
  
  .action-btn svg {
    width: 14px;
    height: 14px;
  }
  
  /* Date formatting - compact */
  .cell.date {
    font-size: 0.8rem;
    color: #374151;
    margin: 0;
  }

  /* Loading and error states - adjust for mobile */
  .loading-state, .error-state {
    text-align: center;
    padding: 2rem 1rem;
    margin: 0;
    color: #6b7280;
  }

  .empty-state {
    text-align: center;
    padding: 2rem 1rem;
    margin: 0;
    color: #6b7280;
  }
}

@media (max-width: 480px) {
  .stats-bar {
    flex-direction: column;
  }
  
  .stat-item {
    text-align: center;
    padding: 0.75rem;
  }
  
  .grid-row {
    padding: 0.75rem;
    margin-bottom: 0.75rem;
  }
  
  .user-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .action-buttons {
    flex-wrap: wrap;
  }
}
/* Modals */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(17, 24, 39, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
}

.modal {
  width: 100%;
  max-width: 560px;
  background: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f3f4f6;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.modal-close {
  border: none;
  background: transparent;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1;
}

.modal-body {
  padding: 1rem 1.25rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-top: 1px solid #f3f4f6;
}

.btn {
  padding: 0.5rem 0.875rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  cursor: pointer;
}

.btn.primary {
  background: #3b82f6;
  color: #fff;
  border-color: #3b82f6;
}

.btn.danger {
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;
}

.btn.ghost {
  background: #fff;
}

.user-summary {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.avatar-large {
  width: 56px;
  height: 56px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  font-weight: 700;
}

.user-summary .info {
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 0.75rem;
  row-gap: 0.375rem;
}

.user-summary .row .label {
  color: #6b7280;
  font-size: 0.875rem;
}

.user-summary .row .value {
  color: #111827;
  font-weight: 500;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  margin-bottom: 0.75rem;
}

.form-row.switch {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.form-row label {
  font-size: 0.875rem;
  color: #374151;
}

.form-row input,
.form-row select {
  padding: 0.625rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

/* Margins and spacing adjustments for User Details modal */
.user-details-modal .modal-header {
  padding: 1.5rem 2rem;
  margin: 0;
}

.user-details-modal .modal-body {
  padding: 2rem;
  margin: 0;
}

.user-details-modal .user-summary {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  margin: 0 0 1rem 0;
}

.user-details-modal .avatar-large {
  width: 64px;
  height: 64px;
  margin: 0;
  flex-shrink: 0;
}

.user-details-modal .user-summary .info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
  flex: 1;
}

.user-details-modal .user-summary .row {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin: 0 0 0.5rem 0;
  padding: 0;
}

.user-details-modal .user-summary .row:last-child {
  margin-bottom: 0;
}

.user-details-modal .user-summary .row .label {
  min-width: 120px;
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

.user-details-modal .user-summary .row .value {
  margin: 0;
  color: #111827;
  font-weight: 500;
  word-break: break-word;
  flex: 1;
}

.user-details-modal .modal-footer {
  padding: 1.5rem 2rem;
  margin: 0;
}

@media (max-width: 480px) {
  .modal {
    max-width: 96vw;
    margin: 1rem;
  }
  
  .user-details-modal .modal-header {
    padding: 1.25rem 1.5rem;
  }
  
  .user-details-modal .modal-body {
    padding: 1.5rem;
  }
  
  .user-details-modal .modal-footer {
    padding: 1.25rem 1.5rem;
  }
  
  .user-details-modal .user-summary {
    flex-direction: column;
    gap: 1rem;
    margin: 0 0 1rem 0;
  }
  
  .user-details-modal .user-summary .row .label {
    min-width: 100px;
  }
  
  .user-details-modal .user-summary .row {
    margin: 0 0 0.75rem 0;
  }
}
</style>
