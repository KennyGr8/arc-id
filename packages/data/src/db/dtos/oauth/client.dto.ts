export interface CreateClientDTO {
  tenantId?: string
  name: string
  clientId: string
  clientSecret?: string
  redirectUris: string
  grantTypes: string
  scopes: string
  public?: boolean
}

export interface UpdateClientDTO {
  name?: string
  clientSecret?: string
  redirectUris?: string
  grantTypes?: string
  scopes?: string
  public?: boolean
}
