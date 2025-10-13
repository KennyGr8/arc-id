// adapters/src/db/mongo/membership.adapter.ts
import type {
  IMembershipAdapter,
  CreateMembershipDTO,
  UpdateMembershipDTO,
  Membership,
} from '@arc-id/data'
import { Db } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoMembershipAdapter implements IMembershipAdapter {
  constructor(private db: Db) {}
  switchClient(newClient: Db) {
    this.db = newClient
    return this
  }

  async createMembership(data: CreateMembershipDTO): Promise<Membership> {
    const membership: Membership = {
      id: generateId(),
      createdAt: new Date(),
      identityId: data.identityId,
      tenantId: data.tenantId,
      role: data.role ?? 'MEMBER', // ✅ default
      status: data.status ?? 'ACTIVE', // ✅ default
      profile: data.profile ?? {}, // ✅ enforce JsonValue
    }
    await this.db.collection<Membership>('memberships').insertOne(membership)
    return membership
  }

  async updateMembership(
    id: string,
    data: UpdateMembershipDTO
  ): Promise<Membership> {
    const result = await this.db
      .collection<Membership>('memberships')
      .findOneAndUpdate({ id }, { $set: data }, { returnDocument: 'after' })
    if (!result) throw new Error('Membership not found')
    return result
  }

  async findByUser(identityId: string): Promise<Membership[]> {
    return this.db
      .collection<Membership>('memberships')
      .find({ identityId })
      .toArray()
  }

  async findByTenant(tenantId: string): Promise<Membership[]> {
    return this.db
      .collection<Membership>('memberships')
      .find({ tenantId })
      .toArray()
  }

  async deleteMembership(id: string): Promise<void> {
    await this.db.collection('memberships').deleteOne({ id })
  }
}
