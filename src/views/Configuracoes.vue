<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-white">Configurações</h1>
    </div>

    <div class="grid grid-cols-12 gap-6">
      <!-- Menu Lateral -->
      <div class="col-span-3">
        <div class="bg-[#1A1A1A] rounded-lg p-4">
          <nav class="space-y-2">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors"
              :class="[
                activeTab === tab.id
                  ? 'bg-[#E5FB3C] text-black'
                  : 'text-gray-400 hover:bg-[#2A2A2A] hover:text-white'
              ]"
            >
              <i :class="['pi', tab.icon, 'mr-2']"></i>
              {{ tab.label }}
            </button>
          </nav>
        </div>
      </div>

      <!-- Conteúdo -->
      <div class="col-span-9">
        <div class="bg-[#1A1A1A] rounded-lg p-6">
          <!-- Usuários -->
          <div v-if="activeTab === 'users'" class="space-y-6">
            <div class="flex justify-between items-center">
              <h2 class="text-lg font-medium text-white">Gerenciamento de Usuários</h2>
              <button 
                @click="showNewUserModal = true"
                class="bg-[#E5FB3C] text-black px-4 py-2 rounded-lg hover:bg-[#d4ea2c] transition-colors"
              >
                <i class="pi pi-plus mr-2"></i>
                Novo Usuário
              </button>
            </div>

            <!-- Filtros -->
            <div class="flex gap-4">
              <input
                type="text"
                v-model="userFilters.search"
                placeholder="Buscar por nome ou email..."
                class="flex-1 px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E5FB3C]"
              />
              <select
                v-model="userFilters.status"
                class="px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E5FB3C]"
              >
                <option value="">Todos os status</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>

            <!-- Tabela de Usuários -->
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="border-b border-gray-700">
                  <tr>
                    <th class="text-left py-3 text-xs font-medium text-gray-400 uppercase">Nome</th>
                    <th class="text-left py-3 text-xs font-medium text-gray-400 uppercase">Email</th>
                    <th class="text-left py-3 text-xs font-medium text-gray-400 uppercase">Cargo</th>
                    <th class="text-left py-3 text-xs font-medium text-gray-400 uppercase">Status</th>
                    <th class="text-right py-3 text-xs font-medium text-gray-400 uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-700">
                  <tr v-for="user in filteredUsers" :key="user.id">
                    <td class="py-4">
                      <div class="flex items-center">
                        <div class="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center text-white">
                          {{ user.name.charAt(0) }}
                        </div>
                        <span class="ml-3 text-white">{{ user.name }}</span>
                      </div>
                    </td>
                    <td class="py-4 text-gray-300">{{ user.email }}</td>
                    <td class="py-4 text-gray-300">{{ user.role }}</td>
                    <td class="py-4">
                      <span
                        class="px-2 py-1 text-xs font-medium rounded-full"
                        :class="{
                          'bg-green-100 text-green-800': user.status === 'active',
                          'bg-red-100 text-red-800': user.status === 'inactive'
                        }"
                      >
                        {{ user.status === 'active' ? 'Ativo' : 'Inativo' }}
                      </span>
                    </td>
                    <td class="py-4 text-right">
                      <button 
                        @click="editUser(user)"
                        class="text-gray-400 hover:text-white mr-3"
                      >
                        <i class="pi pi-pencil"></i>
                      </button>
                      <button 
                        @click="toggleUserStatus(user)"
                        class="text-gray-400 hover:text-white"
                      >
                        <i :class="['pi', user.status === 'active' ? 'pi-lock' : 'pi-lock-open']"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Personalização -->
          <div v-if="activeTab === 'customization'" class="space-y-6">
            <h2 class="text-lg font-medium text-white">Personalização da Interface</h2>
            
            <div class="grid grid-cols-2 gap-6">
              <!-- Logo -->
              <div class="space-y-4">
                <label class="block text-sm font-medium text-gray-300">Logo da Empresa</label>
                <div class="flex items-center space-x-4">
                  <div class="w-24 h-24 bg-[#0D0D0D] rounded-lg flex items-center justify-center">
                    <img v-if="settings.logo" :src="settings.logo" alt="Logo" class="max-w-full max-h-full" />
                    <i v-else class="pi pi-image text-3xl text-gray-500"></i>
                  </div>
                  <button class="text-[#E5FB3C] hover:text-[#d4ea2c]">
                    Alterar Logo
                  </button>
                </div>
              </div>

              <!-- Cores -->
              <div class="space-y-4">
                <label class="block text-sm font-medium text-gray-300">Cores do Tema</label>
                <div class="grid grid-cols-3 gap-4">
                  <div v-for="color in themeColors" :key="color.name" class="space-y-2">
                    <span class="text-xs text-gray-400">{{ color.label }}</span>
                    <div 
                      class="w-full h-10 rounded cursor-pointer border-2"
                      :style="{ backgroundColor: color.value, borderColor: color.value }"
                      @click="selectColor(color)"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Notificações -->
          <div v-if="activeTab === 'notifications'" class="space-y-6">
            <h2 class="text-lg font-medium text-white">Configurações de Notificações</h2>
            
            <div class="space-y-4">
              <div v-for="notification in notifications" :key="notification.id" class="flex items-center justify-between p-4 bg-[#0D0D0D] rounded-lg">
                <div>
                  <h3 class="text-white font-medium">{{ notification.title }}</h3>
                  <p class="text-sm text-gray-400">{{ notification.description }}</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    v-model="notification.enabled"
                    class="sr-only peer"
                  >
                  <div class="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E5FB3C]"></div>
                </label>
              </div>
            </div>
          </div>

          <!-- Backup -->
          <div v-if="activeTab === 'backup'" class="space-y-6">
            <h2 class="text-lg font-medium text-white">Backup e Restauração</h2>
            
            <div class="space-y-6">
              <!-- Último Backup -->
              <div class="p-4 bg-[#0D0D0D] rounded-lg">
                <div class="flex justify-between items-center">
                  <div>
                    <h3 class="text-white font-medium">Último Backup</h3>
                    <p class="text-sm text-gray-400">{{ lastBackup }}</p>
                  </div>
                  <button class="bg-[#E5FB3C] text-black px-4 py-2 rounded-lg hover:bg-[#d4ea2c] transition-colors">
                    Fazer Backup
                  </button>
                </div>
              </div>

              <!-- Histórico de Backups -->
              <div class="space-y-4">
                <h3 class="text-white font-medium">Histórico de Backups</h3>
                <div class="space-y-2">
                  <div v-for="backup in backupHistory" :key="backup.id" class="flex items-center justify-between p-4 bg-[#0D0D0D] rounded-lg">
                    <div>
                      <p class="text-white">{{ backup.date }}</p>
                      <p class="text-sm text-gray-400">{{ backup.size }}</p>
                    </div>
                    <div class="flex space-x-2">
                      <button class="text-[#E5FB3C] hover:text-[#d4ea2c]">
                        <i class="pi pi-download"></i>
                      </button>
                      <button class="text-[#E5FB3C] hover:text-[#d4ea2c]">
                        <i class="pi pi-refresh"></i>
                      </button>
                      <button class="text-red-400 hover:text-red-300">
                        <i class="pi pi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

// Tabs
const tabs = [
  { id: 'users', label: 'Usuários', icon: 'pi-users' },
  { id: 'customization', label: 'Personalização', icon: 'pi-palette' },
  { id: 'notifications', label: 'Notificações', icon: 'pi-bell' },
  { id: 'backup', label: 'Backup', icon: 'pi-database' }
]

const activeTab = ref('users')

// Users
const users = ref([
  { id: 1, name: 'João Silva', email: 'joao@email.com', role: 'Administrador', status: 'active' },
  { id: 2, name: 'Maria Santos', email: 'maria@email.com', role: 'Gerente', status: 'active' },
  { id: 3, name: 'Pedro Costa', email: 'pedro@email.com', role: 'Operador', status: 'inactive' }
])

const userFilters = ref({
  search: '',
  status: ''
})

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = !userFilters.value.search || 
      user.name.toLowerCase().includes(userFilters.value.search.toLowerCase()) ||
      user.email.toLowerCase().includes(userFilters.value.search.toLowerCase())
    
    const matchesStatus = !userFilters.value.status || user.status === userFilters.value.status
    
    return matchesSearch && matchesStatus
  })
})

// Theme Customization
const settings = ref({
  logo: null
})

const themeColors = ref([
  { name: 'primary', label: 'Principal', value: '#E5FB3C' },
  { name: 'secondary', label: 'Secundária', value: '#0051FF' },
  { name: 'accent', label: 'Destaque', value: '#FF0080' }
])

// Notifications
const notifications = ref([
  {
    id: 1,
    title: 'Novas vendas',
    description: 'Receba notificações quando houver uma nova venda',
    enabled: true
  },
  {
    id: 2,
    title: 'Novos usuários',
    description: 'Seja notificado quando um novo usuário se cadastrar',
    enabled: false
  },
  {
    id: 3,
    title: 'Relatórios semanais',
    description: 'Receba um resumo semanal das atividades',
    enabled: true
  }
])

// Backup
const lastBackup = ref('01/12/2023 15:30')
const backupHistory = ref([
  { id: 1, date: '01/12/2023 15:30', size: '2.5 MB' },
  { id: 2, date: '30/11/2023 10:15', size: '2.3 MB' },
  { id: 3, date: '29/11/2023 09:45', size: '2.4 MB' }
])

// Methods
function editUser(user: any) {
  // Implementar lógica de edição
  console.log('Editar usuário:', user)
}

function toggleUserStatus(user: any) {
  user.status = user.status === 'active' ? 'inactive' : 'active'
  toast.add({
    severity: 'success',
    summary: 'Sucesso',
    detail: `Status do usuário ${user.name} alterado com sucesso!`,
    life: 3000
  })
}

function selectColor(color: any) {
  // Implementar lógica de seleção de cor
  console.log('Cor selecionada:', color)
}
</script>