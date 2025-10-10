import { ref, computed } from 'vue'
import { useAdmin } from '@/composables/useAdmin'
import { placeholderUsers } from '@/data/placeholderUsers'

// Estado global del admin (simulando Pinia con composables)
const adminState = ref({
  users: [],
  stats: {
    totalUsers: 0,
    totalAdmins: 0,
    totalSuperAdmins: 0,
    regularUsers: 0
  },
  loading: false,
  error: null,
  selectedUser: null,
  filters: {
    role: 'all',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  }
})

export function useAdminStore() {
  const { getAllUsers, getBasicStats, getUserData } = useAdmin()
  
  // Getters
  const users = computed(() => adminState.value.users)
  const stats = computed(() => adminState.value.stats)
  const loading = computed(() => adminState.value.loading)
  const error = computed(() => adminState.value.error)
  const selectedUser = computed(() => adminState.value.selectedUser)
  const filters = computed(() => adminState.value.filters)
  
  // Usuarios filtrados
  const filteredUsers = computed(() => {
    let filtered = [...adminState.value.users]
    
    // Filtro por rol
    if (adminState.value.filters.role !== 'all') {
      filtered = filtered.filter(user => user.role === adminState.value.filters.role)
    }
    
    // Filtro por búsqueda
    if (adminState.value.filters.search) {
      const search = adminState.value.filters.search.toLowerCase()
      filtered = filtered.filter(user => 
        user.email?.toLowerCase().includes(search) ||
        user.persona?.nombres?.toLowerCase().includes(search) ||
        user.persona?.apellidos?.toLowerCase().includes(search) ||
        user.telefono?.includes(search)
      )
    }

    // Filtro por DNI
    if (adminState.value.filters.dni) {
      const dniQuery = adminState.value.filters.dni.toString()
      filtered = filtered.filter(u => u.dni && u.dni.includes(dniQuery))
    }

    // Filtro por estado médico
    if (adminState.value.filters.medicalStatus && adminState.value.filters.medicalStatus !== 'all') {
      filtered = filtered.filter(u => (u.medicalStatus || 'Activo') === adminState.value.filters.medicalStatus)
    }
    
    // Ordenar
    filtered.sort((a, b) => {
      const key = adminState.value.filters.sortBy
      let aValue = a[key]
      let bValue = b[key]
      
      // Manejar casos especiales
      if (key === 'createdAt') {
        aValue = new Date(aValue?.toDate?.() || aValue)
        bValue = new Date(bValue?.toDate?.() || bValue)
      }
      
      if (key === 'nombres') {
        aValue = a.persona?.nombres || ''
        bValue = b.persona?.nombres || ''
      }
      
      if (adminState.value.filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
    
    return filtered
  })
  
  // Actions
  const fetchUsers = async () => {
    try {
      adminState.value.loading = true
      adminState.value.error = null
      const result = await getAllUsers()
      if (Array.isArray(result) && result.length > 0) {
        adminState.value.users = result
        // Persistir en localStorage en modo DEV para mantener cambios entre recargas
        try { if (import.meta.env.DEV || !navigator.onLine) localStorage.setItem('vr_users', JSON.stringify(adminState.value.users)) } catch(e) {}
      } else {
        // Fallback garantizado a placeholders si no hay datos
        adminState.value.users = [...placeholderUsers]
        try { if (import.meta.env.DEV || !navigator.onLine) localStorage.setItem('vr_users', JSON.stringify(adminState.value.users)) } catch(e) {}
      }
    } catch (err) {
      // Fallback a placeholders en caso de error
      adminState.value.users = [...placeholderUsers]
      try { if (import.meta.env.DEV || !navigator.onLine) localStorage.setItem('vr_users', JSON.stringify(adminState.value.users)) } catch(e) {}
      adminState.value.error = err?.message || 'Error al cargar usuarios, mostrando datos de ejemplo'
      console.error('Error fetching users:', err)
    } finally {
      adminState.value.loading = false
    }
  }
  
  const fetchStats = async () => {
    try {
      // In DEV or offline mode we should compute stats from the current local users
      if (import.meta.env.DEV || !navigator.onLine) {
        const users = adminState.value.users || []
        const totalUsers = users.length
        const totalAdmins = users.filter(u => u.role === 'admin').length
        const criticalPatients = users.filter(u => (u.medicalStatus || (u.isActive ? 'Activo' : 'Inactivo')) === 'Crítico').length
        const activeUsers = users.filter(u => u.isActive).length
        adminState.value.stats = {
          totalUsers,
          totalAdmins,
          totalSuperAdmins: 0,
          regularUsers: totalUsers - totalAdmins,
          activeUsers,
          criticalPatients
        }
      } else {
        adminState.value.stats = await getBasicStats()
      }
    } catch (err) {
      console.error('Error fetching stats:', err)
    }
  }
  
  const selectUser = async (userId) => {
    try {
      adminState.value.loading = true
      const userData = await getUserData(userId)
      adminState.value.selectedUser = { id: userId, ...userData }
    } catch (err) {
      adminState.value.error = err.message || 'Error al cargar usuario'
      console.error('Error selecting user:', err)
    } finally {
      adminState.value.loading = false
    }
  }
  
  const clearSelectedUser = () => {
    adminState.value.selectedUser = null
  }

  // CRUD local (used for UI and placeholder data)
  const addUser = async (userData) => {
    const id = `user_${String(Math.floor(Math.random() * 100000)).padStart(3, '0')}`
    const now = new Date()
    const newUser = {
      id,
      createdAt: now,
      ...userData
    }
    adminState.value.users = [newUser, ...adminState.value.users]
    // Persistir cambios en DEV/local
    try { if (import.meta.env.DEV || !navigator.onLine) localStorage.setItem('vr_users', JSON.stringify(adminState.value.users)) } catch(e) {}
    // Recalculate stats
    await fetchStats()
    return newUser
  }

  const updateUser = async (userId, updates) => {
    adminState.value.users = adminState.value.users.map(u => u.id === userId ? { ...u, ...updates } : u)
    try { if (import.meta.env.DEV || !navigator.onLine) localStorage.setItem('vr_users', JSON.stringify(adminState.value.users)) } catch(e) {}
    await fetchStats()
  }

  const deleteUser = async (userId) => {
    adminState.value.users = adminState.value.users.filter(u => u.id !== userId)
    try { if (import.meta.env.DEV || !navigator.onLine) localStorage.setItem('vr_users', JSON.stringify(adminState.value.users)) } catch(e) {}
    await fetchStats()
  }
  
  const updateFilters = (newFilters) => {
    adminState.value.filters = { ...adminState.value.filters, ...newFilters }
  }
  
  const clearError = () => {
    adminState.value.error = null
  }
  
  // Refrescar datos
  const refreshData = async () => {
    await Promise.all([
      fetchUsers(),
      fetchStats()
    ])
  }
  
  return {
    // State
    users,
    stats,
    loading,
    error,
    selectedUser,
    filters,
    filteredUsers,
    
    // Actions
    fetchUsers,
    fetchStats,
    selectUser,
    clearSelectedUser,
    updateFilters,
    clearError,
    refreshData
    ,
    // CRUD helpers
    addUser,
    updateUser,
    deleteUser
  }
}
