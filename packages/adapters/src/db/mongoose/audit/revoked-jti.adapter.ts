// adapters/src/db/mongoose/revoked-jti.adapter.ts
import type {
  IRevokedJtiAdapter,
  CreateRevokedJtiDTO,
  RevokedJti,
} from '@arc-id/data'
import { Schema, model, Model } from 'mongoose'

const RevokedJtiSchema = new Schema<RevokedJti>({
  id: { type: String, required: true, unique: true },
  jti: { type: String, required: true, unique: true },
  revokedAt: { type: Date, default: Date.now },
  reason: { type: String },
})

const RevokedJtiModel: Model<RevokedJti> = model<RevokedJti>(
  'RevokedJti',
  RevokedJtiSchema
)

export class MongooseRevokedJtiAdapter implements IRevokedJtiAdapter {
  constructor(private model: Model<RevokedJti> = RevokedJtiModel) {}

  switchClient(newModel: Model<RevokedJti>) {
    this.model = newModel
    return this
  }

  async revoke(data: CreateRevokedJtiDTO): Promise<RevokedJti> {
    const doc = new this.model({ ...data })
    return doc.save()
  }

  async findByJti(jti: string): Promise<RevokedJti | null> {
    return this.model.findOne({ jti }).lean()
  }
}
