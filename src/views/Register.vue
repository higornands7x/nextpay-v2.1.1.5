<template>
  <div class="min-h-screen flex items-center justify-center bg-[#0D0D0D]">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <img src="../assets/logo.svg" alt="NextPay" class="h-12 mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-white">Crie uma conta e descubra novas possibilidades!</h2>
      </div>

      <!-- Register Form -->
      <div class="bg-[#1A1A1A] rounded-lg p-8 shadow-xl border border-gray-800">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-300">Nome completo</label>
            <div class="mt-1 relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="pi pi-user text-gray-500"></i>
              </div>
              <input 
                type="text" 
                v-model="form.name"
                class="block w-full pl-10 pr-3 py-2 bg-[#0D0D0D] border rounded-lg text-white border-gray-700 focus:border-[#E5FB3C]"
                :class="{ 'border-red-500': errors.name }"
              />
              <span v-if="errors.name" class="text-xs text-red-500 mt-1 block">{{ errors.name }}</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300">Email</label>
            <div class="mt-1 relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="pi pi-envelope text-gray-500"></i>
              </div>
              <input 
                type="email" 
                v-model="form.email"
                class="block w-full pl-10 pr-3 py-2 bg-[#0D0D0D] border rounded-lg text-white border-gray-700 focus:border-[#E5FB3C]"
                :class="{ 'border-red-500': errors.email }"
              />
              <span v-if="errors.email" class="text-xs text-red-500 mt-1 block">{{ errors.email }}</span>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-300">Senha</label>
            <div class="mt-1 relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="pi pi-lock text-gray-500"></i>
              </div>
              <input 
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                class="block w-full pl-10 pr-10 py-2 bg-[#0D0D0D] border rounded-lg text-white border-gray-700 focus:border-[#E5FB3C]"
                :class="{ 'border-red-500': errors.password }"
              />
              <button 
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                @click="showPassword = !showPassword"
              >
                <i :class="[
                  'pi',
                  showPassword ? 'pi-eye-slash' : 'pi-eye',
                  'text-gray-500 hover:text-gray-300'
                ]"></i>
              </button>
              <span v-if="errors.password" class="text-xs text-red-500 mt-1 block">{{ errors.password }}</span>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300">Confirme sua senha</label>
            <div class="mt-1 relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="pi pi-lock text-gray-500"></i>
              </div>
              <input 
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="form.confirmPassword"
                class="block w-full pl-10 pr-10 py-2 bg-[#0D0D0D] border rounded-lg text-white border-gray-700 focus:border-[#E5FB3C]"
                :class="{ 'border-red-500': errors.confirmPassword }"
              />
              <button 
                type="button"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                <i :class="[
                  'pi',
                  showConfirmPassword ? 'pi-eye-slash' : 'pi-eye',
                  'text-gray-500 hover:text-gray-300'
                ]"></i>
              </button>
              <span v-if="errors.confirmPassword" class="text-xs text-red-500 mt-1 block">{{ errors.confirmPassword }}</span>
            </div>
          </div>

          <div class="flex items-center">
            <input
              id="terms"
              type="checkbox"
              v-model="form.acceptTerms"
              class="h-4 w-4 bg-[#0D0D0D] border-gray-700 rounded focus:ring-[#E5FB3C] focus:ring-offset-gray-800"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-300">
              Li e aceito os <a href="#" class="text-[#E5FB3C] hover:text-[#d4ea2c]">Termos de Uso</a> e 
              <a href="#" class="text-[#E5FB3C] hover:text-[#d4ea2c]">Política de Privacidade</a>
            </label>
          </div>

          <button 
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-[#E5FB3C] hover:bg-[#d4ea2c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E5FB3C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            :disabled="loading || !isValid"
          >
            <i v-if="loading" class="pi pi-spinner pi-spin mr-2"></i>
            {{ loading ? 'Criando conta...' : 'Criar nova conta' }}
          </button>
        </form>
      </div>

      <!-- Footer -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-400">
          Já possui uma conta?
          <router-link to="/login" class="text-[#E5FB3C] hover:text-[#d4ea2c] font-medium">
            Fazer login →
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

const errors = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const isValid = computed(() => {
  return form.value.name &&
         form.value.email &&
         form.value.password &&
         form.value.confirmPassword &&
         form.value.acceptTerms &&
         !Object.values(errors.value).some(error => !!error)
})

async function handleRegister() {
  if (!validateForm()) return

  try {
    loading.value = true
    
    // Simular chamada à API
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Conta criada com sucesso! Complete seu cadastro.',
      life: 3000
    })
    
    router.push('/kyc')
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: error instanceof Error ? error.message : 'Erro ao criar conta',
      life: 3000
    })
  } finally {
    loading.value = false
  }
}

function validateForm(): boolean {
  let isValid = true
  errors.value = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  if (!form.value.name) {
    errors.value.name = 'Nome é obrigatório'
    isValid = false
  }

  if (!form.value.email) {
    errors.value.email = 'Email é obrigatório'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Email inválido'
    isValid = false
  }

  if (!form.value.password) {
    errors.value.password = 'Senha é obrigatória'
    isValid = false
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Senha deve ter no mínimo 6 caracteres'
    isValid = false
  }

  if (!form.value.confirmPassword) {
    errors.value.confirmPassword = 'Confirmação de senha é obrigatória'
    isValid = false
  } else if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'As senhas não conferem'
    isValid = false
  }

  if (!form.value.acceptTerms) {
    toast.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Você precisa aceitar os termos de uso',
      life: 3000
    })
    isValid = false
  }

  return isValid
}
</script>