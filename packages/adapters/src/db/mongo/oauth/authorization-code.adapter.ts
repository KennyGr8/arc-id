import type {
  IAuthorizationCodeAdapter,
  CreateAuthorizationCodeDTO,
  AuthorizationCode,
} from '@arc-id/data'
import type { Db } from 'mongodb'
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
      createdAt: data.createdAt ?? new Date(),
      expiresAt: data.expiresAt,
      consumed: false,
    }

    await this.collection.insertOne(code)
    return code
  }

  async consumeCode(code: string): Promise<AuthorizationCode | null> {
    const updated = await this.collection.findOneAndUpdate(
      { code },
      { $set: { consumed: true } },
      { returnDocument: 'after' }
    )
    return updated.value ?? null
  }

  async findByCode(code: string): Promise<AuthorizationCode | null> {
    return this.collection.findOne({ code })
  }
}