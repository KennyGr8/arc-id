// adapters/src/db/mongoose/consent.adapter.ts
import type {
  IConsentAdapter,
  CreateConsentDTO,
  UpdateConsentDTO,
  Consent,
} from '@arc-id/data'
import { Schema, model, Model } from 'mongoose'

const ConsentSchema = new Schema<Consent>({
  id: { type: String, required: true, unique: true },
  identityId: { type: String, required: true },
  clientId: { type: String, required: true },
  scopes: { type: [String], default: [] },
  grantedAt: { type: Date, default: Date.now },
  revokedAt: { type: Date, default: null },
})

const ConsentModel: Model<Consent> = model<Consent>('Consent', ConsentSchema)

export class MongooseConsentAdapter implements IConsentAdapter {
  constructor(private model: Model<Consent> = ConsentModel) {}

  switchClient(newModel: Model<Consent>) {
    this.model = newModel
    return this
  }

  async createConsent(data: CreateConsentDTO): Promise<Consent> {
    const created = await new this.model(data).save()
    return created.toObject() as Consent
  }

  async updateConsent(id: string, data: UpdateConsentDTO): Promise<Consent> {
    const updated = await this.model
      .findOneAndUpdate({ id }, data, { new: true, lean: true })
      .exec()
    if (!updated) throw new Error(`Consent with id ${id} not found`)
    return updated
  }
}
