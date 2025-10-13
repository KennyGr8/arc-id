// adapters/src/db/mongoose/authorization-code.adapter.ts
import type {
  IAuthorizationCodeAdapter,
  CreateAuthorizationCodeDTO,
  AuthorizationCode,
} from '@arc-id/data'
import { Schema, model, Model } from 'mongoose'

const AuthorizationCodeSchema = new Schema<AuthorizationCode>({
  code: { type: String, required: true, unique: true },
  identityId: { type: String, required: true },
  clientId: { type: String, required: true },
  consumed: { type: Boolean, default: false },
  expiresAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
})

const AuthorizationCodeModel: Model<AuthorizationCode> =
  model<AuthorizationCode>('AuthorizationCode', AuthorizationCodeSchema)

export class MongooseAuthorizationCodeAdapter
  implements IAuthorizationCodeAdapter
{
  constructor(
    private model: Model<AuthorizationCode> = AuthorizationCodeModel
  ) {}
  switchClient(newModel: Model<AuthorizationCode>) {
    this.model = newModel
    return this
  }

  async createCode(data: CreateAuthorizationCodeDTO) {
    return new this.model(data).save()
  }

  async consumeCode(code: string) {
    return this.model
      .findOneAndUpdate({ code }, { consumed: true }, { new: true })
      .lean()
  }

  async findByCode(code: string) {
    return this.model.findOne({ code }).lean()
  }
}
