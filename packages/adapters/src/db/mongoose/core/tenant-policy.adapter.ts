// adapters/src/db/mongoose/tenant-policy.adapter.ts
import type {
  ITenantPolicyAdapter,
  CreateTenantPolicyDTO,
  UpdateTenantPolicyDTO,
  TenantPolicy,
} from '@arc-id/data'
import { Schema, model, Model } from 'mongoose'

const TenantPolicySchema = new Schema<TenantPolicy>({
  id: { type: String, required: true, unique: true },
  tenantId: { type: String, required: true },
  requireMfa: { type: Boolean, default: false },
  passwordRules: { type: Object },
  loginMethods: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
})

const TenantPolicyModel: Model<TenantPolicy> = model<TenantPolicy>(
  'TenantPolicy',
  TenantPolicySchema
)

export class MongooseTenantPolicyAdapter implements ITenantPolicyAdapter {
  constructor(private model: Model<TenantPolicy> = TenantPolicyModel) {}
  switchClient(newModel: Model<TenantPolicy>) {
    this.model = newModel
    return this
  }

  async createPolicy(data: CreateTenantPolicyDTO) {
    return new this.model(data).save()
  }

  async updatePolicy(id: string, data: UpdateTenantPolicyDTO) {
    const updated = await this.model.findOneAndUpdate({ id }, data, {
      new: true,
    })
    if (!updated) throw new Error('TenantPolicy not found')
    return updated
  }

  async findByTenant(tenantId: string) {
    return this.model.findOne({ tenantId }).lean()
  }
}
