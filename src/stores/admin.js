import { ref, computed } from 'vue'
import { useAdmin } from '@/composables/useAdmin'

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
      adminState.value.users = await getAllUsers()
    } catch (err) {
      adminState.value.error = err.message || 'Error al cargar usuarios'
      console.error('Error fetching users:', err)
    } finally {
      adminState.value.loading = false
    }
  }
  
  const fetchStats = async () => {
    try {
      adminState.value.stats = await getBasicStats()
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
  }
}
