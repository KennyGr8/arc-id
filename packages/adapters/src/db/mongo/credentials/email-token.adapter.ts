// adapters/src/db/mongo/email-token.adapter.ts
import type {
  IEmailTokenAdapter,
  CreateEmailTokenDTO,
  EmailToken,
} from '@arc-id/data'
import { Db, Collection } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoEmailTokenAdapter implements IEmailTokenAdapter {
  private collection: Collection<EmailToken>

  constructor(private db: Db) {
    this.collection = db.collection<EmailToken>('emailTokens')
  }

  switchClient(newClient: Db) {
    this.db = newClient
    this.collection = newClient.collection<EmailToken>('emailTokens')
    return this
  }

  async createToken(data: CreateEmailTokenDTO): Promise<EmailToken> {
    const token: EmailToken = {
      id: generateId(),
      createdAt: new Date(),
      consumed: false,
      ...data,
    }
    await this.collection.insertOne(token)
    return token
  }

  async findById(id: string): Promise<EmailToken | null> {
    return this.collection.findOne({ id })
  }

  async consumeToken(id: string): Promise<void> {
    await this.collection.updateOne({ id }, { $set: { consumed: true } })
  }
}
