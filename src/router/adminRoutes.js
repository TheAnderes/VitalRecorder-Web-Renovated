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
  //--------------------------------------------------------------------------
  // Rutas para gestión de cuidadores (ruta/estructura en código se mantiene)
  {
    path: '/admin/patient',
    name: 'admin-patient',
    component: () => import('@/views/admin/AdminPatient/PatientManagement.vue'),
    meta: {
      requiresAuth: true,
      requiredRole: ['admin', 'super_admin']
    },
    children: [
      // default redirect to list
      { path: '', redirect: { name: 'admin-patient-list' } },
      {
        path: 'list',
        name: 'admin-patient-list',
        component: () => import('@/views/admin/AdminPatient/PatientList.vue'),
        meta: { requiresAuth: true, requiredRole: ['admin', 'super_admin'] }
      },
      {
        path: 'registro',
        name: 'admin-patient-registro',
        component: () => import('@/views/admin/AdminPatient/PatientRegistro.vue'),
        meta: { requiresAuth: true, requiredRole: ['admin', 'super_admin'] }
      },
      {
        // edit uses query param `editId` in existing code; keep path simple
        path: 'edit',
        name: 'admin-patient-edit',
        component: () => import('@/views/admin/AdminPatient/PatientEdit.vue'),
        meta: { requiresAuth: true, requiredRole: ['admin', 'super_admin'] }
      },
      {
        path: 'perfil',
        name: 'admin-patient-perfil',
        component: () => import('@/views/admin/AdminPatient/PatientPerfil.vue'),
        meta: { requiresAuth: true, requiredRole: ['admin', 'super_admin'] }
      }
    ]
  },
  //--------------------------------------------------------------------------
  {
    path: '/admin/analytics',
    name: 'admin-analytics',
    component: () => import('@/views/admin/Analytics.vue'),
    meta: {
      requiresAuth: true,
      requiredRole: ['admin', 'super_admin']
    }
  },
  {
    path: '/admin/revenue',
    name: 'admin-revenue',
    component: () => import('@/views/admin/Revenue.vue'),
    meta: {
      requiresAuth: true,
      requiredRole: ['admin', 'super_admin']
    }
  },
  {
    path: '/admin/profile',
    name: 'admin-profile',
    component: () => import('@/views/admin/AdminProfile.vue'),
    meta: { requiresAuth: true, requiredRole: ['admin', 'super_admin'] }
  }
]

