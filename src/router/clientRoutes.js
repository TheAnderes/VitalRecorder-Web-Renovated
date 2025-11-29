// Rutas para usuarios normales (clientes)
export const clientRoutes = [
  // Rutas públicas
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/client/HomeView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/contact-us',
    name: 'contact',
    component: () => import('@/views/client/ContactView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/about-us',
    name: 'about-us',
    component: () => import('@/views/client/AboutUsView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('@/views/client/ProductView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/product1',
    name: 'product1',
    component: () => import('@/views/client/ProductViewVitalRecorder.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/product2',
    name: 'product2',
    component: () => import('@/views/client/ProductViewVitalConnect.vue'),
    meta: { requiresAuth: false }
  },

  // Rutas de autenticación
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/components/LoginRegister.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    redirect: '/auth',
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    // Redirect to /auth but include a query so the LoginRegister component
    // can detect the desired panel (register) and activate it.
    redirect: to => ({ path: '/auth', query: { mode: 'register' } }),
    meta: { requiresAuth: false }
  },
  {
    path: '/recuperar-contrasena',
    name: 'recuperar-contrasena',
    component: () => import('@/views/client/RecuperarContrasena.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login-only',
    name: 'login-only',
    component: () => import('@/components/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/register-only',
    name: 'register-only',
    component: () => import('@/components/Register.vue'),
    meta: { requiresAuth: false }
  },

  // Rutas protegidas para usuarios normales
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/client/UserDashboard.vue'),
    meta: {
      requiresAuth: true,
      requiredRole: 'user'
    }
  },
  {
    path: '/caregiver-dashboard',
    name: 'caregiver-dashboard',
    component: () => import('@/views/client/CaregiverDashboard.vue'),
    meta: {
      requiresAuth: true,
      requiredRole: 'cuidador'
    }
  },
  {
    path: '/vital-recorder',
    name: 'vital-recorder',
    component: () => import('@/views/client/VitalRecorder.vue'),
    meta: {
      requiresAuth: true,
      requiredRole: 'user'
    }
  }
]
