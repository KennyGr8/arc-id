// adapters/src/db/mongo/tenant-policy.adapter.ts
import type {
  ITenantPolicyAdapter,
  CreateTenantPolicyDTO,
  UpdateTenantPolicyDTO,
  TenantPolicy,
} from '@arc-id/data'
import { Db } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoTenantPolicyAdapter implements ITenantPolicyAdapter {
  constructor(private db: Db) {}
  switchClient(newClient: Db) {
    this.db = newClient
    return this
  }

  async createPolicy(data: CreateTenantPolicyDTO): Promise<TenantPolicy> {
    const policy: TenantPolicy = {
      id: generateId(),
      createdAt: new Date(),
      tenantId: data.tenantId,
      requireMfa: data.requireMfa ?? false, // ✅ enforce boolean
      passwordRules: data.passwordRules ?? {}, // ✅ enforce JsonValue
      loginMethods: data.loginMethods ?? [],
    }
    await this.db.collection<TenantPolicy>('tenantPolicies').insertOne(policy)
    return policy
  }

  async updatePolicy(
    id: string,
    data: UpdateTenantPolicyDTO
  ): Promise<TenantPolicy> {
    const result = await this.db
      .collection<TenantPolicy>('tenantPolicies')
      .findOneAndUpdate({ id }, { $set: data }, { returnDocument: 'after' })
    if (!result) throw new Error('TenantPolicy not found')
    return result
  }

  async findByTenant(tenantId: string): Promise<TenantPolicy | null> {
    return this.db
      .collection<TenantPolicy>('tenantPolicies')
      .findOne({ tenantId })
  }
}
