// adapters/src/db/mongoose/tenant.adapter.ts
import type {
  ITenantAdapter,
  CreateTenantDTO,
  UpdateTenantDTO,
  Tenant,
} from '@arc-id/data'
import { Schema, model, Model } from 'mongoose'

const TenantSchema = new Schema<Tenant>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  sector: { type: String },
  createdAt: { type: Date, default: Date.now },
})

const TenantModel: Model<Tenant> = model<Tenant>('Tenant', TenantSchema)

export class MongooseTenantAdapter implements ITenantAdapter {
  constructor(private model: Model<Tenant> = TenantModel) {}
  switchClient(newModel: Model<Tenant>) {
    this.model = newModel
    return this
  }

  async createTenant(data: CreateTenantDTO): Promise<Tenant> {
    return new this.model(data).save()
  }

  async updateTenant(id: string, data: UpdateTenantDTO): Promise<Tenant> {
    const updated = await this.model.findOneAndUpdate({ id }, data, {
      new: true,
    })
    if (!updated) throw new Error('Tenant not found')
    return updated
  }

  async findTenantById(id: string): Promise<Tenant | null> {
    return this.model.findOne({ id }).lean()
  }

  async findTenantBySlug(slug: string): Promise<Tenant | null> {
    return this.model.findOne({ slug }).lean()
  }

  async deleteTenant(id: string): Promise<void> {
    await this.model.deleteOne({ id })
  }
}
