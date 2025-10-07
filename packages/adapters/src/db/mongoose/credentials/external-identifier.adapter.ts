// adapters/src/db/mongoose/external-identifier.adapter.ts
import type {
  ExternalIdentifier,
  CreateExternalIdentifierDTO,
  UpdateExternalIdentifierDTO,
  IExternalIdentifierAdapter,
} from '@arc-id/data'
import { Schema, model, Model } from 'mongoose'

const ExternalIdentifierSchema = new Schema<ExternalIdentifier>({
  id: { type: String, required: true, unique: true },
  identityId: { type: String, required: true },
  type: { type: String, required: true },
  valueHash: { type: String, required: true },
  displayValue: { type: String, default: null },
  verified: { type: Boolean, default: false },
  verifiedAt: { type: Date, default: null },
  verificationMethod: { type: String, default: null },
  verificationSource: { type: String, default: null },
  metadata: { type: Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const ExternalIdentifierModel: Model<ExternalIdentifier> =
  model<ExternalIdentifier>('ExternalIdentifier', ExternalIdentifierSchema)

export class MongooseExternalIdentifierAdapter
  implements IExternalIdentifierAdapter
{
  constructor(
    private model: Model<ExternalIdentifier> = ExternalIdentifierModel
  ) {}

  switchClient(newModel: Model<ExternalIdentifier>) {
    this.model = newModel
    return this
  }

  async createIdentifier(
    data: CreateExternalIdentifierDTO
  ): Promise<ExternalIdentifier> {
    return new this.model({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).save()
  }

  async updateIdentifier(
    id: string,
    data: UpdateExternalIdentifierDTO
  ): Promise<ExternalIdentifier> {
    const updated = await this.model
      .findOneAndUpdate(
        { id },
        { ...data, updatedAt: new Date() },
        { new: true }
      )
      .lean()
      .exec()

    if (!updated) {
      throw new Error(`ExternalIdentifier with id=${id} not found`)
    }
    return updated as ExternalIdentifier // cast back safely
  }

  async findByTypeAndHash(
    type: string,
    valueHash: string
  ): Promise<ExternalIdentifier | null> {
    return this.model.findOne({ type, valueHash }).lean().exec()
  }
}
