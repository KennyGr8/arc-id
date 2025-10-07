// -------------------- ACCESS TOKEN --------------------
export interface CreateAccessTokenDTO {
  token: string
  clientId: string
  identityId: string
  scopes: string
  issuedAt: Date
  expiresAt: Date
  jti?: string
  revoked?: boolean
}
