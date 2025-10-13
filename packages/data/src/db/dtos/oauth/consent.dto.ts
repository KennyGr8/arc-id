export interface CreateConsentDTO {
  identityId: string
  clientId: string
  scopes: string[]
  grantedAt?: Date
}

export interface UpdateConsentDTO {
  revokedAt?: Date
}
