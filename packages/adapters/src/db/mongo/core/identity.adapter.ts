// adapters/src/db/mongo/identity.adapter.ts
import type {
  IIdentityAdapter,
  Identity,
  CreateIdentityDTO,
  UpdateIdentityDTO,
  Role,
  UserStatus,
} from '@arc-id/data'
import { Db } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoIdentityAdapter implements IIdentityAdapter {
  constructor(private db: Db) {}
  switchClient(newClient: Db) {
    this.db = newClient
    return this
  }

  async createIdentity(data: CreateIdentityDTO): Promise<Identity> {
    const identity: Identity = {
      id: generateId(),
      name: data.name ?? null,
      primaryEmail: data.primaryEmail ?? null,
      role: data.role ?? 'USER', // ✅ fallback
      status: data.status ?? 'ACTIVE', // ✅ fallback
      dynamicRoleId: data.dynamicRoleId ?? null,
      dynamicStatusId: data.dynamicStatusId ?? null,
      emailVerified: false,
      metadata: data.metadata ?? {},
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    await this.db.collection<Identity>('identities').insertOne(identity)
    return identity
  }

  async updateIdentity(id: string, data: UpdateIdentityDTO): Promise<Identity> {
    const result = await this.db
      .collection<Identity>('identities')
      .findOneAndUpdate(
        { id },
        { $set: { ...data, updatedAt: new Date() } },
        { returnDocument: 'after' }
      )
    if (!result) throw new Error('Identity not found')
    return result
  }

  async findIdentityById(id: string): Promise<Identity | null> {
    return this.db.collection<Identity>('identities').findOne({ id })
  }

  async findIdentityByEmail(email: string): Promise<Identity | null> {
    return this.db
      .collection<Identity>('identities')
      .findOne({ primaryEmail: email })
  }

  async deleteIdentity(id: string): Promise<void> {
    await this.db.collection('identities').deleteOne({ id })
  }

  async assignRole(identityId: string, roleId: string): Promise<Identity> {
    const result = await this.db
      .collection<Identity>('identities')
      .findOneAndUpdate(
        { id: identityId },
        { $set: { dynamicRoleId: roleId } },
        { returnDocument: 'after' }
      )
    if (!result) throw new Error('Identity not found')
    return result
  }

  async updateStatus(identityId: string, statusId: string): Promise<Identity> {
    const result = await this.db
      .collection<Identity>('identities')
      .findOneAndUpdate(
        { id: identityId },
        { $set: { dynamicStatusId: statusId } },
        { returnDocument: 'after' }
      )
    if (!result) throw new Error('Identity not found')
    return result
  }
}
