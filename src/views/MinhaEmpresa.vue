<template>
  <div class="min-h-screen bg-[#0D0D0D] p-6">
    <!-- Breadcrumb -->
    <div class="flex items-center space-x-2 text-sm text-gray-400 mb-6">
      <router-link to="/" class="hover:text-white">Home</router-link>
      <span>/</span>
      <router-link to="/sacar" class="hover:text-white">Sacar</router-link>
      <span>/</span>
      <span class="text-white">Minha Empresa</span>
    </div>

    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-semibold text-white mb-2">Minha Empresa</h1>
      <p class="text-gray-400">Configure as principais informações sobre a sua empresa</p>
    </div>

    <!-- Company Information Form -->
    <div class="space-y-6">
      <!-- Basic Information -->
      <div class="bg-[#1A1A1A] rounded-lg p-6">
        <h2 class="text-lg font-medium text-white mb-6">Informações da empresa</h2>
        
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">CPF/CNPJ</label>
            <input 
              v-model="form.document"
              type="text"
              class="w-full px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E5FB3C]"
              placeholder="Digite seu CPF ou CNPJ"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Razão social</label>
            <input 
              v-model="form.companyName"
              type="text"
              class="w-full px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E5FB3C]"
              placeholder="Digite a razão social"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Nome comercial</label>
            <input 
              v-model="form.tradeName"
              type="text"
              class="w-full px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E5FB3C]"
              placeholder="Digite o nome comercial"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Nome na fatura</label>
            <input 
              v-model="form.billingName"
              type="text"
              class="w-full px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E5FB3C]"
              placeholder="Digite o nome que aparecerá na fatura"
            />
          </div>
        </div>
      </div>

      <!-- Company Details -->
      <div class="bg-[#1A1A1A] rounded-lg p-6">
        <h2 class="text-lg font-medium text-white mb-6">Detalhes da empresa</h2>
        
        <div class="grid grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Faturamento médio</label>
            <input 
              v-model="form.averageRevenue"
              type="text"
              class="w-full px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E5FB3C]"
              placeholder="Ex: R$ 10.000,00"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Ticket médio</label>
            <input 
              v-model="form.averageTicket"
              type="text"
              class="w-full px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E5FB3C]"
              placeholder="Ex: R$ 100,00"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Quais produtos você vende?</label>
            <input 
              v-model="form.products"
              type="text"
              class="w-full px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E5FB3C]"
              placeholder="Ex: Roupas, Eletrônicos, E-Books, Cursos, etc..."
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Site / Instagram</label>
            <input 
              v-model="form.website"
              type="text"
              class="w-full px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E5FB3C]"
              placeholder="Digite seu site ou Instagram"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">E-mail de contato</label>
            <input 
              v-model="form.email"
              type="email"
              class="w-full px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E5FB3C]"
              placeholder="Digite seu e-mail"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Telefone de contato</label>
            <input 
              v-model="form.phone"
              type="tel"
              class="w-full px-4 py-2 bg-[#0D0D0D] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#E5FB3C]"
              placeholder="Digite seu telefone"
            />
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="flex justify-end">
        <button 
          @click="saveCompanyInfo"
          class="px-6 py-2 bg-[#E5FB3C] text-black rounded-lg hover:bg-[#d4ea2c] transition-colors"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const form = ref({
  document: '',
  companyName: '',
  tradeName: '',
  billingName: '',
  averageRevenue: '',
  averageTicket: '',
  products: '',
  website: '',
  email: '',
  phone: ''
})

function saveCompanyInfo() {
  // Here you would implement the API call to save the company information
  toast.add({
    severity: 'success',
    summary: 'Sucesso',
    detail: 'Informações da empresa atualizadas com sucesso!',
    life: 3000
  })
}
</script>