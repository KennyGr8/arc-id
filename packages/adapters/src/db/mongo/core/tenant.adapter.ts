// adapters/src/db/mongo/tenant.adapter.ts
import type {
  ITenantAdapter,
  CreateTenantDTO,
  UpdateTenantDTO,
  Tenant,
} from '@arc-id/data'
import { Db } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoTenantAdapter implements ITenantAdapter {
  constructor(private db: Db) {}
  switchClient(newClient: Db) {
    this.db = newClient
    return this
  }

  async createTenant(data: CreateTenantDTO): Promise<Tenant> {
    const tenant: Tenant = {
      id: generateId(),
      createdAt: new Date(),
      name: data.name,
      slug: data.slug,
      sector: data.sector ?? null,  // ✅ enforce null instead of undefined
    }
    await this.db.collection<Tenant>('tenants').insertOne(tenant)
    return tenant
  }

  async updateTenant(id: string, data: UpdateTenantDTO): Promise<Tenant> {
    const result = await this.db
      .collection<Tenant>('tenants')
      .findOneAndUpdate({ id }, { $set: data }, { returnDocument: 'after' })
    if (!result) throw new Error('Tenant not found')
    return result
  }

  async findTenantById(id: string): Promise<Tenant | null> {
    return this.db.collection<Tenant>('tenants').findOne({ id })
  }

  async findTenantBySlug(slug: string): Promise<Tenant | null> {
    return this.db.collection<Tenant>('tenants').findOne({ slug })
  }

  async deleteTenant(id: string): Promise<void> {
    await this.db.collection('tenants').deleteOne({ id })
  }
}
