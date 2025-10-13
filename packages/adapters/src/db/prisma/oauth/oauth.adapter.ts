// adapters/src/db/prisma/oauth.adapter.ts
import type { PrismaClients, IOAuthAccountAdapter, LinkOAuthAccountDTO, UnlinkOAuthAccountDTO, OAuthAccount } from '@arc-id/data'

export class OAuthAdapter<T extends PrismaClients> implements IOAuthAccountAdapter {
  private prisma: T

  constructor(prisma: T) {
    this.prisma = prisma
  }

  switchClient(newClient: T) {
    this.prisma = newClient
    return this
  }

  async linkAccount(data: LinkOAuthAccountDTO): Promise<OAuthAccount> {
    return (this.prisma as any).oAuthAccount.create({ data })
  }

  async findByProviderIdentityId(provider: string, providerUserId: string): Promise<OAuthAccount | null> {
    return (this.prisma as any).oAuthAccount.findUnique({
      where: { provider_providerUserId: { provider, providerUserId } }
    })
  }

  async findByIdentity(identityId: string): Promise<OAuthAccount[]> {
    return (this.prisma as any).oAuthAccount.findMany({ where: { identityId } })
  }

  async unlinkAccount(id: string): Promise<void> {
    await (this.prisma as any).oAuthAccount.delete({ where: { id } })
  }

  async unlinkByIdentity(data: UnlinkOAuthAccountDTO): Promise<void> {
    const { identityId, provider, providerUserId } = data
    if (providerUserId) {
      await (this.prisma as any).oAuthAccount.deleteMany({
        where: { identityId, provider, providerUserId }
      })
    } else {
      await (this.prisma as any).oAuthAccount.deleteMany({
        where: { identityId, provider }
      })
    }
  }
}
