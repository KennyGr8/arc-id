import type {
  IAuthorizationCodeAdapter,
  CreateAuthorizationCodeDTO,
  AuthorizationCode,
} from '@arc-id/data'
import type { Db, WithId, Document } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoAuthorizationCodeAdapter
  implements IAuthorizationCodeAdapter
{
  private collection

  constructor(private db: Db) {
    this.collection = db.collection('authorizationCodes')
  }

  switchClient(newDb: Db) {
    this.db = newDb
    this.collection = newDb.collection('authorizationCodes')
    return this
  }

  private normalize(doc: WithId<Document>): AuthorizationCode {
    return {
      id: (doc.id as string) ?? doc._id.toString(),
      code: doc.code as string,
      clientId: doc.clientId as string,
      identityId: doc.identityId as string,
      redirectUri: (doc.redirectUri as string) ?? null,
      scopes: Array.isArray(doc.scopes) ? (doc.scopes as string[]) : [],
      createdAt: doc.createdAt ? new Date(doc.createdAt) : new Date(),
      expiresAt: doc.expiresAt ? new Date(doc.expiresAt) : new Date(),
      consumed: Boolean(doc.consumed),
    }
  }

  async createCode(
    data: CreateAuthorizationCodeDTO
  ): Promise<AuthorizationCode> {
    const code: AuthorizationCode = {
      id: generateId(),
      code: data.code,
      clientId: data.clientId,
      identityId: data.identityId,
      redirectUri: data.redirectUri ?? null,
      scopes: Array.isArray(data.scopes) ? data.scopes : [],
      createdAt: new Date(),
      expiresAt: data.expiresAt,
      consumed: false,
    }

    await this.collection.insertOne(code)
    return code
  }

  async consumeCode(code: string): Promise<AuthorizationCode | null> {
    const result = await this.collection.findOneAndUpdate(
      { code },
      { $set: { consumed: true } },
      { returnDocument: 'after' }
    )

    const updated = result
    if (!updated) return null

    return this.normalize(updated)
  }

  async findByCode(code: string): Promise<AuthorizationCode | null> {
    const doc = await this.collection.findOne({ code })
    if (!doc) return null
    return this.normalize(doc as WithId<Document>)
  }
}
