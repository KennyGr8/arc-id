import type { Mfa } from '@generated/postgres'
import type { CreateMfaDTO, UpdateMfaDTO, IBaseAdapter } from '../index'

export interface IMfaAdapter extends IBaseAdapter<any> {
  createMfa(data: CreateMfaDTO): Promise<Mfa>
  updateMfa(id: string, data: UpdateMfaDTO): Promise<Mfa>
  findById(id: string): Promise<Mfa | null>
  findByUser(userId: string): Promise<Mfa[]>
  deleteMfa(id: string): Promise<void>
}
