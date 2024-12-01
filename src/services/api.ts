import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000'
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth.token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authService = {
  async register(data: any) {
    // Simulação de API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            token: 'mock-jwt-token',
            user: { 
              id: 1, 
              name: data.name, 
              email: data.email 
            }
          }
        })
      }, 1000)
    })
  },

  async login(email: string, password: string) {
    // Simulação de API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'teste@teste.com' && password === '123456') {
          resolve({
            data: {
              token: 'mock-jwt-token',
              user: { id: 1, name: 'Usuário Teste', email }
            }
          })
        } else {
          reject(new Error('Credenciais inválidas'))
        }
      }, 1000)
    })
  },

  async submitKYC(data: any) {
    // Simulação de API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true })
      }, 1000)
    })
  }
}

export default api