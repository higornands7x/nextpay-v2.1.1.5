<template>
  <div class="space-y-6">
    <!-- Cabeçalho -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-white">Relatórios</h1>
      <div class="flex items-center space-x-4">
        <input
          type="date"
          class="bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#E5FB3C]"
        />
        <button class="bg-[#E5FB3C] text-black px-4 py-2 rounded-lg hover:bg-[#d4ea2c] transition-colors">
          Exportar
        </button>
      </div>
    </div>

    <!-- Sistema de Abas -->
    <TabView :tabs="tabs" @update:tab="handleTabChange">
      <!-- Abandono de Checkout -->
      <template #checkout>
        <TabContent :is-active="activeTab === 'checkout'">
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <h2 class="text-lg font-medium text-white">Abandonos de Checkout</h2>
              <div class="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Buscar por cliente..."
                  class="bg-[#0D0D0D] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#E5FB3C]"
                />
              </div>
            </div>

            <table class="w-full">
              <thead>
                <tr class="text-left text-sm text-gray-400">
                  <th class="pb-4">Produto</th>
                  <th class="pb-4">Cliente</th>
                  <th class="pb-4">Preço</th>
                  <th class="pb-4">Data</th>
                  <th class="pb-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody class="text-gray-300">
                <tr v-if="checkoutData.length === 0">
                  <td colspan="5" class="text-center py-8 text-gray-400">
                    Nenhum dado disponível para o período selecionado
                  </td>
                </tr>
                <tr v-else v-for="item in checkoutData" :key="item.id">
                  <td class="py-4">{{ item.produto }}</td>
                  <td class="py-4">{{ item.cliente }}</td>
                  <td class="py-4">R$ {{ item.preco }}</td>
                  <td class="py-4">{{ item.data }}</td>
                  <td class="py-4 text-right">
                    <button class="text-[#E5FB3C] hover:text-[#d4ea2c]">
                      <i class="pi pi-send mr-2"></i>
                      Recuperar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabContent>
      </template>

      <!-- Vendas por Afiliado -->
      <template #affiliate>
        <TabContent :is-active="activeTab === 'affiliate'">
          <div class="space-y-6">
            <div class="grid grid-cols-3 gap-4">
              <div class="bg-[#0D0D0D] p-4 rounded-lg">
                <h3 class="text-sm text-gray-400">Total de Vendas</h3>
                <p class="text-xl font-semibold text-white mt-1">R$ {{ totalVendas }}</p>
              </div>
              <div class="bg-[#0D0D0D] p-4 rounded-lg">
                <h3 class="text-sm text-gray-400">Comissões</h3>
                <p class="text-xl font-semibold text-white mt-1">R$ {{ totalComissoes }}</p>
              </div>
              <div class="bg-[#0D0D0D] p-4 rounded-lg">
                <h3 class="text-sm text-gray-400">Afiliados Ativos</h3>
                <p class="text-xl font-semibold text-white mt-1">{{ afiliadosAtivos }}</p>
              </div>
            </div>

            <table class="w-full">
              <thead>
                <tr class="text-left text-sm text-gray-400">
                  <th class="pb-4">Afiliado</th>
                  <th class="pb-4">Vendas</th>
                  <th class="pb-4">Comissão</th>
                  <th class="pb-4">Status</th>
                </tr>
              </thead>
              <tbody class="text-gray-300">
                <tr v-if="affiliateData.length === 0">
                  <td colspan="4" class="text-center py-8 text-gray-400">
                    Nenhum dado disponível
                  </td>
                </tr>
                <tr v-else v-for="affiliate in affiliateData" :key="affiliate.id">
                  <td class="py-4">{{ affiliate.nome }}</td>
                  <td class="py-4">{{ affiliate.vendas }}</td>
                  <td class="py-4">R$ {{ affiliate.comissao }}</td>
                  <td class="py-4">
                    <span
                      class="px-2 py-1 text-xs font-medium rounded-full"
                      :class="{
                        'bg-green-100 text-green-800': affiliate.status === 'ativo',
                        'bg-red-100 text-red-800': affiliate.status === 'inativo'
                      }"
                    >
                      {{ affiliate.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </TabContent>
      </template>

      <!-- Outras abas... -->
    </TabView>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TabView from '../components/TabView.vue'
import TabContent from '../components/TabContent.vue'

const tabs = [
  { id: 'checkout', label: 'Abandono de Checkout', icon: 'pi-shopping-cart' },
  { id: 'affiliate', label: 'Vendas por Afiliado', icon: 'pi-users' },
  { id: 'offers', label: 'Vendas por Oferta', icon: 'pi-tag' },
  { id: 'revenue', label: 'Receita por Afiliado', icon: 'pi-chart-line' },
  { id: 'postbacks', label: 'Log de Postbacks', icon: 'pi-sync' }
]

const activeTab = ref('checkout')
const checkoutData = ref([])
const affiliateData = ref([])

// Dados simulados
const totalVendas = ref('45.678,00')
const totalComissoes = ref('5.432,00')
const afiliadosAtivos = ref(12)

function handleTabChange(tabId: string) {
  activeTab.value = tabId
}
</script>