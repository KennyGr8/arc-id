// adapters/src/db/prisma/email-token.adapter.ts
import type { PrismaClients, IEmailTokenAdapter, CreateEmailTokenDTO, EmailToken } from '@arc-id/core'

export class EmailTokenAdapter<T extends PrismaClients> implements IEmailTokenAdapter {
  private prisma: T

  constructor(prisma: T) {
    this.prisma = prisma
  }

  switchClient(newClient: T) {
    this.prisma = newClient
  }

  async createToken(data: CreateEmailTokenDTO): Promise<EmailToken> {
    return (this.prisma as any).emailToken.create({ data })
  }

  async findById(id: string): Promise<EmailToken | null> {
    return (this.prisma as any).emailToken.findUnique({ where: { id } })
  }

  async consumeToken(id: string): Promise<void> {
    await (this.prisma as any).emailToken.update({
      where: { id },
      data: { consumed: true }
    })
  }
}
