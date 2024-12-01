<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-semibold text-white">Integrações</h1>
        <p class="text-gray-400 text-sm mt-1">
          Conecte-se às aplicações de terceiros
        </p>
      </div>
    </div>

    <!-- API Credentials Section -->
    <div class="bg-[#1A1A1A] rounded-lg p-6">
      <h2 class="text-lg font-medium text-white mb-2">Credenciais de API</h2>
      <p class="text-sm text-gray-400 mb-4">
        Essas chaves são responsáveis pela autenticação de sua API. Utilize-as para integrar aos seus checkouts, ou outros serviços de terceiros.
        <a href="#" class="text-blue-500 hover:text-blue-400">Ver documentação →</a>
      </p>

      <div class="bg-[#0D0D0D] p-4 rounded-lg mb-6">
        <div class="flex items-center mb-2">
          <i class="pi pi-lock text-yellow-500 mr-2"></i>
          <p class="text-sm text-yellow-500">Mantenha essas chaves em segredo!</p>
        </div>
        <p class="text-xs text-gray-400">
          Essas chaves são responsáveis pela autenticação de sua API e permitem acesso aos dados de sua empresa, suas vendas e seus clientes. Não divulgue-as!
        </p>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm text-gray-400 mb-2">Chave Privada:</label>
          <div class="flex items-center">
            <input
              type="password"
              value="********************************"
              readonly
              class="flex-1 bg-[#0D0D0D] border border-gray-800 rounded-lg px-4 py-2 text-gray-400"
            />
            <button class="text-blue-500 hover:text-blue-400 text-sm ml-4">
              Revelar Chave →
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">Chave Pública:</label>
          <div class="flex items-center">
            <input
              type="text"
              value="pk_e4mvvptN7YzM2w1CX98ZMeRhAh-g-O71FSWR-prHiqRpvNLO"
              readonly
              class="flex-1 bg-[#0D0D0D] border border-gray-800 rounded-lg px-4 py-2 text-gray-400"
            />
          </div>
        </div>
      </div>

      <div class="mt-6 flex justify-end">
        <button class="bg-red-500/20 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors">
          Redefinir Chaves
        </button>
      </div>
    </div>

    <!-- Webhooks Section -->
    <div class="bg-[#1A1A1A] rounded-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-lg font-medium text-white">Webhooks</h2>
          <p class="text-sm text-gray-400 mt-1">
            Aqui você pode gerenciar seus webhooks conectados, criá-los ou deletá-los. Adicione webhooks para se conectar a aplicações de terceiros! Esses webhooks notificarão eventos de criação/atualização de transações.
          </p>
        </div>
      </div>

      <div class="bg-[#0D0D0D] rounded-lg overflow-hidden">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-800">
              <th class="text-left text-xs font-medium text-gray-400 px-6 py-3">URL</th>
              <th class="text-left text-xs font-medium text-gray-400 px-6 py-3">CRIADO EM</th>
              <th class="text-right text-xs font-medium text-gray-400 px-6 py-3">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="3" class="px-6 py-8 text-center text-gray-400">
                Nenhum resultado encontrado...
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4 flex justify-end">
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <i class="pi pi-plus mr-2"></i>
          Adicionar Webhook
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic here if needed
</script>