import { ref, onMounted } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'

// Estado global de autenticación
const user = ref(null)
const isLoading = ref(true)

export function useAuth() {
  // Inicializar el listener de autenticación solo una vez
  const initAuth = () => {
    return onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
      isLoading.value = false
    })
  }

  // Computed properties
  const isAuthenticated = () => {
    return !!user.value
  }

  const getUserData = () => {
    if (!user.value) return null
    
    return {
      uid: user.value.uid,
      email: user.value.email,
      displayName: user.value.displayName,
      photoURL: user.value.photoURL,
      emailVerified: user.value.emailVerified
    }
  }

  const getUserName = () => {
    if (!user.value) return ''
    return user.value.displayName || user.value.email?.split('@')[0] || 'Usuario'
  }

  const getUserInitial = () => {
    if (!user.value) return 'U'
    const name = getUserName()
    return name.charAt(0).toUpperCase()
  }

  return {
    // Estado
    user: user, // Reactive reference
    isLoading,
    
    // Métodos
    initAuth,
    isAuthenticated,
    getUserData,
    getUserName,
    getUserInitial
  }
}
