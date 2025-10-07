// adapters/src/db/mongoose/access-delegation.adapter.ts
import type {
  IAccessDelegationAdapter,
  CreateDelegationDTO,
  AccessDelegation,
} from '@arc-id/data'
import { Schema, model, Model } from 'mongoose'

const AccessDelegationSchema = new Schema<AccessDelegation>({
  id: { type: String, required: true, unique: true },
  grantorId: { type: String, required: true },
  granteeId: { type: String, required: true },
  tenantId: { type: String },
  scopes: { type: [String], default: [] },
  expiresAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
})

const AccessDelegationModel: Model<AccessDelegation> = model<AccessDelegation>(
  'AccessDelegation',
  AccessDelegationSchema
)

export class MongooseAccessDelegationAdapter
  implements IAccessDelegationAdapter
{
  constructor(private model: Model<AccessDelegation> = AccessDelegationModel) {}
  switchClient(newModel: Model<AccessDelegation>) {
    this.model = newModel
    return this
  }

  async createDelegation(data: CreateDelegationDTO): Promise<AccessDelegation> {
    return new this.model({ ...data }).save()
  }

  async findDelegationsByGrantor(
    grantorId: string
  ): Promise<AccessDelegation[]> {
    return this.model.find({ grantorId }).lean()
  }

  async findDelegationsByGrantee(
    granteeId: string
  ): Promise<AccessDelegation[]> {
    return this.model.find({ granteeId }).lean()
  }

  async revokeDelegation(id: string): Promise<void> {
    await this.model.deleteOne({ id })
  }
}
