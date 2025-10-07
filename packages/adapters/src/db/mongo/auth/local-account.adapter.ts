// adapters/src/db/mongo/local-account.adapter.ts
import type {
  ILocalAccountAdapter,
  LocalAccount,
  CreateLocalAccountDTO,
  UpdateLocalAccountDTO,
} from '@arc-id/data'
import { Db } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoLocalAccountAdapter implements ILocalAccountAdapter {
  constructor(private db: Db) {}
  switchClient(newClient: Db) {
    this.db = newClient
    return this
  }

  async createLocalAccount(data: CreateLocalAccountDTO): Promise<LocalAccount> {
  const account: LocalAccount = {
    id: generateId(),
    identityId: data.identityId ?? null,
    email: data.email,
    passwordHash: data.passwordHash,
    passwordAlgorithm: data.passwordAlgorithm ?? null,
    createdAt: new Date(),
    updatedAt: new Date(),
    passwordUpdatedAt: data.passwordUpdatedAt ?? null, // required field
  };
    await this.db.collection<LocalAccount>('localAccounts').insertOne(account)
    return account
  }

  async updateLocalAccount(
    id: string,
    data: UpdateLocalAccountDTO
  ): Promise<LocalAccount> {
    const result = await this.db
      .collection<LocalAccount>('localAccounts')
      .findOneAndUpdate(
        { id },
        { $set: { ...data, updatedAt: new Date() } },
        { returnDocument: 'after' }
      )
    if (!result) throw new Error('LocalAccount not found')
    return result
  }

  async findByEmail(email: string): Promise<LocalAccount | null> {
    return this.db.collection<LocalAccount>('localAccounts').findOne({ email })
  }

  async deleteLocalAccount(id: string): Promise<void> {
    await this.db.collection('localAccounts').deleteOne({ id })
  }
}
