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
  scrollBehavior(to, from, savedPosition) {
    // Si venimos con posición guardada (back/forward), mantenerla
    if (savedPosition) {
      return savedPosition
    }

    // Si la ruta tiene hash (ancla), navegar al elemento
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }

    // Por defecto, siempre scrollear arriba (suave)
    return { left: 0, top: 0, behavior: 'smooth' }
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
    } else if (userRole === 'cuidador') {
      next({ name: 'caregiver-dashboard' })
    } else {
      next({ name: 'dashboard' })
    }
    return
  }

  next()
})

// Ocultar overlay en todos los casos (éxito o fallo)
router.afterEach(() => {
  try { const loading = useLoading(); loading.hide() } catch (e) { }

  // Además de scrollear la ventana, también scrollear contenedores internos
  try {
    // Dejar que Vue renderice el nuevo contenido, luego forzar scroll
    setTimeout(() => {
      // 1) Priorizar el contenedor admin-content si existe
      const adminContent = document.querySelector('.admin-content')
      if (adminContent && typeof adminContent.scrollTo === 'function') {
        adminContent.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        return
      }

      // 2) Si no existe admin-content, buscar todos los elementos desplazables
      try {
        const scrollables = Array.from(document.querySelectorAll('*')).filter(el => {
          if (!(el instanceof HTMLElement)) return false
          const style = window.getComputedStyle(el)
          const overflowY = style.overflowY
          const isScrollable = (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay')
          return isScrollable && el.scrollHeight > el.clientHeight
        })

        if (scrollables.length) {
          // scrollear cada contenedor encontrado al inicio
          scrollables.forEach(el => {
            try { el.scrollTo({ top: 0, left: 0, behavior: 'smooth' }) } catch (e) { }
          })
          return
        }
      } catch (e) {
        // ignore
      }

      // 3) Fallback a window
      if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      }
    }, 0)
  } catch (e) {
    // ignore
  }
})

router.onError(() => {
  try { const loading = useLoading(); loading.hide() } catch (e) { }

  try {
    const adminContent = document.querySelector('.admin-content')
    if (adminContent && typeof adminContent.scrollTo === 'function') {
      adminContent.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      return
    }

    try {
      const scrollables = Array.from(document.querySelectorAll('*')).filter(el => {
        if (!(el instanceof HTMLElement)) return false
        const style = window.getComputedStyle(el)
        const overflowY = style.overflowY
        const isScrollable = (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay')
        return isScrollable && el.scrollHeight > el.clientHeight
      })

      if (scrollables.length) {
        scrollables.forEach(el => {
          try { el.scrollTo({ top: 0, left: 0, behavior: 'smooth' }) } catch (e) { }
        })
        return
      }
    } catch (e) { }

    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  } catch (e) { }
})

export default router
