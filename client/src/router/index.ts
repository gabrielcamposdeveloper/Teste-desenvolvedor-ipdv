import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/auth/login.vue')
    },
{
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('@/views/dashboard.vue'),
  meta: { requiresAuth: true }
},
{
  path: '/usuario/cadastrar',
  name: 'CadastroUsuario',
  component: () => import('@/views/user/cadastroUsuario.vue'),
  meta: { requiresAuth: true }
},
{
  path: '/cargo/cadastrar',
  name: 'CadastroCargo',
  component: () => import('@/views/cargo/cadastroCargo.vue'),
  meta: { requiresAuth: true }
}

  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
