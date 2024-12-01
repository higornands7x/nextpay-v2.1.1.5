<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-white">Produtos</h1>
      <button class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
        Novo Produto
      </button>
    </div>

    <div class="bg-gray-800 rounded-lg overflow-hidden">
      <div class="p-4">
        <input
          type="text"
          placeholder="Buscar produtos..."
          class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      <table class="w-full">
        <thead class="bg-gray-700">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Produto
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Preço
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Vendas
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-700">
          <tr v-for="produto in produtos" :key="produto.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="h-10 w-10 flex-shrink-0">
                  <img class="h-10 w-10 rounded-lg" :src="produto.imagem" :alt="produto.nome" />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-white">{{ produto.nome }}</div>
                  <div class="text-sm text-gray-400">{{ produto.codigo }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-white">R$ {{ produto.preco.toFixed(2) }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-white">{{ produto.vendas }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': produto.status === 'Ativo',
                  'bg-red-100 text-red-800': produto.status === 'Inativo'
                }"
              >
                {{ produto.status }}
              </span>
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
const produtos = [
  {
    id: 1,
    nome: 'Curso de Marketing Digital',
    codigo: 'CMD001',
    preco: 997.00,
    vendas: 145,
    status: 'Ativo',
    imagem: 'https://via.placeholder.com/40'
  },
  {
    id: 2,
    nome: 'E-book Vendas Online',
    codigo: 'EVO002',
    preco: 47.00,
    vendas: 283,
    status: 'Ativo',
    imagem: 'https://via.placeholder.com/40'
  },
  {
    id: 3,
    nome: 'Mentoria Premium',
    codigo: 'MP003',
    preco: 1997.00,
    vendas: 52,
    status: 'Inativo',
    imagem: 'https://via.placeholder.com/40'
  }
]
</script>