// types/revoked-jti.interface.ts
import type { RevokedJti } from '@generated/postgres'
import type { CreateRevokedJtiDTO, IBaseAdapter } from '../../index'

export interface IRevokedJtiAdapter extends IBaseAdapter<any> {
  revoke(data: CreateRevokedJtiDTO): Promise<RevokedJti>
  findByJti(jti: string): Promise<RevokedJti | null>
}
