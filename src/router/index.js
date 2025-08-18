import { createRouter, createWebHistory } from 'vue-router'
import ContactView from '@/views/ContactView.vue'

const routes = [
  { path: '/', name: 'contact', component: ContactView },
  { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },
  { path: '/product', name: 'product', component: () => import('@/views/HomeView.vue') },
  { path: '/login', name: 'login', component: () => import('@/views/HomeView.vue') }, // reemplaza con tu vista real de login
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(){ return { top: 0 } }
})

export default router
