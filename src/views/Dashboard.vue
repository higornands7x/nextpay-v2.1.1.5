<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-white">Visão Geral</h1>
      <div class="flex items-center">
        <button class="px-3 py-1.5 text-sm font-medium text-black bg-[#E5FB3C] rounded hover:bg-[#d4ea2c] transition-colors">
          Últimos 7 dias
        </button>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <!-- Últimos 7 dias -->
      <div class="bg-[#1A1A1A] p-4 rounded-lg">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center">
            <i class="pi pi-chart-line text-[#E5FB3C] mr-2"></i>
            <span class="text-sm text-gray-400">Últimos 7 dias</span>
          </div>
          <span class="text-sm text-white">0,00</span>
        </div>
      </div>

      <!-- Disponível -->
      <div class="bg-[#1A1A1A] p-4 rounded-lg">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <i class="pi pi-check-circle text-[#22C55E] mr-2"></i>
            <span class="text-sm text-gray-400">Disponível</span>
          </div>
          <span class="text-sm text-white">R$ {{ availableAmount.toFixed(2) }}</span>
        </div>
        <button 
          class="mt-2 w-full px-3 py-1.5 text-sm text-black bg-[#E5FB3C] rounded hover:bg-[#d4ea2c] transition-colors"
          @click="showWithdrawModal = true"
        >
          SACAR
        </button>
      </div>

      <!-- Saldo a liberar -->
      <div class="bg-[#1A1A1A] p-4 rounded-lg">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <i class="pi pi-clock text-[#EAB308] mr-2"></i>
            <span class="text-sm text-gray-400">Saldo a liberar</span>
          </div>
          <span class="text-sm text-white">R$ 0,00</span>
        </div>
      </div>

      <!-- Em retenção -->
      <div class="bg-[#1A1A1A] p-4 rounded-lg">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <i class="pi pi-clock text-[#6366F1] mr-2"></i>
            <span class="text-sm text-gray-400">Em retenção</span>
          </div>
          <span class="text-sm text-white">R$ 10,81</span>
        </div>
      </div>

      <!-- Saque total realizado -->
      <div class="bg-[#1A1A1A] p-4 rounded-lg">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <i class="pi pi-wallet text-[#3B82F6] mr-2"></i>
            <span class="text-sm text-gray-400">Saque total realizado</span>
          </div>
          <span class="text-sm text-white">R$ 121,53</span>
        </div>
      </div>
    </div>

    <!-- Chart -->
    <div class="bg-[#1A1A1A] p-6 rounded-lg">
      <Chart
        type="line"
        :data="chartData"
        :options="chartOptions"
        class="h-[300px]"
      />
    </div>

    <!-- Performance Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
      <MetricCard
        v-for="metric in metrics"
        :key="metric.label"
        v-bind="metric"
      />
    </div>

    <!-- Withdraw Modal -->
    <WithdrawModal
      v-model:visible="showWithdrawModal"
      :available-amount="availableAmount"
      @withdraw-success="handleWithdrawSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Chart from 'primevue/chart'
import MetricCard from '../components/MetricCard.vue'
import WithdrawModal from '../components/WithdrawModal.vue'

const showWithdrawModal = ref(false)
const availableAmount = ref(12456.00)

const chartData = {
  labels: ['11 Oct', '12 Oct', '13 Oct', '14 Oct', '15 Oct', '16 Oct', '17 Oct'],
  datasets: [
    {
      label: 'Vendas',
      data: [70.20, 71.50, 72.80, 73.90, 74.80, 75.50, 75.88],
      borderColor: '#E5FB3C',
      backgroundColor: 'rgba(229, 251, 60, 0.1)',
      tension: 0.4,
      fill: true
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#1A1A1A'
      },
      ticks: {
        color: '#9CA3AF'
      }
    },
    x: {
      grid: {
        color: '#1A1A1A'
      },
      ticks: {
        color: '#9CA3AF'
      }
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}

const metrics = [
  {
    label: 'Aprovação Cartão',
    value: '0.00%',
    icon: 'pi-credit-card'
  },
  {
    label: 'Chargeback',
    value: '0.00%',
    icon: 'pi-refresh'
  },
  {
    label: 'Reembolsos',
    value: '0.00%',
    icon: 'pi-reply'
  },
  {
    label: 'Conversão Pix',
    value: '0.00%',
    icon: 'pi-percentage'
  },
  {
    label: 'Conversão Boleto',
    value: '0.00%',
    icon: 'pi-file'
  }
]

function handleWithdrawSuccess() {
  // Atualizar saldo após saque bem-sucedido
  availableAmount.value -= Number(amount.value)
}
</script>