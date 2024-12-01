<template>
  <div class="min-h-screen bg-[#0D0D0D] flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-[#1A1A1A] border-r border-[#2A2A2A] flex flex-col">
      <!-- Logo -->
      <div class="p-4 border-b border-[#2A2A2A]">
        <img src="../assets/logo.svg" alt="NextPay" class="h-8" />
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4 space-y-2">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="[
            $route.path === item.path
              ? 'bg-[#E5FB3C] text-black'
              : 'text-gray-400 hover:text-white hover:bg-[#2A2A2A]'
          ]"
        >
          <i :class="['pi', item.icon, 'mr-3']"></i>
          {{ item.name }}
        </router-link>
      </nav>

      <!-- User Menu -->
      <div class="p-4 border-t border-[#2A2A2A]">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center text-white">
              {{ userName.charAt(0) }}
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-white">{{ userName }}</p>
              <p class="text-xs text-gray-400">{{ userEmail }}</p>
            </div>
          </div>
          <button 
            @click="showUserMenu = !showUserMenu"
            class="text-gray-400 hover:text-white"
          >
            <i class="pi pi-chevron-down"></i>
          </button>
        </div>

        <!-- User Menu Dropdown -->
        <div v-if="showUserMenu" class="bg-[#2A2A2A] rounded-lg overflow-hidden">
          <router-link
            to="/minha-empresa"
            class="block px-4 py-2 text-sm text-gray-300 hover:bg-[#3A3A3A] hover:text-white"
          >
            <i class="pi pi-building mr-2"></i>
            Minha Empresa
          </router-link>
          <router-link
            to="/configuracoes"
            class="block px-4 py-2 text-sm text-gray-300 hover:bg-[#3A3A3A] hover:text-white"
          >
            <i class="pi pi-cog mr-2"></i>
            Configurações
          </router-link>
          <button
            @click="handleLogout"
            class="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#3A3A3A] hover:text-red-300"
          >
            <i class="pi pi-sign-out mr-2"></i>
            Sair
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1">
      <!-- Header -->
      <header class="bg-[#1A1A1A] border-b border-[#2A2A2A] h-16 flex items-center justify-between px-6">
        <h1 class="text-lg font-medium text-white">{{ pageTitle }}</h1>
        <div class="flex items-center space-x-4">
          <a 
            href="#" 
            class="flex items-center px-3 py-1 rounded-lg text-sm text-white bg-[#2A2A2A] hover:bg-[#3A3A3A] transition-colors"
          >
            <i class="pi pi-whatsapp mr-2 text-[#E5FB3C]"></i>
            Suporte
          </a>

          <div class="flex items-center px-3 py-1 rounded-lg bg-[#2A2A2A]">
            <i class="pi pi-wallet text-[#E5FB3C] mr-2"></i>
            <span class="text-sm text-white">R$ {{ formatCurrency(balance) }}</span>
          </div>

          <button 
            class="p-2 rounded-full text-gray-400 hover:text-white hover:bg-[#2A2A2A]"
          >
            <i class="pi pi-bell text-xl"></i>
          </button>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const toast = useToast()

const menuItems = [
  { name: 'Resumo', path: '/', icon: 'pi-home' },
  { name: 'Produtos', path: '/produtos', icon: 'pi-box' },
  { name: 'Vendas', path: '/vendas', icon: 'pi-shopping-cart' },
  { name: 'Assinaturas', path: '/assinaturas', icon: 'pi-sync' },
  { name: 'Financeiro', path: '/financeiro', icon: 'pi-wallet' },
  { name: 'Área de Membros', path: '/area-membros', icon: 'pi-users' },
  { name: 'Integrações', path: '/integracoes', icon: 'pi-link' },
  { name: 'Relatórios', path: '/relatorios', icon: 'pi-chart-bar' }
]

const showUserMenu = ref(false)
const balance = ref(12456.00)
const userName = ref('Usuário Teste')
const userEmail = ref('usuario@teste.com')

const pageTitle = computed(() => {
  const currentRoute = menuItems.find(item => item.path === route.path)
  return currentRoute?.name || ''
})

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

async function handleLogout() {
  try {
    authStore.logout()
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Logout realizado com sucesso!',
      life: 3000
    })
    router.push('/login')
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro ao realizar logout',
      life: 3000
    })
  }
}
</script>