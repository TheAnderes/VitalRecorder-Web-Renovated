import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  Timestamp 
} from 'firebase/firestore'
import { db } from '@/firebase'

export const userService = {
  // Obtener todos los usuarios
  async getAllUsers() {
    try {
      const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('Error al obtener usuarios:', error)
      throw error
    }
  },

  // Obtener usuario por ID
  async getUserById(userId) {
    try {
      const docRef = doc(db, 'users', userId)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        }
      }
      return null
    } catch (error) {
      console.error('Error al obtener usuario:', error)
      throw error
    }
  },

  // Buscar usuarios por email o nombre
  async searchUsers(searchTerm) {
    try {
      const usersRef = collection(db, 'users')
      const snapshot = await getDocs(usersRef)
      
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      return users.filter(user => 
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.persona?.nombres?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.persona?.apellidos?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    } catch (error) {
      console.error('Error al buscar usuarios:', error)
      throw error
    }
  },

  // Crear nuevo usuario
  async createUser(userData) {
    try {
      const newUser = {
        ...userData,
        createdAt: Timestamp.now(),
        role: userData.role || 'user'
      }

      const docRef = await addDoc(collection(db, 'users'), newUser)
      return {
        id: docRef.id,
        ...newUser
      }
    } catch (error) {
      console.error('Error al crear usuario:', error)
      throw error
    }
  },

  // Actualizar usuario
  async updateUser(userId, userData) {
    try {
      const docRef = doc(db, 'users', userId)
      const clean = (obj) => {
        if (obj === null || obj === undefined) return obj
        if (Array.isArray(obj)) return obj.map(v => (v && typeof v === 'object') ? clean(v) : v).filter(v => v !== undefined)
        if (typeof obj === 'object') {
          const out = {}
          Object.keys(obj).forEach(k => {
            const val = obj[k]
            if (val === undefined) return
            if (val && typeof val === 'object') {
              const c = clean(val)
              if (c !== undefined && !(typeof c === 'object' && Object.keys(c).length === 0 && !Array.isArray(c))) {
                out[k] = c
              }
            } else {
              out[k] = val
            }
          })
          return out
        }
        return obj
      }

      const sanitized = clean(userData)
      await updateDoc(docRef, sanitized)
      
      // Devolver usuario actualizado
      return await this.getUserById(userId)
    } catch (error) {
      console.error('Error al actualizar usuario:', error)
      throw error
    }
  },

  // Eliminar usuario
  async deleteUser(userId) {
    try {
      await deleteDoc(doc(db, 'users', userId))
      return true
    } catch (error) {
      console.error('Error al eliminar usuario:', error)
      throw error
    }
  },

  // Obtener estadísticas de usuarios
  async getUserStats() {
    try {
      const snapshot = await getDocs(collection(db, 'users'))
      const users = snapshot.docs.map(doc => doc.data())

      return {
        total: users.length,
        admins: users.filter(user => user.role === 'admin' || user.role === 'super_admin').length,
        regularUsers: users.filter(user => user.role === 'user').length,
        recentUsers: users.filter(user => {
          const createdAt = user.createdAt?.toDate?.() || new Date(user.createdAt)
          const thirtyDaysAgo = new Date()
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
          return createdAt >= thirtyDaysAgo
        }).length
      }
    } catch (error) {
      console.error('Error al obtener estadísticas:', error)
      throw error
    }
  }
}
