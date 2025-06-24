import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/auth/login.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/usuario/cadastrar',
    name: 'CadastroUsuario',
    component: () => import('@/views/user/cadastroUsuario.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/cargo/cadastrar',
    name: 'CadastroCargo',
    component: () => import('@/views/cargo/cadastroCargo.vue'),
    meta: { requiresAuth: true },
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Guard para proteger rotas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const expiracao = parseInt(localStorage.getItem('token_expiration') || '0')

  if (to.meta.requiresAuth) {
    if (!token || Date.now() > expiracao) {
      localStorage.clear()
      return next({ name: 'login' })
    }
  }
  next()
})


export default router
