// adapters/src/db/prisma/oauth.adapter.ts
import type { PrismaClients, IOAuthAdapter, LinkOAuthAccountDTO, OAuthAccount } from '@arc-id/core'

export class OAuthAdapter<T extends PrismaClients> implements IOAuthAdapter {
  private prisma: T

  constructor(prisma: T) {
    this.prisma = prisma
  }

  switchClient(newClient: T) {
    this.prisma = newClient
  }

  async linkAccount(data: LinkOAuthAccountDTO): Promise<OAuthAccount> {
    return (this.prisma as any).oAuthAccount.create({ data })
  }

  async findByProviderUserId(provider: string, providerUserId: string): Promise<OAuthAccount | null> {
    return (this.prisma as any).oAuthAccount.findUnique({
      where: { provider_providerUserId: { provider, providerUserId } }
    })
  }

  async findByUser(userId: string): Promise<OAuthAccount[]> {
    return (this.prisma as any).oAuthAccount.findMany({ where: { userId } })
  }

  async unlinkAccount(id: string): Promise<void> {
    await (this.prisma as any).oAuthAccount.delete({ where: { id } })
  }
}
