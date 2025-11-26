import { ref, computed, watch } from 'vue'
import { useAuth } from './useAuth'
import { doc, getDoc, collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore'
import { db } from '@/firebase'
import { placeholderUsers, getPlaceholderStats, getRecentActivity as getRecentActivityData } from '@/data/placeholderUsers'

export function useAdmin() {
  const { user } = useAuth()
  const userRole = ref(null)
  const loading = ref(false)

  // Obtener rol del usuario desde Firestore
  const getUserRole = async (userId) => {
    try {
      // Preferir valor guardado en localStorage para mantener sesión de rol rápida
      try {
        const cachedRole = localStorage.getItem(`vr_role_${userId}`)
        if (cachedRole) return cachedRole
      } catch (err) {
        // ignore localStorage errors
      }
      // Si estamos offline, usar fallback local (localStorage / placeholderUsers)
      if (!navigator.onLine) {
        try {
          const raw = localStorage.getItem('vr_users')
          if (raw) {
            const parsed = JSON.parse(raw)
            const found = parsed.find(u => u.id === userId)
            if (found && found.role) return found.role
          }
        } catch (err) {
          console.warn('No se pudo leer vr_users desde localStorage en getUserRole:', err)
        }

        // Buscar en placeholderUsers
        const local = placeholderUsers.find(u => u.id === userId)
        if (local && local.role) return local.role

        // Fallback razonable en DEV: 'user'
        return 'user'
      }
      // Nota: en modo desarrollo (import.meta.env.DEV) permitimos leer Firestore cuando estemos online
      const userDoc = await getDoc(doc(db, 'users', userId))
      if (userDoc.exists()) {
        const role = userDoc.data().role || 'user'
        // Persistir en localStorage para acelerar futuras comprobaciones de sesión
        try { localStorage.setItem(`vr_role_${userId}`, role) } catch(e) {}
        return role
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
      // En desarrollo, devolver datos de ejemplo
      if (import.meta.env.DEV || !navigator.onLine) {
        // Primero intentar leer desde localStorage (persistencia en DEV)
        try {
          const raw = localStorage.getItem('vr_users')
          if (raw) {
            const parsed = JSON.parse(raw)
            const found = parsed.find(u => u.id === userId)
            if (found) {
              // Reconstruir fechas
              return {
                ...found,
                createdAt: found.createdAt ? new Date(found.createdAt) : undefined,
                lastVisit: found.lastVisit ? new Date(found.lastVisit) : undefined
              }
            }
          }
        } catch (err) {
          console.warn('No se pudo leer vr_users desde localStorage en getUserData:', err)
        }
        const local = placeholderUsers.find(u => u.id === userId)
        return local || null
      }
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
      
      // En modo desarrollo, usar datos placeholder
      if (import.meta.env.DEV || !navigator.onLine) {
        // Primero revisar si hay usuarios guardados en localStorage (persistencia en DEV)
        try {
          const raw = localStorage.getItem('vr_users')
          if (raw) {
            const parsed = JSON.parse(raw)
            // Reconstruir fechas si vienen como strings
            const users = parsed.map(u => ({
              ...u,
              createdAt: u.createdAt ? new Date(u.createdAt) : undefined,
              lastVisit: u.lastVisit ? new Date(u.lastVisit) : undefined,
              persona: { ...(u.persona || {}) }
            }))
            // Simular delay
            await new Promise(resolve => setTimeout(resolve, 200))
            return users.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          }
        } catch (err) {
          console.warn('No se pudo leer vr_users desde localStorage:', err)
        }

        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 500))
        return [...placeholderUsers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      }
      
      // En producción, usar Firebase
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
      // Fallback a datos placeholder si Firebase falla
      return [...placeholderUsers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } finally {
      loading.value = false
    }
  }

  // Obtener estadísticas básicas
  const getBasicStats = async () => {
    try {
      // En modo desarrollo, usar datos placeholder
      if (import.meta.env.DEV || !navigator.onLine) {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 300))
        return getPlaceholderStats()
      }
      
      // En producción, usar Firebase
      const usersQuery = query(collection(db, 'users'))
      const usersSnapshot = await getDocs(usersQuery)
      
      const adminQuery = query(
        collection(db, 'users'),
        where('role', '==', 'admin')
      )
      const adminSnapshot = await getDocs(adminQuery)
      
      // Rol super_admin no existe en el sistema
      const superAdmins = 0
      
      return {
        totalUsers: usersSnapshot.size,
        totalAdmins: adminSnapshot.size,
        totalSuperAdmins: superAdmins,
        regularUsers: usersSnapshot.size - adminSnapshot.size
      }
    } catch (error) {
      console.error('Error al obtener estadísticas:', error)
      // Fallback a datos placeholder si Firebase falla
      const stats = getPlaceholderStats()
      // Asegurar que no haya superAdmins
      return { ...stats, totalSuperAdmins: 0, regularUsers: stats.totalUsers - stats.totalAdmins }
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
    return userRole.value === 'admin'
  })

  const isSuperAdmin = computed(() => {
    // El rol super_admin fue eliminado del sistema
    return false
  })

  const isUser = computed(() => {
    return userRole.value === 'user' || userRole.value === null
  })

  // Verificar si el usuario actual tiene permisos de admin
  const checkAdminPermissions = async () => {
    if (!user.value) return false
    
    try {
      const role = await getUserRole(user.value.uid)
      return role === 'admin'
    } catch (error) {
      console.error('Error al verificar permisos de admin:', error)
      return false
    }
  }

  // Verificar acceso a funciones específicas
  const canManageUsers = computed(() => {
    return isAdmin.value
  })

  const canDeleteUsers = computed(() => {
    // Si deseas permitir eliminación solo a admins, dejar true; si no, ajustar aquí
    return isAdmin.value
  })

  const canViewAnalytics = computed(() => {
    return isAdmin.value
  })

  const canEditUserRoles = computed(() => {
    // Ajusta según tus reglas; por ahora, admins pueden editar roles
    return isAdmin.value
  })

  const canManageSettings = computed(() => {
    return isAdmin.value
  })
  
  // Obtener actividad reciente
  const getRecentActivity = async () => {
    try {
      // En modo desarrollo, usar datos placeholder
      if (import.meta.env.DEV || !navigator.onLine) {
        await new Promise(resolve => setTimeout(resolve, 200))
        return getRecentActivityData()
      }
      
      // En producción, implementar lógica de Firebase
      // Por ahora devolver datos placeholder como fallback
      return getRecentActivityData()
    } catch (error) {
      console.error('Error al obtener actividad reciente:', error)
      return getRecentActivityData()
    }
  }

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
    checkAdminPermissions,
    getRecentActivity
  }
}
