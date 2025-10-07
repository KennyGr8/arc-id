import { Role, UserStatus } from '../../index'

export interface CreateMembershipDTO {
  identityId: string
  tenantId: string
  role?: Role
  status?: UserStatus
  profile?: Record<string, any>
}

export interface UpdateMembershipDTO {
  role?: Role
  status?: UserStatus
  profile?: Record<string, any>
}
