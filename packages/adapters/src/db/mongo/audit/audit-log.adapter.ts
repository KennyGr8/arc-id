// adapters/src/db/mongo/audit-log.adapter.ts
import type {
  IAuditLogAdapter,
  CreateAuditLogDTO,
  AuditLog,
} from '@arc-id/data'
import { Db } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoAuditLogAdapter implements IAuditLogAdapter {
  constructor(private db: Db) {}

  switchClient(newClient: Db) {
    this.db = newClient
    return this
  }

  async createLog(data: CreateAuditLogDTO): Promise<AuditLog> {
    const log: AuditLog = {
      id: generateId(),
      createdAt: new Date(),
      identityId: data.identityId ?? null,
      actorId: data.actorId ?? null,
      action: data.action,
      resource: data.resource ?? null,
      ip: data.ip ?? null,
      userAgent: data.userAgent ?? null,
      data: data.data ?? {},
    };
    await this.db.collection<AuditLog>('auditLogs').insertOne(log)
    return log
  }

  async findByIdentity(identityId: string): Promise<AuditLog[]> {
    return this.db
      .collection<AuditLog>('auditLogs')
      .find({ identityId })
      .toArray()
  }

  async findByActor(actorId: string): Promise<AuditLog[]> {
    return this.db.collection<AuditLog>('auditLogs').find({ actorId }).toArray()
  }
}
