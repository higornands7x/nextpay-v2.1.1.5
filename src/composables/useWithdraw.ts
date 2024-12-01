import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import type { WithdrawFormData, WithdrawResponse } from '../types/withdraw'
import { validatePixKey } from '../utils/validators'

export function useWithdraw() {
  const toast = useToast()
  const loading = ref(false)
  const errors = ref({
    amount: '',
    pixKeyType: '',
    pixKey: ''
  })

  async function processWithdraw(data: WithdrawFormData): Promise<boolean> {
    if (!validateForm(data)) return false

    loading.value = true

    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const response: WithdrawResponse = {
        success: true,
        message: 'Saque solicitado com sucesso!',
        transactionId: Math.random().toString(36).substring(7)
      }
      
      if (response.success) {
        toast.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: response.message,
          life: 3000
        })
        return true
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: error instanceof Error ? error.message : 'Erro ao processar saque',
        life: 3000
      })
      return false
    } finally {
      loading.value = false
    }
  }

  function validateForm(data: WithdrawFormData): boolean {
    let isValid = true
    errors.value = {
      amount: '',
      pixKeyType: '',
      pixKey: ''
    }

    if (!data.amount || data.amount <= 0) {
      errors.value.amount = 'Valor deve ser maior que zero'
      isValid = false
    }

    if (!data.pixKeyType) {
      errors.value.pixKeyType = 'Tipo de chave PIX é obrigatório'
      isValid = false
    }

    if (!data.pixKey) {
      errors.value.pixKey = 'Chave PIX é obrigatória'
      isValid = false
    } else if (!validatePixKey(data.pixKeyType, data.pixKey)) {
      errors.value.pixKey = 'Formato de chave PIX inválido'
      isValid = false
    }

    return isValid
  }

  return {
    loading,
    errors,
    processWithdraw
  }
}