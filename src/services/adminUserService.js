import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where, 
  limit,
  startAfter,
  writeBatch,
  setDoc
} from 'firebase/firestore'
import { deleteUser as deleteAuthUser } from 'firebase/auth'
import { db } from '@/firebase'

/**
 * Servicio para gestión avanzada de usuarios desde el panel de administración
 */
export class AdminUserService {
  
  /**
   * Obtiene usuarios con paginación
   */
  static async getUsersPaginated(lastDoc = null, pageSize = 20, filters = {}) {
    try {
      let userQuery = query(
        collection(db, 'users'),
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      )

      // Agregar filtros
      if (filters.role && filters.role !== 'all') {
        userQuery = query(
          collection(db, 'users'),
          where('role', '==', filters.role),
          orderBy('createdAt', 'desc'),
          limit(pageSize)
        )
      }

      // Paginación
      if (lastDoc) {
        userQuery = query(userQuery, startAfter(lastDoc))
      }

      const snapshot = await getDocs(userQuery)
      const users = []
      
      snapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() })
      })

      return {
        users,
        lastDoc: snapshot.docs[snapshot.docs.length - 1],
        hasMore: snapshot.docs.length === pageSize
      }
    } catch (error) {
      console.error('Error obteniendo usuarios paginados:', error)
      throw error
    }
  }

  /**
   * Obtiene un usuario específico por ID
   */
  static async getUserById(userId) {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId))
      
      if (userDoc.exists()) {
        return { id: userDoc.id, ...userDoc.data() }
      }
      
      return null
    } catch (error) {
      console.error('Error obteniendo usuario por ID:', error)
      throw error
    }
  }

  /**
   * Actualiza el rol de un usuario
   */
  static async updateUserRole(userId, newRole, adminUserId) {
    try {
      const userRef = doc(db, 'users', userId)
      
      await updateDoc(userRef, {
        role: newRole,
        updatedAt: new Date(),
        updatedBy: adminUserId
      })

      // Registrar el cambio en el historial
      await this.logRoleChange(userId, newRole, adminUserId)
      
      return true
    } catch (error) {
      console.error('Error actualizando rol de usuario:', error)
      throw error
    }
  }

  /**
   * Actualiza la información personal de un usuario
   */
  static async updateUserInfo(userId, userInfo, adminUserId) {
    try {
      const userRef = doc(db, 'users', userId)
      
      await updateDoc(userRef, {
        ...userInfo,
        updatedAt: new Date(),
        updatedBy: adminUserId
      })
      
      return true
    } catch (error) {
      console.error('Error actualizando información de usuario:', error)
      throw error
    }
  }

  /**
   * Desactiva/activa un usuario (soft delete)
   */
  static async toggleUserStatus(userId, isActive, adminUserId) {
    try {
      const userRef = doc(db, 'users', userId)
      
      await updateDoc(userRef, {
        isActive: isActive,
        updatedAt: new Date(),
        updatedBy: adminUserId,
        ...(isActive ? {} : { deactivatedAt: new Date() })
      })
      
      return true
    } catch (error) {
      console.error('Error cambiando estado de usuario:', error)
      throw error
    }
  }

  /**
   * Elimina un usuario completamente (hard delete)
   * NOTA: Esta función requiere permisos de super admin
   */
  static async deleteUser(userId, adminUserId) {
    try {
      const batch = writeBatch(db)
      
      // Eliminar documento del usuario
      const userRef = doc(db, 'users', userId)
      batch.delete(userRef)
      
      // Agregar registro de eliminación en logs
      const logRef = doc(collection(db, 'admin_logs'))
      batch.set(logRef, {
        action: 'delete_user',
        targetUserId: userId,
        adminUserId: adminUserId,
        timestamp: new Date(),
        type: 'critical'
      })
      
      await batch.commit()
      
      return true
    } catch (error) {
      console.error('Error eliminando usuario:', error)
      throw error
    }
  }

  /**
   * Busca usuarios por email, nombre o teléfono
   */
  static async searchUsers(searchTerm, maxResults = 50) {
    try {
      // Primero buscar por email (exacto)
      const emailQuery = query(
        collection(db, 'users'),
        where('email', '==', searchTerm.toLowerCase()),
        limit(5)
      )
      
      const emailResults = await getDocs(emailQuery)
      const users = []
      
      emailResults.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() })
      })
      
      // Si no hay resultados por email exacto, buscar por otros campos
      if (users.length === 0) {
        // Buscar por email que contenga el término (limitado por Firestore)
        const partialEmailQuery = query(
          collection(db, 'users'),
          where('email', '>=', searchTerm.toLowerCase()),
          where('email', '<', searchTerm.toLowerCase() + '\uf8ff'),
          limit(maxResults)
        )
        
        const partialResults = await getDocs(partialEmailQuery)
        partialResults.forEach(doc => {
          users.push({ id: doc.id, ...doc.data() })
        })
      }
      
      return users.filter((user, index, self) => 
        index === self.findIndex(u => u.id === user.id)
      )
    } catch (error) {
      console.error('Error buscando usuarios:', error)
      throw error
    }
  }

  /**
   * Obtiene estadísticas generales de usuarios
   */
  static async getUserStats() {
    try {
      const stats = {
        total: 0,
        users: 0,
        admins: 0,
        superAdmins: 0,
        active: 0,
        inactive: 0,
        recentRegistrations: 0 // últimos 7 días
      }
      
      // Obtener todos los usuarios
      const allUsersQuery = query(collection(db, 'users'))
      const allUsersSnapshot = await getDocs(allUsersQuery)
      
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      
      allUsersSnapshot.forEach(doc => {
        const userData = doc.data()
        stats.total++
        
        // Contar por roles
        switch (userData.role) {
          case 'admin':
            stats.admins++
            break
          case 'super_admin':
            stats.superAdmins++
            break
          default:
            stats.users++
        }
        
        // Contar activos/inactivos
        if (userData.isActive !== false) {
          stats.active++
        } else {
          stats.inactive++
        }
        
        // Contar registros recientes
        const createdAt = userData.createdAt?.toDate() || new Date(userData.createdAt)
        if (createdAt > oneWeekAgo) {
          stats.recentRegistrations++
        }
      })
      
      return stats
    } catch (error) {
      console.error('Error obteniendo estadísticas de usuarios:', error)
      throw error
    }
  }

  /**
   * Registra un cambio de rol en el historial
   */
  static async logRoleChange(userId, newRole, adminUserId) {
    try {
      const logRef = doc(collection(db, 'admin_logs'))
      
      await setDoc(logRef, {
        action: 'role_change',
        targetUserId: userId,
        adminUserId: adminUserId,
        newRole: newRole,
        timestamp: new Date(),
        type: 'role_management'
      })
    } catch (error) {
      console.error('Error registrando cambio de rol:', error)
      // No lanzar error para no interrumpir el flujo principal
    }
  }

  /**
   * Obtiene el historial de cambios de un usuario
   */
  static async getUserHistory(userId) {
    try {
      const historyQuery = query(
        collection(db, 'admin_logs'),
        where('targetUserId', '==', userId),
        orderBy('timestamp', 'desc'),
        limit(50)
      )
      
      const snapshot = await getDocs(historyQuery)
      const history = []
      
      snapshot.forEach(doc => {
        history.push({ id: doc.id, ...doc.data() })
      })
      
      return history
    } catch (error) {
      console.error('Error obteniendo historial de usuario:', error)
      throw error
    }
  }

  /**
   * Exporta datos de usuarios a CSV
   */
  static async exportUsersToCSV(filters = {}) {
    try {
      let userQuery = collection(db, 'users')
      
      if (filters.role && filters.role !== 'all') {
        userQuery = query(
          collection(db, 'users'),
          where('role', '==', filters.role)
        )
      }
      
      const snapshot = await getDocs(userQuery)
      const users = []
      
      snapshot.forEach(doc => {
        const userData = doc.data()
        users.push({
          id: doc.id,
          email: userData.email,
          nombres: userData.persona?.nombres || '',
          apellidos: userData.persona?.apellidos || '',
          telefono: userData.telefono || '',
          role: userData.role,
          createdAt: userData.createdAt?.toDate()?.toISOString() || '',
          isActive: userData.isActive !== false ? 'Activo' : 'Inactivo'
        })
      })
      
      return users
    } catch (error) {
      console.error('Error exportando usuarios:', error)
      throw error
    }
  }

  /**
   * Valida permisos antes de realizar acciones críticas
   */
  static async validateAdminPermissions(adminUserId, targetUserId, action) {
    try {
      const adminDoc = await getDoc(doc(db, 'users', adminUserId))
      const targetDoc = await getDoc(doc(db, 'users', targetUserId))
      
      if (!adminDoc.exists() || !targetDoc.exists()) {
        throw new Error('Usuario no encontrado')
      }
      
      const adminRole = adminDoc.data().role
      const targetRole = targetDoc.data().role
      
      // Super admin puede hacer cualquier cosa
      if (adminRole === 'super_admin') {
        return true
      }
      
      // Admin regular no puede modificar otros admins
      if (adminRole === 'admin' && ['admin', 'super_admin'].includes(targetRole)) {
        throw new Error('No tienes permisos para modificar este usuario')
      }
      
      // Validaciones específicas por acción
      switch (action) {
        case 'delete':
          if (adminRole !== 'super_admin') {
            throw new Error('Solo super administradores pueden eliminar usuarios')
          }
          break
        case 'change_role':
          if (adminRole !== 'super_admin' && targetRole !== 'user') {
            throw new Error('No puedes cambiar el rol de este usuario')
          }
          break
      }
      
      return true
    } catch (error) {
      console.error('Error validando permisos:', error)
      throw error
    }
  }
}

export default AdminUserService
