import type {
  IOAuthAccountAdapter,
  LinkOAuthAccountDTO,
  UnlinkOAuthAccountDTO,
  OAuthAccount,
} from '@arc-id/data'
import type { Db, Collection } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoOAuthAdapter implements IOAuthAccountAdapter {
  private collection: Collection<OAuthAccount>

  constructor(private db: Db) {
    this.collection = db.collection<OAuthAccount>('oauthAccounts')
  }

  switchClient(newDb: Db) {
    this.db = newDb
    this.collection = newDb.collection<OAuthAccount>('oauthAccounts')
    return this
  }

  async linkAccount(data: LinkOAuthAccountDTO): Promise<OAuthAccount> {
    const account: OAuthAccount = {
      id: generateId(),
      identityId: data.identityId,
      accessToken: data.accessToken ?? null,
      provider: data.provider,
      providerUserId: data.providerUserId,
      refreshToken: data.refreshToken ?? null,
      verified: data.verified ?? false,
      providerMetadata: data.providerMetadata ?? {},
      linkedAt: data.linkedAt ?? new Date(),
    }
    await this.collection.insertOne(account)
    return account
  }

  async findByProviderIdentityId(
    provider: string,
    providerUserId: string
  ): Promise<OAuthAccount | null> {
    return this.collection.findOne({ provider, providerUserId })
  }

  async findByIdentity(identityId: string): Promise<OAuthAccount[]> {
    return this.collection.find({ identityId }).toArray()
  }

  async unlinkAccount(id: string): Promise<void> {
    await this.collection.deleteOne({ id })
  }

  async unlinkByIdentity(data: UnlinkOAuthAccountDTO): Promise<void> {
    const { identityId, provider, providerUserId } = data
    const query: any = { identityId, provider }
    if (providerUserId) query.providerUserId = providerUserId
    await this.collection.deleteMany(query)
  }
}
