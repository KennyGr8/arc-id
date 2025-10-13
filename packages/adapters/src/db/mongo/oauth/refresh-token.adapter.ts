import type {
  IRefreshTokenAdapter,
  CreateRefreshTokenDTO,
  RefreshToken,
} from '@arc-id/data'
import type { Db, Collection } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoRefreshTokenAdapter implements IRefreshTokenAdapter {
  private collection: Collection<RefreshToken>

  constructor(private db: Db) {
    this.collection = db.collection<RefreshToken>('refreshTokens')
  }

  switchClient(newDb: Db) {
    this.db = newDb
    this.collection = newDb.collection<RefreshToken>('refreshTokens')
    return this
  }

  async createToken(data: CreateRefreshTokenDTO): Promise<RefreshToken> {
    const token: RefreshToken = {
      id: generateId(),
      token: data.token,
      identityId: data.identityId,
      clientId: data.clientId,
      issuedAt: new Date(),
      expiresAt: data.expiresAt,
      revoked: false,
      rotation: 0,
    }

    await this.collection.insertOne(token)
    return token
  }

  async revokeToken(token: string): Promise<void> {
    await this.collection.updateOne({ token }, { $set: { revoked: true } })
  }

  async rotateToken(token: string): Promise<RefreshToken | null> {
    const updated = await this.collection.findOneAndUpdate(
      { token },
      { $inc: { rotation: 1 } },
      { returnDocument: 'after' }
    )
    return updated ?? null
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return this.collection.findOne({ token })
  }
}
