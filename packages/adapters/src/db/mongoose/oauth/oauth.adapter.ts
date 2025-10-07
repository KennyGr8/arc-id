// adapters/src/db/mongoose/oauth.adapter.ts
import type {
  IOAuthAccountAdapter,
  LinkOAuthAccountDTO,
  UnlinkOAuthAccountDTO,
  OAuthAccount,
} from '@arc-id/data'
import { Schema, model, Model } from 'mongoose'

const OAuthAccountSchema = new Schema<OAuthAccount>({
  id: { type: String, required: true, unique: true },
  identityId: { type: String, required: true },
  provider: { type: String, required: true },
  providerUserId: { type: String, required: true },
  linkedAt: { type: Date, default: Date.now },
})

OAuthAccountSchema.index({ provider: 1, providerUserId: 1 }, { unique: true })

const OAuthAccountModel: Model<OAuthAccount> = model<OAuthAccount>(
  'OAuthAccount',
  OAuthAccountSchema
)

export class MongooseOAuthAdapter implements IOAuthAccountAdapter {
  constructor(private model: Model<OAuthAccount> = OAuthAccountModel) {}
  switchClient(newModel: Model<OAuthAccount>) {
    this.model = newModel
    return this
  }

  async linkAccount(data: LinkOAuthAccountDTO) {
    return new this.model(data).save()
  }

  async findByProviderIdentityId(provider: string, providerUserId: string) {
    return this.model.findOne({ provider, providerUserId }).lean()
  }

  async findByIdentity(identityId: string) {
    return this.model.find({ identityId }).lean()
  }

  async unlinkAccount(id: string) {
    await this.model.findOneAndDelete({ id })
  }

  async unlinkByIdentity(data: UnlinkOAuthAccountDTO) {
    const { identityId, provider, providerUserId } = data
    if (providerUserId) {
      await this.model.deleteMany({ identityId, provider, providerUserId })
    } else {
      await this.model.deleteMany({ identityId, provider })
    }
  }
}
