import type { IMfaAdapter, CreateMfaDTO, UpdateMfaDTO, Mfa } from '@arc-id/data'
import { Db } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoMfaAdapter implements IMfaAdapter {
  constructor(private db: Db) {}
  switchClient(newClient: Db) {
    this.db = newClient
    return this
  }

  async createMfa(data: CreateMfaDTO): Promise<Mfa> {
    const mfa: Mfa = {
      id: generateId(),
      identityId: data.identityId,
      type: data.type,
      secret: data.secret ?? null, // ✅ default null
      enabled: data.enabled ?? false, // ✅ default false
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    await this.db.collection<Mfa>('mfas').insertOne(mfa)
    return mfa
  }

  async updateMfa(id: string, data: UpdateMfaDTO): Promise<Mfa> {
    const result = await this.db
      .collection<Mfa>('mfas')
      .findOneAndUpdate(
        { id },
        { $set: { ...data, updatedAt: new Date() } },
        { returnDocument: 'after' }
      )
    if (!result) throw new Error('MFA not found')
    return result
  }

  async findById(id: string): Promise<Mfa | null> {
    return this.db.collection<Mfa>('mfas').findOne({ id })
  }

  async findByIdentity(identityId: string): Promise<Mfa[]> {
    return this.db.collection<Mfa>('mfas').find({ identityId }).toArray()
  }

  async enableMfa(id: string): Promise<Mfa> {
    return this.updateMfa(id, { enabled: true })
  }

  async disableMfa(id: string): Promise<Mfa> {
    return this.updateMfa(id, { enabled: false })
  }

  async deleteMfa(id: string): Promise<void> {
    await this.db.collection('mfas').deleteOne({ id })
  }
}
