import type {
  IAccessTokenAdapter,
  CreateAccessTokenDTO,
  AccessToken,
} from '@arc-id/data'
import type { Db } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoAccessTokenAdapter implements IAccessTokenAdapter {
  private collection

  constructor(private db: Db) {
    this.collection = db.collection('accessTokens')
  }

  switchClient(newDb: Db) {
    this.db = newDb
    this.collection = newDb.collection('accessTokens')
    return this
  }

  async createToken(data: CreateAccessTokenDTO): Promise<AccessToken> {
    const doc: AccessToken = {
      id: generateId(),
      token: data.token,
      clientId: data.clientId,
      identityId: data.identityId,
      scopes: Array.isArray(data.scopes) ? data.scopes : [data.scopes],
      issuedAt: data.issuedAt ?? new Date(),
      expiresAt: data.expiresAt,
      jti: data.jti ?? null,
      revoked: data.revoked ?? false,
    }
    await this.collection.insertOne(doc)
    return doc
  }

  async revokeToken(token: string): Promise<void> {
    await this.collection.updateOne({ token }, { $set: { revoked: true } })
  }

  async findByToken(token: string): Promise<AccessToken | null> {
    const doc = await this.collection.findOne({ token })
    if (!doc) return null
    return {
      id: doc.id ?? doc._id.toString(),
      token: doc.token,
      clientId: doc.clientId,
      identityId: doc.identityId,
      scopes: doc.scopes ?? [],
      issuedAt: doc.issuedAt,
      expiresAt: doc.expiresAt,
      jti: doc.jti ?? null,
      revoked: doc.revoked ?? false,
    }
  }

  async findByJti(jti: string): Promise<AccessToken | null> {
    const doc = await this.collection.findOne({ jti })
    if (!doc) return null
    return {
      id: doc.id ?? doc._id.toString(),
      token: doc.token,
      clientId: doc.clientId,
      identityId: doc.identityId,
      scopes: doc.scopes ?? [],
      issuedAt: doc.issuedAt,
      expiresAt: doc.expiresAt,
      jti: doc.jti ?? null,
      revoked: doc.revoked ?? false,
    }
  }
}
