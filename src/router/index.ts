import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import DashboardLayout from '../layouts/DashboardLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/Register.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/kyc',
      name: 'KYC',
      component: () => import('../views/KYC.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      component: DashboardLayout,
      meta: { requiresAuth: true, requiresKYC: true },
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('../views/Dashboard.vue')
        },
        {
          path: 'produtos',
          name: 'Produtos',
          component: () => import('../views/Produtos.vue')
        },
        {
          path: 'vendas',
          name: 'Vendas',
          component: () => import('../views/Vendas.vue')
        },
        {
          path: 'assinaturas',
          name: 'Assinaturas',
          component: () => import('../views/Assinaturas.vue')
        },
        {
          path: 'financeiro',
          name: 'Financeiro',
          component: () => import('../views/Financeiro.vue')
        },
        {
          path: 'area-membros',
          name: 'AreaMembros',
          component: () => import('../views/AreaMembros.vue')
        },
        {
          path: 'integracoes',
          name: 'Integracoes',
          component: () => import('../views/Integracoes.vue')
        },
        {
          path: 'relatorios',
          name: 'Relatorios',
          component: () => import('../views/Relatorios.vue')
        },
        {
          path: 'configuracoes',
          name: 'Configuracoes',
          component: () => import('../views/Configuracoes.vue')
        },
        {
          path: 'minha-empresa',
          name: 'MinhaEmpresa',
          component: () => import('../views/MinhaEmpresa.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/')
  } else if (to.meta.requiresKYC && authStore.needsKYC && to.path !== '/kyc') {
    next('/kyc')
  } else {
    next()
  }
})

export default router