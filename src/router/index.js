import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: '/contact-us', name: 'contact', component: () => import('@/views/ContactView.vue') },
  { path: '/login', name: 'login', component: () => import('@/components/Login.vue') },
  { path: '/about-us', name: 'about-us', component: () => import('@/components/AboutUs.vue') },
  { path: '/register', name: 'register', component: () => import('@/components/Register.vue') },
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/product', name: 'product', component: () => import('@/views/ProductView.vue') },
  { path: '/product1', name: 'product1', component: () => import('@/views/ProductViewVitalRecorder.vue') },
    { path: '/product2', name: 'product2', component: () => import('@/views//ProductViewVitalConnect.vue') },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
