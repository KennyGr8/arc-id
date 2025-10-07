// adapters/src/db/mongoose/wallet.adapter.ts
import type {
  Wallet,
  CreateWalletDTO,
  UpdateWalletDTO,
  IWalletAdapter,
} from '@arc-id/data'
import { Schema, model, Model } from 'mongoose'

const WalletSchema = new Schema<Wallet>({
  id: { type: String, required: true, unique: true },
  identityId: { type: String, required: true },
  provider: { type: String, required: true },
  providerWalletId: { type: String, required: true },
  metadata: { type: Schema.Types.Mixed, default: {} },
  createdAt: { type: Date, default: Date.now },
})

const WalletModel: Model<Wallet> = model<Wallet>('Wallet', WalletSchema)

export class MongooseWalletAdapter implements IWalletAdapter {
  constructor(private model: Model<Wallet> = WalletModel) {}

  switchClient(newModel: Model<Wallet>) {
    this.model = newModel
    return this
  }

  async createWallet(data: CreateWalletDTO): Promise<Wallet> {
    return new this.model({
      ...data,
      createdAt: new Date(),
    }).save()
  }

  async updateWallet(id: string, data: UpdateWalletDTO): Promise<Wallet> {
    const updated = await this.model
      .findOneAndUpdate({ id }, { ...data }, { new: true })
      .lean()
      .exec()

    if (!updated) {
      throw new Error(`Wallet with id=${id} not found`)
    }
    return updated as Wallet
  }
}
