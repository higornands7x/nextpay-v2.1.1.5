<template>
  <nav class="bg-[#0D0D0D] border-b border-[#1A1A1A]">
    <div class="mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0 flex items-center">
            <img src="../assets/logo.svg" alt="NextPay" class="h-8 w-auto" />
          </div>
          
          <div class="hidden sm:ml-6 sm:flex sm:space-x-1">
            <router-link 
              v-for="item in menuItems"
              :key="item.path"
              :to="item.path"
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              :class="[
                $route.path === item.path
                  ? 'bg-[#E5FB3C] text-black'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              ]"
            >
              <i :class="['pi', item.icon, 'mr-2']"></i>
              {{ item.name }}
            </router-link>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <a 
            href="#" 
            class="flex items-center px-3 py-1 rounded-lg text-sm text-white bg-[#1A1A1A] hover:bg-[#2A2A2A] transition-colors"
          >
            <i class="pi pi-whatsapp mr-2 text-[#E5FB3C]"></i>
            Suporte
          </a>

          <div class="flex items-center px-3 py-1 rounded-lg bg-[#1A1A1A]">
            <i class="pi pi-wallet text-[#E5FB3C] mr-2"></i>
            <span class="text-sm text-white">R$ {{ formatCurrency(balance) }}</span>
          </div>

          <button 
            class="p-2 rounded-full text-gray-400 hover:text-white hover:bg-[#1A1A1A]"
            @click="showNotifications = true"
          >
            <i class="pi pi-bell text-xl"></i>
          </button>
          
          <div class="relative">
            <button 
              class="p-2 rounded-full text-gray-400 hover:text-white hover:bg-[#1A1A1A]"
              @click="toggleUserMenu"
            >
              <i class="pi pi-user text-xl"></i>
            </button>

            <!-- User Menu Dropdown -->
            <div 
              v-show="showUserMenu"
              class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#1A1A1A] ring-1 ring-black ring-opacity-5 z-50"
            >
              <div class="py-1">
                <div class="px-4 py-2 border-b border-gray-700">
                  <p class="text-sm text-white font-medium">{{ userName }}</p>
                  <p class="text-xs text-gray-400">{{ userEmail }}</p>
                </div>
                <router-link
                  to="/perfil"
                  class="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2A2A2A] hover:text-white"
                >
                  <i class="pi pi-user mr-2"></i>
                  Meu Perfil
                </router-link>
                <router-link
                  to="/configuracoes"
                  class="block px-4 py-2 text-sm text-gray-300 hover:bg-[#2A2A2A] hover:text-white"
                >
                  <i class="pi pi-cog mr-2"></i>
                  Configurações
                </router-link>
                <div class="border-t border-gray-700"></div>
                <button
                  @click="handleLogout"
                  class="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-[#2A2A2A] hover:text-red-300"
                >
                  <i class="pi pi-sign-out mr-2"></i>
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
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

const balance = ref(12456.00)
const showNotifications = ref(false)
const showUserMenu = ref(false)
const userName = ref('Usuário Teste')
const userEmail = ref('usuario@teste.com')

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value
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

// Fechar menu ao clicar fora
function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>