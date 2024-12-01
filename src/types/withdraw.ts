export interface WithdrawFormData {
  amount: number
  pixKeyType: string
  pixKey: string
}

export interface WithdrawResponse {
  success: boolean
  message: string
  transactionId?: string
}