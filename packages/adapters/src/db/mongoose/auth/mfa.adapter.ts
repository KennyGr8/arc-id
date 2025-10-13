// adapters/src/db/mongoose/mfa.adapter.ts
import type { IMfaAdapter, CreateMfaDTO, UpdateMfaDTO, Mfa } from '@arc-id/data'
import { Schema, model, Model } from 'mongoose'

const MfaSchema = new Schema<Mfa>({
  id: { type: String, required: true, unique: true },
  identityId: { type: String, required: true },
  type: { type: String, required: true },
  secret: { type: String },
  enabled: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const MfaModel: Model<Mfa> = model<Mfa>('Mfa', MfaSchema)

export class MongooseMfaAdapter implements IMfaAdapter {
  constructor(private model: Model<Mfa> = MfaModel) {}
  switchClient(newModel: Model<Mfa>) {
    this.model = newModel
    return this
  }

  async createMfa(data: CreateMfaDTO): Promise<Mfa> {
    return new this.model(data).save()
  }

  async updateMfa(id: string, data: UpdateMfaDTO): Promise<Mfa> {
    const updated = await this.model.findOneAndUpdate(
      { id },
      { ...data, updatedAt: new Date() },
      { new: true }
    )
    if (!updated) throw new Error('MFA not found')
    return updated
  }

  async findById(id: string): Promise<Mfa | null> {
    return this.model.findOne({ id }).lean()
  }

  async findByIdentity(identityId: string): Promise<Mfa[]> {
    return this.model.find({ identityId }).lean()
  }

  async enableMfa(id: string): Promise<Mfa> {
    return this.updateMfa(id, { enabled: true })
  }

  async disableMfa(id: string): Promise<Mfa> {
    return this.updateMfa(id, { enabled: false })
  }

  async deleteMfa(id: string): Promise<void> {
    await this.model.deleteOne({ id })
  }
}
