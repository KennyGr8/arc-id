export interface CreateDelegationDTO {
  grantorId: string
  granteeId: string
  tenantId?: string
  scopes: string[]
  expiresAt?: Date
}

export interface UpdateDelegationDTO {
  scopes?: string[]
  expiresAt?: Date
}
