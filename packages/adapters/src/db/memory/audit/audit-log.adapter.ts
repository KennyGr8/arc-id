import type { IAuditLogAdapter, CreateAuditLogDTO, AuditLog } from "@arc-id/data"
import { generateId } from "@arc-id/common"

export class MemoryAuditLogAdapter implements IAuditLogAdapter {
  private logs: AuditLog[] = []

  async createLog(data: CreateAuditLogDTO): Promise<AuditLog> {
    const log: AuditLog = {
      id: generateId(),
      createdAt: new Date(),
      ...data
    } as AuditLog
    this.logs.push(log)
    return log
  }

  async findByIdentity(identityId: string): Promise<AuditLog[]> {
    return this.logs.filter(l => l.identityId === identityId)
  }

  async findByActor(actorId: string): Promise<AuditLog[]> {
    return this.logs.filter(l => l.actorId === actorId)
  }

  switchClient(_c?: any) { return this }
}
