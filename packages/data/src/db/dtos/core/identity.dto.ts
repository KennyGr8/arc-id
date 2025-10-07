import { Role, UserStatus } from '../../index'

export interface CreateIdentityDTO {
  primaryEmail: string
  name?: string
  role?: Role
  status?: UserStatus
  dynamicRoleId?: string
  dynamicStatusId?: string
  metadata?: Record<string, any>
}

export interface UpdateIdentityDTO {
  name?: string
  role?: Role
  status?: UserStatus
  dynamicRoleId?: string
  dynamicStatusId?: string
  metadata?: Record<string, any>
}
