export interface LinkOAuthAccountDTO {
  identityId: string
  provider: string
  providerUserId: string
  accessToken?: string
  refreshToken?: string
  providerMetadata?: Record<string, any>
  linkedAt: Date
  verified: boolean
}

export interface UnlinkOAuthAccountDTO {
  identityId: string
  provider: string
  providerUserId?: string // optional if unlinking *all* accounts for a provider
}
