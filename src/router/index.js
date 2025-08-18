import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: '/contact-us', name: 'contact', component: () => import('@/views/ContactView.vue') },
  { path: '/login', name: 'login', component: () => import('@/components/Login.vue') },
  { path: '/about-us', name: 'about-us', component: () => import('@/components/AboutUs.vue') },
  { path: '/register', name: 'register', component: () => import('@/components/Register.vue') },
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
