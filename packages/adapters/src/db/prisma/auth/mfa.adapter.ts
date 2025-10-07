// adapters/src/db/prisma/mfa.adapter.ts
import type {
  PrismaClients,
  IMfaAdapter,
  CreateMfaDTO,
  UpdateMfaDTO,
  Mfa
} from '@arc-id/data'

export class MfaAdapter<T extends PrismaClients> implements IMfaAdapter {
  private prisma: T

  constructor(prisma: T) {
    this.prisma = prisma
  }

  switchClient(newClient: T) {
    this.prisma = newClient
    return this
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

  async findByIdentity(identityId: string): Promise<Mfa[]> {
    return (this.prisma as any).mfa.findMany({ where: { identityId } })
  }

  async enableMfa(id: string): Promise<Mfa> {
    return (this.prisma as any).mfa.update({
      where: { id },
      data: { enabled: true, updatedAt: new Date() }
    })
  }

  async disableMfa(id: string): Promise<Mfa> {
    return (this.prisma as any).mfa.update({
      where: { id },
      data: { enabled: false, updatedAt: new Date() }
    })
  }

  async deleteMfa(id: string): Promise<void> {
    await (this.prisma as any).mfa.delete({ where: { id } })
  }
}
