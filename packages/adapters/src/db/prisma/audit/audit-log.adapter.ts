import type { PrismaClients, IAuditLogAdapter, CreateAuditLogDTO } from "@arc-id/data"

export class AuditLogAdapter<T extends PrismaClients> implements IAuditLogAdapter {
  constructor(private prisma: T) {}

  switchClient(newClient: T) { this.prisma = newClient; return this }

  async createLog(data: CreateAuditLogDTO) {
    return (this.prisma as any).auditLog.create({ data })
  }

  async findByIdentity(identityId: string) {
    return (this.prisma as any).auditLog.findMany({ where: { identityId } })
  }

  async findByActor(actorId: string) {
    return (this.prisma as any).auditLog.findMany({ where: { actorId } })
  }
}
