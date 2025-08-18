import { createRouter, createWebHistory } from 'vue-router'
import ContactView from '@/views/ContactView.vue'

const routes = [
  { path: '/', name: 'contact', component: ContactView },
  { path: '/login', name: 'login', component: () => import('@/components/Login.vue') },
  { path: '/about-us', name: 'about-us', component: () => import('@/components/AboutUs.vue')},
  { path: '/register', name: 'register', component: () => import('@/components/Register.vue')}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
