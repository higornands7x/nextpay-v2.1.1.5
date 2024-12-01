<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-white">Financeiro</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-gray-800 p-6 rounded-lg">
        <h3 class="text-gray-400 text-sm font-medium">Disponível</h3>
        <p class="mt-2 text-2xl font-semibold text-white">R$ {{ availableAmount.toFixed(2) }}</p>
        <button 
          class="mt-4 w-full bg-[#E5FB3C] text-black px-4 py-2 rounded-md hover:bg-[#d4ea2c] transition-colors"
          @click="showWithdrawModal = true"
        >
          Sacar
        </button>
      </div>

      <div class="bg-gray-800 p-6 rounded-lg">
        <h3 class="text-gray-400 text-sm font-medium">Em Análise</h3>
        <p class="mt-2 text-2xl font-semibold text-white">R$ 3.789,00</p>
        <p class="mt-1 text-sm text-yellow-500">Liberação em 24h</p>
      </div>

      <div class="bg-gray-800 p-6 rounded-lg">
        <h3 class="text-gray-400 text-sm font-medium">Próximo Saque</h3>
        <p class="mt-2 text-2xl font-semibold text-white">R$ 8.234,00</p>
        <p class="mt-1 text-sm text-gray-400">15/12/2023</p>
      </div>

      <div class="bg-gray-800 p-6 rounded-lg">
        <h3 class="text-gray-400 text-sm font-medium">Total Sacado</h3>
        <p class="mt-2 text-2xl font-semibold text-white">R$ 45.678,00</p>
        <p class="mt-1 text-sm text-gray-400">Este mês</p>
      </div>
    </div>

    <div class="bg-gray-800 rounded-lg overflow-hidden">
      <div class="p-4 border-b border-gray-700">
        <h2 class="text-lg font-medium text-white">Histórico de Saques</h2>
      </div>
      
      <table class="w-full">
        <thead class="bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Data
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Valor
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Método
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Comprovante
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-700">
          <tr v-for="saque in saques" :key="saque.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {{ saque.data }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-white">R$ {{ saque.valor.toFixed(2) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': saque.status === 'Concluído',
                  'bg-yellow-100 text-yellow-800': saque.status === 'Processando',
                  'bg-red-100 text-red-800': saque.status === 'Falhou'
                }"
              >
                {{ saque.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-white">{{ saque.metodo }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button 
                v-if="saque.status === 'Concluído'"
                class="text-indigo-400 hover:text-indigo-300"
              >
                <i class="pi pi-download mr-1"></i>
                Download
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <WithdrawModal
      v-model:visible="showWithdrawModal"
      :available-amount="availableAmount"
      @withdraw-success="handleWithdrawSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import WithdrawModal from '../components/WithdrawModal.vue'

const showWithdrawModal = ref(false)
const availableAmount = ref(12456.00)

const saques = [
  {
    id: 1,
    data: '2023-12-01 14:30',
    valor: 5000.00,
    status: 'Concluído',
    metodo: 'PIX'
  },
  {
    id: 2,
    data: '2023-12-01 10:15',
    valor: 3500.00,
    status: 'Processando',
    metodo: 'PIX'
  },
  {
    id: 3,
    data: '2023-11-30 16:45',
    valor: 2800.00,
    status: 'Falhou',
    metodo: 'PIX'
  }
]

function handleWithdrawSuccess() {
  // Aqui você pode atualizar o saldo disponível e a lista de saques
  // após um saque bem-sucedido
}
</script>