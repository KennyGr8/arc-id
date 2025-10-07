// adapters/src/db/mongoose/email-token.adapter.ts
import type {
  IEmailTokenAdapter,
  CreateEmailTokenDTO,
  EmailToken,
} from '@arc-id/data'
import { Schema, model, Model, Connection } from 'mongoose'

// Define schema strictly typed to EmailToken
const EmailTokenSchema = new Schema<EmailToken>({
  id: { type: String, required: true, unique: true },
  token: { type: String, required: true },
  identityId: { type: String, required: true },
  expiresAt: { type: Date, required: false },
  consumed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

// Default model
const EmailTokenModel = model<EmailToken>('EmailToken', EmailTokenSchema)

export class MongooseEmailTokenAdapter implements IEmailTokenAdapter {
  private model: Model<EmailToken>

  constructor(model: Model<EmailToken> = EmailTokenModel) {
    this.model = model
  }

  switchClient(newModel: Model<EmailToken>) {
    this.model = newModel
    return this
  }

  async createToken(data: CreateEmailTokenDTO): Promise<EmailToken> {
    const token = new this.model({
      ...data,
      consumed: false,
      createdAt: new Date(),
    })
    const saved = await token.save()
    return saved.toObject()
  }

  async findById(id: string): Promise<EmailToken | null> {
    return this.model.findOne({ id }).lean<EmailToken>().exec()
  }

  async consumeToken(id: string): Promise<void> {
    await this.model.updateOne({ id }, { $set: { consumed: true } }).exec()
  }
}
