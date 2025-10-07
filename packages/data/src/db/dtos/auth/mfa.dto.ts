import { MfaType } from '../../index'

export interface CreateMfaDTO {
  identityId: string
  type: MfaType
  secret?: string
  enabled?: boolean
}

export interface UpdateMfaDTO {
  secret?: string
  enabled?: boolean
}
