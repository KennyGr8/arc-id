// adapters/src/db/mongoose/local-account.adapter.ts
import type {
  ILocalAccountAdapter,
  LocalAccount,
  CreateLocalAccountDTO,
  UpdateLocalAccountDTO,
} from '@arc-id/data'
import { Schema, model, Model } from 'mongoose'

const LocalAccountSchema = new Schema<LocalAccount>({
  id: { type: String, required: true, unique: true },
  identityId: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  passwordAlgorithm: { type: String, default: 'bcrypt' },
  passwordUpdatedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const LocalAccountModel: Model<LocalAccount> = model<LocalAccount>(
  'LocalAccount',
  LocalAccountSchema
)

export class MongooseLocalAccountAdapter implements ILocalAccountAdapter {
  constructor(private model: Model<LocalAccount> = LocalAccountModel) {}
  switchClient(newModel: Model<LocalAccount>) {
    this.model = newModel
    return this
  }

  async createLocalAccount(data: CreateLocalAccountDTO): Promise<LocalAccount> {
    return new this.model({
      ...data,
      passwordHash: data.passwordHash,
      passwordAlgorithm: 'bcrypt',
    }).save()
  }

  async updateLocalAccount(
    id: string,
    data: UpdateLocalAccountDTO
  ): Promise<LocalAccount> {
    const updated = await this.model.findOneAndUpdate(
      { id },
      { ...data, updatedAt: new Date() },
      { new: true }
    )
    if (!updated) throw new Error('LocalAccount not found')
    return updated
  }

  async findByEmail(email: string): Promise<LocalAccount | null> {
    return this.model.findOne({ email }).lean()
  }

  async deleteLocalAccount(id: string): Promise<void> {
    await this.model.deleteOne({ id })
  }
}
