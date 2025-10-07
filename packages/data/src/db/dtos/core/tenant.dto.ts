export interface CreateTenantDTO {
  name: string
  slug: string
  sector?: string
}

export interface UpdateTenantDTO {
  name?: string
  sector?: string
}
