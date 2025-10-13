export interface CreateWalletDTO {
  identityId: string
  provider: string
  providerWalletId: string
  metadata?: Record<string, any>
}

export interface UpdateWalletDTO {
  metadata?: Record<string, any>
}
