import type {
  ISessionAdapter,
  CreateSessionDTO,
  UpdateSessionDTO,
  Session,
} from '@arc-id/data'
import { Db } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoSessionAdapter implements ISessionAdapter {
  constructor(private db: Db) {}
  switchClient(newClient: Db) {
    this.db = newClient
    return this
  }

  async createSession(data: CreateSessionDTO): Promise<Session> {
    const session: Session = {
      id: generateId(),
      identityId: data.identityId,
      localAccountId: data.localAccountId ?? null,
      ip: data.ip ?? null,
      userAgent: data.userAgent ?? null,
      deviceId: data.deviceId ?? null,
      valid: data.valid ?? true, // ✅ default true
      createdAt: new Date(),
      expiresAt: data.expiresAt,
      lastUsedAt: data.lastUsedAt,
    }
    await this.db.collection<Session>('sessions').insertOne(session)
    return session
  }

  async findSessionById(id: string): Promise<Session | null> {
    return this.db.collection<Session>('sessions').findOne({ id })
  }

  async findSessionsByUser(identityId: string): Promise<Session[]> {
    return this.db
      .collection<Session>('sessions')
      .find({ identityId })
      .toArray()
  }

  async updateSession(id: string, data: UpdateSessionDTO): Promise<Session> {
    const result = await this.db
      .collection<Session>('sessions')
      .findOneAndUpdate(
        { id },
        { $set: { ...data, updatedAt: new Date() } },
        { returnDocument: 'after' }
      )
    if (!result) throw new Error('Session not found')
    return result
  }

  async revokeSession(id: string): Promise<void> {
    await this.db.collection('sessions').deleteOne({ id })
  }

  async revokeAllUserSessions(identityId: string): Promise<void> {
    await this.db.collection('sessions').deleteMany({ identityId })
  }
}
