import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useStorage } from '@vueuse/core'
import { authService } from '../services/api'
import type { AuthState, LoginCredentials, RegisterData } from '../types/auth'

const BLOCK_TIME = 15 * 60 * 1000 // 15 minutos

export const useAuthStore = defineStore('auth', () => {
  const state = useStorage<AuthState>('auth', {
    token: null,
    user: null,
    loginAttempts: 0,
    lastLoginAttempt: 0,
    kycStatus: 'pending' // 'pending' | 'completed' | 'rejected'
  })

  const isAuthenticated = computed(() => !!state.value.token)
  const needsKYC = computed(() => isAuthenticated.value && state.value.kycStatus === 'pending')
  
  const isBlocked = computed(() => {
    if (state.value.loginAttempts >= 5) {
      return Date.now() - state.value.lastLoginAttempt < BLOCK_TIME
    }
    return false
  })

  const remainingBlockTime = computed(() => {
    if (!isBlocked.value) return 0
    return Math.max(0, BLOCK_TIME - (Date.now() - state.value.lastLoginAttempt))
  })

  async function register(data: RegisterData) {
    try {
      const response = await authService.register(data)
      const { token, user } = response.data
      
      state.value.token = token
      state.value.user = user
      state.value.kycStatus = 'pending'

      return user
    } catch (error) {
      throw error
    }
  }

  async function login({ email, password, remember }: LoginCredentials) {
    if (isBlocked.value) {
      throw new Error(`Conta bloqueada. Tente novamente em ${Math.ceil(remainingBlockTime.value / 60000)} minutos`)
    }

    try {
      const response = await authService.login(email, password)
      const { token, user } = response.data
      
      state.value.token = token
      state.value.user = user
      state.value.loginAttempts = 0

      return user
    } catch (error) {
      state.value.loginAttempts++
      state.value.lastLoginAttempt = Date.now()
      throw error
    }
  }

  async function submitKYC(data: any) {
    try {
      await authService.submitKYC(data)
      state.value.kycStatus = 'completed'
    } catch (error) {
      throw error
    }
  }

  function logout() {
    state.value.token = null
    state.value.user = null
    state.value.kycStatus = 'pending'
  }

  return {
    state,
    isAuthenticated,
    needsKYC,
    isBlocked,
    remainingBlockTime,
    register,
    login,
    submitKYC,
    logout
  }
})