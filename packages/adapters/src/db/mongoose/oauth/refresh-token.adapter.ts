// adapters/src/db/mongoose/refresh-token.adapter.ts
import type {
  IRefreshTokenAdapter,
  CreateRefreshTokenDTO,
  RefreshToken,
} from '@arc-id/data'
import { Schema, model, Model } from 'mongoose'

const RefreshTokenSchema = new Schema<RefreshToken>({
  token: { type: String, required: true, unique: true },
  identityId: { type: String, required: true },
  rotation: { type: Number, default: 0 },
  revoked: { type: Boolean, default: false },
  issuedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
})

const RefreshTokenModel: Model<RefreshToken> = model<RefreshToken>(
  'RefreshToken',
  RefreshTokenSchema
)

export class MongooseRefreshTokenAdapter implements IRefreshTokenAdapter {
  constructor(private model: Model<RefreshToken> = RefreshTokenModel) {}
  switchClient(newModel: Model<RefreshToken>) {
    this.model = newModel
    return this
  }

  async createToken(data: CreateRefreshTokenDTO) {
    return new this.model(data).save()
  }

  async revokeToken(token: string) {
    await this.model.findOneAndUpdate({ token }, { revoked: true })
  }

  async rotateToken(token: string) {
    const existing = await this.findByToken(token)
    if (!existing) return null
    return this.model
      .findOneAndUpdate(
        { token },
        { rotation: existing.rotation + 1 },
        { new: true }
      )
      .lean()
  }

  async findByToken(token: string) {
    return this.model.findOne({ token }).lean()
  }
}
