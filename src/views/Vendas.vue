<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-white">Vendas</h1>
      <div class="flex space-x-4">
        <input
          type="date"
          class="bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
        />
        <button class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Exportar
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-gray-800 p-6 rounded-lg">
        <h3 class="text-gray-400 text-sm font-medium">Vendas Aprovadas</h3>
        <p class="mt-2 text-2xl font-semibold text-white">R$ 12.456,00</p>
        <p class="mt-1 text-sm text-green-500">32 transações</p>
      </div>

      <div class="bg-gray-800 p-6 rounded-lg">
        <h3 class="text-gray-400 text-sm font-medium">Vendas Pendentes</h3>
        <p class="mt-2 text-2xl font-semibold text-white">R$ 3.789,00</p>
        <p class="mt-1 text-sm text-yellow-500">8 transações</p>
      </div>

      <div class="bg-gray-800 p-6 rounded-lg">
        <h3 class="text-gray-400 text-sm font-medium">Vendas Recusadas</h3>
        <p class="mt-2 text-2xl font-semibold text-white">R$ 567,00</p>
        <p class="mt-1 text-sm text-red-500">3 transações</p>
      </div>
    </div>

    <div class="bg-gray-800 rounded-lg overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Transação
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Cliente
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Produto
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Valor
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Data
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-700">
          <tr v-for="venda in vendas" :key="venda.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-white">{{ venda.id }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-white">{{ venda.cliente }}</div>
              <div class="text-sm text-gray-400">{{ venda.email }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-white">{{ venda.produto }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-white">R$ {{ venda.valor.toFixed(2) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': venda.status === 'Aprovado',
                  'bg-yellow-100 text-yellow-800': venda.status === 'Pendente',
                  'bg-red-100 text-red-800': venda.status === 'Recusado'
                }"
              >
                {{ venda.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {{ venda.data }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const vendas = [
  {
    id: '#1234',
    cliente: 'João Silva',
    email: 'joao@email.com',
    produto: 'Curso de Marketing Digital',
    valor: 997.00,
    status: 'Aprovado',
    data: '2023-12-01 14:30'
  },
  {
    id: '#1235',
    cliente: 'Maria Santos',
    email: 'maria@email.com',
    produto: 'E-book Vendas Online',
    valor: 47.00,
    status: 'Pendente',
    data: '2023-12-01 15:45'
  },
  {
    id: '#1236',
    cliente: 'Pedro Costa',
    email: 'pedro@email.com',
    produto: 'Mentoria Premium',
    valor: 1997.00,
    status: 'Recusado',
    data: '2023-12-01 16:20'
  }
]
</script>