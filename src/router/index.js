import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useAdmin } from '@/composables/useAdmin'
import { clientRoutes } from './clientRoutes'
import { adminRoutes } from './adminRoutes'
import { useLoading } from '@/stores/loading'

// Combinar todas las rutas
const routes = [
  ...clientRoutes,
  ...adminRoutes,
  // Ruta catch-all para 404
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  // Mostrar overlay de carga en navegación
  try {
    const loading = useLoading()
    loading.show()
  } catch (e) {
    // ignore
  }
  const { user, isLoading } = useAuth()
  const { getUserRole, checkAdminPermissions } = useAdmin()
  
  // Esperar a que termine de cargar la autenticación
  if (isLoading.value) {
    // Esperar un poco más para que termine de cargar
    await new Promise(resolve => {
      const checkLoading = () => {
        if (!isLoading.value) {
          resolve()
        } else {
          setTimeout(checkLoading, 100)
        }
      }
      checkLoading()
    })
  }

  // Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth && !user.value) {
    next({ name: 'auth', query: { redirect: to.fullPath } })
    return
  }

  // TEMPORAL: Deshabilitar verificación de admin para testing
  if (to.meta.requiredRole && user.value) {
    const userRole = await getUserRole(user.value.uid)
    const requiredRoles = Array.isArray(to.meta.requiredRole) 
      ? to.meta.requiredRole 
      : [to.meta.requiredRole]
    
    // TEMPORAL: Permitir acceso directo a rutas de admin para testing
    if (to.path.startsWith('/admin')) {
      console.log('TEMPORAL: Permitiendo acceso directo a admin para testing')
      // Comentamos la verificación de permisos
      // const hasAdminPermissions = await checkAdminPermissions()
      // if (!hasAdminPermissions) {
      //   next({ name: 'dashboard' })
      //   return
      // }
    }
    
    // TEMPORAL: Comentamos verificación de rol específico
    // if (!requiredRoles.includes(userRole)) {
    //   if (userRole === 'admin' || userRole === 'super_admin') {
    //     next({ name: 'admin-dashboard' })
    //   } else {
    //     next({ name: 'dashboard' })
    //   }
    //   return
    // }
  }

  // Redirigir usuarios autenticados desde páginas de auth
  if (user.value && (to.name === 'auth' || to.name === 'login-only' || to.name === 'register-only')) {
    const userRole = await getUserRole(user.value.uid)
    if (userRole === 'admin' || userRole === 'super_admin') {
      next({ name: 'admin-dashboard' })
    } else {
      next({ name: 'dashboard' })
    }
    return
  }

  next()
})

// Ocultar overlay en todos los casos (éxito o fallo)
router.afterEach(() => {
  try { const loading = useLoading(); loading.hide() } catch (e) {}
})

router.onError(() => {
  try { const loading = useLoading(); loading.hide() } catch (e) {}
})

export default router
