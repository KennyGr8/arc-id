// adapters/src/db/mongoose/access-token.adapter.ts
import type {
  IAccessTokenAdapter,
  CreateAccessTokenDTO,
  AccessToken,
} from '@arc-id/data'
import { Schema, model, Model } from 'mongoose'

const AccessTokenSchema = new Schema<AccessToken>({
  token: { type: String, required: true, unique: true },
  jti: { type: String, required: true, unique: true },
  identityId: { type: String, required: true },
  revoked: { type: Boolean, default: false },
  issuedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
})

const AccessTokenModel: Model<AccessToken> = model<AccessToken>(
  'AccessToken',
  AccessTokenSchema
)

export class MongooseAccessTokenAdapter implements IAccessTokenAdapter {
  constructor(private model: Model<AccessToken> = AccessTokenModel) {}
  switchClient(newModel: Model<AccessToken>) {
    this.model = newModel
    return this
  }

  async createToken(data: CreateAccessTokenDTO) {
    return new this.model(data).save()
  }

  async revokeToken(token: string) {
    await this.model.findOneAndUpdate({ token }, { revoked: true })
  }

  async findByToken(token: string) {
    return this.model.findOne({ token }).lean()
  }

  async findByJti(jti: string) {
    return this.model.findOne({ jti }).lean()
  }
}
