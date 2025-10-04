import { Role, UserStatus } from '../index'

export interface CreateUserDTO {
  email: string
  passwordHash: string
  name?: string | null
  role?: Role
  status?: UserStatus
  dynamicRoleId?: string
  dynamicStatusId?: string
}

export interface UpdateUserDTO {
  email?: string
  passwordHash?: string
  name?: string | null
  role?: Role
  status?: UserStatus
  dynamicRoleId?: string
  dynamicStatusId?: string
}
