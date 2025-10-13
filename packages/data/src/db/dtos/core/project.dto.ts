// dtos/project.dto.ts
export interface CreateProjectDTO {
  tenantId: string
  name: string
  slug: string
}

export interface UpdateProjectDTO {
  name?: string
  slug?: string
}
