export interface CreateVerifiableCredentialDTO {
  identityId: string
  issuer: string
  credential: Record<string, any>
  credentialHash: string
  proof?: Record<string, any>
  issuedAt: Date
  expiresAt?: Date
  status?: string
}

export interface UpdateVerifiableCredentialDTO {
  status?: string
  proof?: Record<string, any>
}
