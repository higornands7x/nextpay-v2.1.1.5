import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
})

export const withdrawSchema = z.object({
  amount: z.number().min(0.01, 'Valor deve ser maior que zero'),
  pixKeyType: z.enum(['cpf', 'email', 'phone', 'random'], {
    required_error: 'Tipo de chave PIX é obrigatório'
  }),
  pixKey: z.string().min(1, 'Chave PIX é obrigatória')
})

export type LoginFormData = z.infer<typeof loginSchema>
export type WithdrawFormData = z.infer<typeof withdrawSchema>

export function validatePixKey(type: string, key: string): boolean {
  switch (type) {
    case 'cpf':
      return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(key)
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(key)
    case 'phone':
      return /^\(\d{2}\)\s\d{5}-\d{4}$/.test(key)
    case 'random':
      return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(key)
    default:
      return false
  }
}