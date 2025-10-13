// adapters/src/db/mongo/wallet.adapter.ts
import type {
  Wallet,
  CreateWalletDTO,
  UpdateWalletDTO,
  IWalletAdapter,
} from '@arc-id/data'
import { Db } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoWalletAdapter implements IWalletAdapter {
  constructor(private db: Db) {}

  switchClient(newClient: Db) {
    this.db = newClient
    return this
  }

  async createWallet(data: CreateWalletDTO): Promise<Wallet> {
    const wallet: Wallet = {
      id: generateId(),
      identityId: data.identityId,
      provider: data.provider,
      providerWalletId: data.providerWalletId,
      metadata: (data.metadata ?? {}) as any,
      createdAt: new Date(),
    }
    await this.db.collection<Wallet>('wallets').insertOne(wallet)
    return wallet
  }

  async updateWallet(id: string, data: UpdateWalletDTO): Promise<Wallet> {
    const result = await this.db
      .collection<Wallet>('wallets')
      .findOneAndUpdate(
        { id },
        { $set: { ...data } },
        { returnDocument: 'after' }
      )
    if (!result) {
      throw new Error(`Wallet with id=${id} not found`)
    }
    return result
  }
}
