<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    :style="{ width: '450px' }"
    header="Solicitar Saque"
    :closable="true"
    class="withdraw-modal"
    @hide="closeModal"
  >
    <div class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Valor do Saque
        </label>
        <div class="relative">
          <span class="absolute left-3 top-2 text-gray-400">R$</span>
          <input
            v-model="form.amount"
            type="number"
            min="0.01"
            step="0.01"
            :max="availableAmount"
            class="w-full pl-10 pr-4 py-2 bg-[#1A1A1A] border border-gray-600 rounded-md text-white focus:outline-none focus:border-[#E5FB3C]"
            :class="{ 'border-red-500': errors.amount }"
          />
          <span v-if="errors.amount" class="text-xs text-red-500 mt-1 block">
            {{ errors.amount }}
          </span>
        </div>
        <p class="text-xs text-gray-400 mt-1">
          Saldo disponível: R$ {{ formatCurrency(availableAmount) }}
        </p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Tipo de Chave PIX
        </label>
        <select
          v-model="form.pixKeyType"
          class="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-600 rounded-md text-white focus:outline-none focus:border-[#E5FB3C]"
          :class="{ 'border-red-500': errors.pixKeyType }"
        >
          <option value="">Selecione o tipo de chave</option>
          <option value="cpf">CPF</option>
          <option value="email">E-mail</option>
          <option value="phone">Telefone</option>
          <option value="random">Chave Aleatória</option>
        </select>
        <span v-if="errors.pixKeyType" class="text-xs text-red-500 mt-1 block">
          {{ errors.pixKeyType }}
        </span>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-300 mb-2">
          Chave PIX
        </label>
        <input
          v-model="form.pixKey"
          type="text"
          class="w-full px-4 py-2 bg-[#1A1A1A] border border-gray-600 rounded-md text-white focus:outline-none focus:border-[#E5FB3C]"
          :class="{ 'border-red-500': errors.pixKey }"
          :placeholder="pixKeyPlaceholder"
        />
        <span v-if="errors.pixKey" class="text-xs text-red-500 mt-1 block">
          {{ errors.pixKey }}
        </span>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end space-x-3">
        <button
          class="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          @click="closeModal"
        >
          Cancelar
        </button>
        <button
          class="px-4 py-2 text-sm bg-[#E5FB3C] text-black rounded hover:bg-[#d4ea2c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          @click="handleWithdraw"
          :disabled="loading || !isValid"
        >
          <i v-if="loading" class="pi pi-spinner pi-spin mr-2"></i>
          {{ loading ? 'Processando...' : 'Confirmar Saque' }}
        </button>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast'
import Dialog from 'primevue/dialog'
import { useWithdraw } from '../composables/useWithdraw'

const props = defineProps<{
  modelValue: boolean
  availableAmount: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'withdraw-success': []
}>()

const isVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const toast = useToast()
const { loading, errors, processWithdraw } = useWithdraw()

const form = ref({
  amount: 0,
  pixKeyType: '',
  pixKey: ''
})

const isValid = computed(() => {
  return form.value.amount > 0 && 
         form.value.amount <= props.availableAmount &&
         form.value.pixKeyType &&
         form.value.pixKey &&
         !Object.values(errors.value).some(error => error)
})

const pixKeyPlaceholder = computed(() => {
  switch (form.value.pixKeyType) {
    case 'cpf':
      return '000.000.000-00'
    case 'email':
      return 'exemplo@email.com'
    case 'phone':
      return '(00) 00000-0000'
    case 'random':
      return '00000000-0000-0000-0000-000000000000'
    default:
      return 'Selecione o tipo de chave primeiro'
  }
})

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

async function handleWithdraw() {
  const success = await processWithdraw(form.value)
  if (success) {
    emit('withdraw-success')
    closeModal()
  }
}

function closeModal() {
  isVisible.value = false
  form.value = {
    amount: 0,
    pixKeyType: '',
    pixKey: ''
  }
}
</script>

<style>
.withdraw-modal {
  @apply bg-[#0D0D0D] border border-[#1A1A1A];
}

.withdraw-modal .p-dialog-header {
  @apply bg-[#0D0D0D] border-b border-[#1A1A1A] text-white;
}

.withdraw-modal .p-dialog-content {
  @apply bg-[#0D0D0D] text-white;
}

.withdraw-modal .p-dialog-footer {
  @apply bg-[#0D0D0D] border-t border-[#1A1A1A];
}

.withdraw-modal .p-dialog-header-close {
  @apply text-gray-400 hover:text-white transition-colors;
}
</style>