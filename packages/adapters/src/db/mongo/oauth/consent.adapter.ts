import type {
  IConsentAdapter,
  CreateConsentDTO,
  UpdateConsentDTO,
} from '@arc-id/data'
import type { Db, Collection } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoConsentAdapter implements IConsentAdapter {
  private collection: Collection<any>

  constructor(private db: Db) {
    this.collection = db.collection('consents')
  }

  switchClient(newDb: Db) {
    this.db = newDb
    this.collection = newDb.collection('consents')
    return this
  }

  async createConsent(data: CreateConsentDTO) {
    const consent = {
      id: generateId(),
      identityId: data.identityId,
      clientId: data.clientId,
      scopes: data.scopes ?? [],
      grantedAt: data.grantedAt ?? new Date(),
      revokedAt: null,
    }
    await this.collection.insertOne(consent)
    return consent
  }

  async updateConsent(id: string, data: UpdateConsentDTO) {
    const updated = await this.collection.findOneAndUpdate(
      { id },
      { $set: data },
      { returnDocument: 'after' }
    )
    if (!updated.value) throw new Error('Consent not found')
    return updated.value
  }
}
