import type {
  IRevokedJtiAdapter,
  CreateRevokedJtiDTO,
  RevokedJti,
} from '@arc-id/data'
import { Db } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoRevokedJtiAdapter implements IRevokedJtiAdapter {
  constructor(private db: Db) {}

  switchClient(newClient: Db) {
    this.db = newClient
    return this
  }

  async revoke(data: CreateRevokedJtiDTO): Promise<RevokedJti> {
    const doc: RevokedJti = {
      id: generateId(),
      jti: data.jti,
      revokedAt: new Date(),
      reason: data.reason ?? null, // ✅ default null
    }
    await this.db.collection<RevokedJti>('revokedJtis').insertOne(doc)
    return doc
  }

  async findByJti(jti: string): Promise<RevokedJti | null> {
    return this.db.collection<RevokedJti>('revokedJtis').findOne({ jti })
  }
}
