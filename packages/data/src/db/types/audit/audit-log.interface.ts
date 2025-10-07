// types/audit-log.interface.ts
import type { AuditLog } from '@generated/postgres'
import type { CreateAuditLogDTO, IBaseAdapter } from '../../index'

export interface IAuditLogAdapter extends IBaseAdapter<any> {
  createLog(data: CreateAuditLogDTO): Promise<AuditLog>
  findByIdentity(identityId: string): Promise<AuditLog[]>
  findByActor(actorId: string): Promise<AuditLog[]>
}
