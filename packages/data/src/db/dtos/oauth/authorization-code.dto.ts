export interface CreateAuthorizationCodeDTO {
  code: string
  clientId: string
  identityId: string
  redirectUri?: string
  scopes: string
  expiresAt: Date
}
