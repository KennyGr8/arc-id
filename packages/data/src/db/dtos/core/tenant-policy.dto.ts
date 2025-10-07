// dtos/tenant-policy.dto.ts
export interface CreateTenantPolicyDTO {
  tenantId: string
  requireMfa?: boolean
  passwordRules?: Record<string, any>
  loginMethods: string[]
}

export interface UpdateTenantPolicyDTO {
  requireMfa?: boolean
  passwordRules?: Record<string, any>
  loginMethods?: string[]
}
