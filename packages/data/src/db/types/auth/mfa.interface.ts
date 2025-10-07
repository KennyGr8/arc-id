import type { Mfa } from '@generated/postgres'
import type { CreateMfaDTO, UpdateMfaDTO, IBaseAdapter } from '../../index'

export interface IMfaAdapter extends IBaseAdapter<any> {
  createMfa(data: CreateMfaDTO): Promise<Mfa>
  updateMfa(id: string, data: UpdateMfaDTO): Promise<Mfa>
  findById(id: string): Promise<Mfa | null>
  findByIdentity(identityId: string): Promise<Mfa[]>
  enableMfa(id: string): Promise<Mfa>
  disableMfa(id: string): Promise<Mfa>
  deleteMfa(id: string): Promise<void>
}
