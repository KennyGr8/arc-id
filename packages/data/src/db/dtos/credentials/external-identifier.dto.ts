export interface CreateExternalIdentifierDTO {
  identityId: string
  type: string
  valueHash: string
  displayValue?: string
  verified?: boolean
  verificationMethod?: string
  verificationSource?: string
  metadata?: Record<string, any>
}

export interface UpdateExternalIdentifierDTO {
  verified?: boolean
  metadata?: Record<string, any>
}
