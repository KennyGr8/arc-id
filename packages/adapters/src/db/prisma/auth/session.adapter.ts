// adapters/src/db/prisma/session.adapter.ts
import type { PrismaClients, ISessionAdapter, CreateSessionDTO, UpdateSessionDTO, Session } from '@arc-id/data'

export class SessionAdapter<T extends PrismaClients> implements ISessionAdapter {
  private prisma: T

  constructor(prisma: T) {
    this.prisma = prisma
  }

  switchClient(newClient: T) {
    this.prisma = newClient
    return this
  }

  async createSession(data: CreateSessionDTO): Promise<Session> {
    return (this.prisma as any).session.create({ data })
  }

  async findSessionById(id: string): Promise<Session | null> {
    return (this.prisma as any).session.findUnique({ where: { id } })
  }

  async findSessionsByUser(identityId: string): Promise<Session[]> {
    return (this.prisma as any).session.findMany({ where: { identityId } })
  }

  async updateSession(id: string, data: UpdateSessionDTO): Promise<Session> {
    return (this.prisma as any).session.update({
      where: { id },
      data,
    })
  }

  async revokeSession(id: string): Promise<void> {
    await (this.prisma as any).session.delete({ where: { id } })
  }

  async revokeAllUserSessions(identityId: string): Promise<void> {
    await (this.prisma as any).session.deleteMany({ where: { identityId } })
  }
}
