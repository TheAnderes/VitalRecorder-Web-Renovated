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
    },
    children: [
      {
        path: '',
        name: 'admin-patient-list',
        component: () => import('@/views/admin/PatientList.vue'),
        meta: { requiresAuth: true, requiredRole: ['admin', 'super_admin'] }
      },
      // Submódulos para gestión de pacientes
      {
        path: 'registro',
        name: 'admin-patient-registro',
        component: () => import('@/views/admin/PatientRegistro.vue'),
        meta: { requiresAuth: true, requiredRole: ['admin', 'super_admin'] }
      },
      {
        path: 'perfil',
        name: 'admin-patient-perfil',
        component: () => import('@/views/admin/PatientPerfil.vue'),
        meta: { requiresAuth: true, requiredRole: ['admin', 'super_admin'] }
      },
      {
        path: 'editar',
        name: 'admin-patient-edit',
        component: () => import('@/views/admin/PatientEdit.vue'),
        meta: { requiresAuth: true, requiredRole: ['admin', 'super_admin'] }
      },
      {
        path: 'busqueda',
        name: 'admin-patient-busqueda',
        component: () => import('@/views/admin/PatientBusqueda.vue'),
        meta: { requiresAuth: true, requiredRole: ['admin', 'super_admin'] }
      },
      {
        path: 'reportes',
        name: 'admin-patient-reportes',
        component: () => import('@/views/admin/PatientReportes.vue'),
        meta: { requiresAuth: true, requiredRole: ['admin', 'super_admin'] }
      },
      
    ]
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
