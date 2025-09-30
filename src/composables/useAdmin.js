import { ref, computed, watch } from 'vue'
import { useAuth } from './useAuth'
import { doc, getDoc, collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore'
import { db } from '@/firebase'

export function useAdmin() {
  const { user } = useAuth()
  const userRole = ref(null)
  const loading = ref(false)

  // Obtener rol del usuario desde Firestore
  const getUserRole = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId))
      if (userDoc.exists()) {
        return userDoc.data().role || 'user'
      }
      return 'user'
    } catch (error) {
      console.error('Error al obtener rol del usuario:', error)
      return 'user'
    }
  }

  // Obtener datos completos del usuario desde Firestore
  const getUserData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId))
      if (userDoc.exists()) {
        return userDoc.data()
      }
      return null
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error)
      return null
    }
  }

  // Obtener todos los usuarios (solo para admins)
  const getAllUsers = async () => {
    try {
      loading.value = true
      const usersQuery = query(
        collection(db, 'users'),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(usersQuery)
      const users = []
      
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() })
      })
      
      return users
    } catch (error) {
      console.error('Error al obtener usuarios:', error)
      return []
    } finally {
      loading.value = false
    }
  }

  // Obtener estadísticas básicas
  const getBasicStats = async () => {
    try {
      const usersQuery = query(collection(db, 'users'))
      const usersSnapshot = await getDocs(usersQuery)
      
      const adminQuery = query(
        collection(db, 'users'),
        where('role', '==', 'admin')
      )
      const adminSnapshot = await getDocs(adminQuery)
      
      const superAdminQuery = query(
        collection(db, 'users'),
        where('role', '==', 'super_admin')
      )
      const superAdminSnapshot = await getDocs(superAdminQuery)
      
      return {
        totalUsers: usersSnapshot.size,
        totalAdmins: adminSnapshot.size,
        totalSuperAdmins: superAdminSnapshot.size,
        regularUsers: usersSnapshot.size - adminSnapshot.size - superAdminSnapshot.size
      }
    } catch (error) {
      console.error('Error al obtener estadísticas:', error)
      return {
        totalUsers: 0,
        totalAdmins: 0,
        totalSuperAdmins: 0,
        regularUsers: 0
      }
    }
  }

  // Actualizar el rol cuando cambie el usuario
  watch(user, async (newUser) => {
    if (newUser) {
      userRole.value = await getUserRole(newUser.uid)
    } else {
      userRole.value = null
    }
  }, { immediate: true })

  // Computed properties para verificar roles
  const isAdmin = computed(() => {
    return userRole.value === 'admin' || userRole.value === 'super_admin'
  })

  const isSuperAdmin = computed(() => {
    return userRole.value === 'super_admin'
  })

  const isUser = computed(() => {
    return userRole.value === 'user' || userRole.value === null
  })

  // Verificar si el usuario actual tiene permisos de admin
  const checkAdminPermissions = async () => {
    if (!user.value) return false
    
    try {
      const role = await getUserRole(user.value.uid)
      return role === 'admin' || role === 'super_admin'
    } catch (error) {
      console.error('Error al verificar permisos de admin:', error)
      return false
    }
  }

  // Verificar acceso a funciones específicas
  const canManageUsers = computed(() => {
    return isAdmin.value || isSuperAdmin.value
  })

  const canDeleteUsers = computed(() => {
    return isSuperAdmin.value
  })

  const canViewAnalytics = computed(() => {
    return isAdmin.value || isSuperAdmin.value
  })

  const canEditUserRoles = computed(() => {
    return isSuperAdmin.value
  })

  const canManageSettings = computed(() => {
    return isAdmin.value || isSuperAdmin.value
  })

  return {
    // Estado
    userRole,
    loading,
    
    // Computed properties
    isAdmin,
    isSuperAdmin,
    isUser,
    canManageUsers,
    canDeleteUsers,
    canViewAnalytics,
    canEditUserRoles,
    canManageSettings,
    
    // Métodos
    getUserRole,
    getUserData,
    getAllUsers,
    getBasicStats,
    checkAdminPermissions
  }
}
