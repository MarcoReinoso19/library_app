import { createRouter, createWebHistory } from 'vue-router'

import MainPage from '@/pages/MainPage.vue'
import login from '@/pages/login.vue'
import register from '@/pages/register.vue'
import { setupGuards } from './api/guards'

const routes = [
  {
    path: '/',
    component: MainPage,
    meta: {
      title: 'MainPage',
      requiresAuth: true, // Requiere autenticación
    },
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: 'login',
      unauthenticatedOnly: true, // Solo para usuarios no autenticados
    },
  },
  {
    path: '/register',
    component: register,
    meta: {
      title: 'register',
      unauthenticatedOnly: true, // Solo para usuarios no autenticados
    },
  },
  // Ruta para manejar 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

setupGuards(router)

export default router
