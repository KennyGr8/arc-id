import type { PrismaClients, IRevokedJtiAdapter, CreateRevokedJtiDTO } from "@arc-id/data"

export class RevokedJtiAdapter<T extends PrismaClients> implements IRevokedJtiAdapter {
  constructor(private prisma: T) {}

  switchClient(newClient: T) { this.prisma = newClient; return this }

  async revoke(data: CreateRevokedJtiDTO) {
    return (this.prisma as any).revokedJti.create({ data })
  }

  async findByJti(jti: string) {
    return (this.prisma as any).revokedJti.findUnique({ where: { jti } })
  }
}
