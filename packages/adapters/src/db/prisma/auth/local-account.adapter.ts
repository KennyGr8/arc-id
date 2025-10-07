import type { PrismaClients, ILocalAccountAdapter, LocalAccount, CreateLocalAccountDTO, UpdateLocalAccountDTO } from '@arc-id/data'

export class LocalAccountAdapter<T extends PrismaClients> implements ILocalAccountAdapter {
  private prisma: T

  constructor(prisma: T) {
    this.prisma = prisma
  }

  switchClient(newClient: T) {
    this.prisma = newClient
    return this
  }

  async createLocalAccount(data: CreateLocalAccountDTO): Promise<LocalAccount> {
    return (this.prisma as any).localAccount.create({
      data: {
        identityId: data.identityId,
        email: data.email,
        passwordHash: data.passwordHash,
        passwordAlgorithm: "bcrypt", // default
      },
    })
  }

  async updateLocalAccount(id: string, data: UpdateLocalAccountDTO): Promise<LocalAccount> {
    return (this.prisma as any).localAccount.update({
      where: { id },
      data,
    })
  }

  async findByEmail(email: string): Promise<LocalAccount | null> {
    return (this.prisma as any).localAccount.findUnique({ where: { email } })
  }

  async deleteLocalAccount(id: string): Promise<void> {
    await (this.prisma as any).localAccount.delete({ where: { id } })
  }
}
