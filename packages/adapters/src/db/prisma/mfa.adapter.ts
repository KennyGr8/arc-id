// adapters/src/db/prisma/mfa.adapter.ts
import type {
  PrismaClients,
  IMfaAdapter,
  CreateMfaDTO,
  UpdateMfaDTO,
  Mfa
} from '@arc-id/core'

export class MfaAdapter<T extends PrismaClients> implements IMfaAdapter {
  private prisma: T

  constructor(prisma: T) {
    this.prisma = prisma
  }

  switchClient(newClient: T) {
    this.prisma = newClient
  }

  async createMfa(data: CreateMfaDTO): Promise<Mfa> {
    return (this.prisma as any).mfa.create({ data })
  }

  async updateMfa(id: string, data: UpdateMfaDTO): Promise<Mfa> {
    return (this.prisma as any).mfa.update({ where: { id }, data })
  }

  async findById(id: string): Promise<Mfa | null> {
    return (this.prisma as any).mfa.findUnique({ where: { id } })
  }

  async findByUser(userId: string): Promise<Mfa[]> {
    return (this.prisma as any).mfa.findMany({ where: { userId } })
  }

  async deleteMfa(id: string): Promise<void> {
    await (this.prisma as any).mfa.delete({ where: { id } })
  }
}
