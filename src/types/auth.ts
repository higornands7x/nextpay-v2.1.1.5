export interface LoginCredentials {
  email: string
  password: string
  remember?: boolean
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface AuthState {
  token: string | null
  user: any | null
  loginAttempts: number
  lastLoginAttempt: number
  kycStatus: 'pending' | 'completed' | 'rejected'
}

export interface User {
  id: number
  name: string
  email: string
}