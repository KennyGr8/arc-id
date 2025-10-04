export interface LinkOAuthAccountDTO {
  userId: string
  provider: string
  providerUserId: string
  accessToken?: string
  refreshToken?: string
}
