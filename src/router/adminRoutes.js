// Rutas para administradores
export const adminRoutes = [
  {
    path: '/admin',
    redirect: '/admin/dashboard',
    meta: { 
      requiresAuth: true,
      requiredRole: ['admin', 'super_admin']
    }
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('@/views/admin/AdminLogin.vue'),
    meta: { 
      requiresAuth: false,
      adminOnly: true
    }
  },
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: () => import('@/views/admin/AdminDashboard.vue'),
    meta: { 
      requiresAuth: true,
      requiredRole: ['admin', 'super_admin']
    }
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('@/views/admin/UsersManagement.vue'),
    meta: { 
      requiresAuth: true,
      requiredRole: ['admin', 'super_admin']
    }
  },
   {
    path: '/admin/patient',
    name: 'admin-patient',
    component: () => import('@/views/admin/PatientManagement.vue'),
    meta: { 
      requiresAuth: true,
      requiredRole: ['admin', 'super_admin']
    }
  },
  {
    path: '/admin/analytics',
    name: 'admin-analytics',
    component: () => import('@/views/admin/Analytics.vue'),
    meta: { 
      requiresAuth: true,
      requiredRole: ['admin', 'super_admin']
    }
  }
]
