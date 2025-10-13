export interface CreateRefreshTokenDTO {
  token: string
  clientId: string
  identityId: string
  expiresAt: Date
}
