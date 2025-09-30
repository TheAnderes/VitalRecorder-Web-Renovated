import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: '/contact-us', name: 'contact', component: () => import('@/views/ContactView.vue') },
  // Rutas unificadas de autenticación
  { path: '/auth', name: 'auth', component: () => import('@/components/LoginRegister.vue') },
  // Rutas de compatibilidad que redirigen al componente unificado
  { path: '/login', redirect: '/auth' },
  { path: '/register', redirect: '/auth' },
  // Ruta para recuperar contraseña
  { path: '/recuperar-contrasena', name: 'recuperar-contrasena', component: () => import('@/views/RecuperarContrasena.vue') },
  // Rutas individuales para casos específicos (mantener por compatibilidad)
  { path: '/login-only', name: 'login-only', component: () => import('@/components/Login.vue') },
  { path: '/register-only', name: 'register-only', component: () => import('@/components/Register.vue') },
  
  { path: '/about-us', name: 'about-us', component: () => import('@/components/AboutUs.vue') },
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/product', name: 'product', component: () => import('@/views/ProductView.vue') },
  { path: '/product1', name: 'product1', component: () => import('@/views/ProductViewVitalRecorder.vue') },
  { path: '/product2', name: 'product2', component: () => import('@/views//ProductViewVitalConnect.vue') },
  { path: '/vital-recorder', name: 'vital-recorder', component: () => import('@/views/VitalRecorder.vue') },
  // Ruta del dashboard del usuario
  { path: '/dashboard', name: 'dashboard', component: () => import('@/views/UserDashboard.vue') },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
