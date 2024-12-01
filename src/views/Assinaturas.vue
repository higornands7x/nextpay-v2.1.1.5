<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-white">Assinaturas</h1>
      <button class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
        Nova Assinatura
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-gray-800 p-6 rounded-lg">
        <h3 class="text-gray-400 text-sm font-medium">Assinaturas Ativas</h3>
        <p class="mt-2 text-2xl font-semibold text-white">234</p>
        <p class="mt-1 text-sm text-green-500">+12 este mês</p>
      </div>

      <div class="bg-gray-800 p-6 rounded-lg">
        <h3 class="text-gray-400 text-sm font-medium">Receita Recorrente</h3>
        <p class="mt-2 text-2xl font-semibold text-white">R$ 23.456,00</p>
        <p class="mt-1 text-sm text-green-500">+8% este mês</p>
      </div>

      <div class="bg-gray-800 p-6 rounded-lg">
        <h3 class="text-gray-400 text-sm font-medium">Churn Rate</h3>
        <p class="mt-2 text-2xl font-semibold text-white">2.4%</p>
        <p class="mt-1 text-sm text-red-500">+0.2% este mês</p>
      </div>
    </div>

    <div class="bg-gray-800 rounded-lg overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Cliente
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Plano
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Valor
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Próximo Pagamento
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-700">
          <tr v-for="assinatura in assinaturas" :key="assinatura.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-white">{{ assinatura.cliente }}</div>
              <div class="text-sm text-gray-400">{{ assinatura.email }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-white">{{ assinatura.plano }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-white">R$ {{ assinatura.valor.toFixed(2) }}/mês</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': assinatura.status === 'Ativa',
                  'bg-red-100 text-red-800': assinatura.status === 'Cancelada',
                  'bg-yellow-100 text-yellow-800': assinatura.status === 'Pendente'
                }"
              >
                {{ assinatura.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {{ assinatura.proximoPagamento }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button class="text-indigo-400 hover:text-indigo-300 mr-3">
                <i class="pi pi-pencil"></i>
              </button>
              <button class="text-red-400 hover:text-red-300">
                <i class="pi pi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const assinaturas = [
  {
    id: 1,
    cliente: 'João Silva',
    email: 'joao@email.com',
    plano: 'Premium Anual',
    valor: 97.00,
    status: 'Ativa',
    proximoPagamento: '2024-01-01'
  },
  {
    id: 2,
    cliente: 'Maria Santos',
    email: 'maria@email.com',
    plano: 'Premium Mensal',
    valor: 147.00,
    status: 'Pendente',
    proximoPagamento: '2023-12-15'
  },
  {
    id: 3,
    cliente: 'Pedro Costa',
    email: 'pedro@email.com',
    plano: 'Basic Mensal',
    valor: 47.00,
    status: 'Cancelada',
    proximoPagamento: '-'
  }
]
</script>