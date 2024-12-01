<template>
  <div class="min-h-screen flex items-center justify-center bg-[#0D0D0D]">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <img src="../assets/logo.svg" alt="NextPay" class="h-12 mx-auto mb-4" />
        <h2 class="text-2xl font-bold text-white">Bem-vindo ao NextPay</h2>
        <p class="mt-2 text-gray-400">Faça login para acessar sua conta</p>
      </div>

      <!-- Login Form -->
      <div class="bg-[#1A1A1A] rounded-lg p-8 shadow-xl border border-gray-800">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-300">Email</label>
            <div class="mt-1 relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="pi pi-envelope text-gray-500"></i>
              </div>
              <input 
                type="email" 
                v-model="form.email"
                :class="[
                  'block w-full pl-10 pr-3 py-2 bg-[#0D0D0D] border rounded-lg text-white',
                  errors.email ? 'border-red-500' : 'border-gray-700 focus:border-[#E5FB3C]'
                ]"
                :disabled="loading || authStore.isBlocked"
                @blur="validateField('email', form.email)"
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
                :class="[
                  'block w-full pl-10 pr-10 py-2 bg-[#0D0D0D] border rounded-lg text-white',
                  errors.password ? 'border-red-500' : 'border-gray-700 focus:border-[#E5FB3C]'
                ]"
                :disabled="loading || authStore.isBlocked"
                @blur="validateField('password', form.password)"
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

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember"
                type="checkbox"
                v-model="form.remember"
                class="h-4 w-4 bg-[#0D0D0D] border-gray-700 rounded focus:ring-[#E5FB3C] focus:ring-offset-gray-800"
              />
              <label for="remember" class="ml-2 block text-sm text-gray-300">
                Manter conectado
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="text-[#E5FB3C] hover:text-[#d4ea2c]">
                Esqueceu a senha?
              </a>
            </div>
          </div>

          <div v-if="authStore.isBlocked" class="p-3 bg-red-900/50 border border-red-800 rounded-lg">
            <p class="text-sm text-red-400 text-center">
              Conta bloqueada. Tente novamente em {{ Math.ceil(authStore.remainingBlockTime / 60000) }} minutos
            </p>
          </div>

          <button 
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-[#E5FB3C] hover:bg-[#d4ea2c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E5FB3C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            :disabled="loading || authStore.isBlocked || hasErrors"
          >
            <i v-if="loading" class="pi pi-spinner pi-spin mr-2"></i>
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>

          <div class="text-center mt-6">
            <p class="text-sm text-gray-400">
              Não tem uma conta?
              <router-link to="/register" class="text-[#E5FB3C] hover:text-[#d4ea2c] font-medium">
                Criar conta
              </router-link>
            </p>
          </div>
        </form>
      </div>

      <!-- Footer -->
      <div class="mt-8 text-center">
        <p class="text-sm text-gray-400">
          Ao fazer login você concorda com nossos
          <a href="#" class="text-[#E5FB3C] hover:text-[#d4ea2c]">Termos de Uso</a>
          e
          <a href="#" class="text-[#E5FB3C] hover:text-[#d4ea2c]">Política de Privacidade</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useToast } from 'primevue/usetoast'
import { loginSchema } from '../utils/validators'
import { useForm } from '../composables/useForm'
import type { LoginFormData } from '../utils/validators'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()
const { errors, validateField, validateAll } = useForm(loginSchema)

const loading = ref(false)
const showPassword = ref(false)

const form = reactive<LoginFormData & { remember: boolean }>({
  email: '',
  password: '',
  remember: false
})

const hasErrors = computed(() => {
  return Object.values(errors).some(error => !!error)
})

async function handleLogin() {
  try {
    loading.value = true
    
    if (!validateAll(form)) {
      return
    }
    
    await authStore.login({
      email: form.email,
      password: form.password,
      remember: form.remember
    })
    
    toast.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Login realizado com sucesso!',
      life: 3000
    })
    
    router.push('/')
  } catch (error) {
    if (error instanceof Error) {
      toast.add({
        severity: 'error',
        summary: 'Erro',
        detail: error.message,
        life: 3000
      })
    }
  } finally {
    loading.value = false
  }
}
</script>