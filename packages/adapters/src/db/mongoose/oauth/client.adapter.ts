// adapters/src/db/mongoose/client.adapter.ts
import type {
  IClientAdapter,
  CreateClientDTO,
  UpdateClientDTO,
  Client,
} from '@arc-id/data'
import { Schema, model, Model } from 'mongoose'

const ClientSchema = new Schema<Client>({
  id: { type: String, required: true, unique: true },
  clientId: { type: String, required: true, unique: true },
  name: { type: String },
  redirectUris: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  scopes: { type: [String], default: [] },
  tenantId: { type: String, default: null },
  clientSecret: { type: String, default: null },
  grantTypes: { type: [String], default: [] },
  public: { type: Boolean, default: false },
})

const ClientModel: Model<Client> = model<Client>('Client', ClientSchema)

export class MongooseClientAdapter implements IClientAdapter {
  constructor(private model: Model<Client> = ClientModel) {}

  switchClient(newModel: Model<Client>) {
    this.model = newModel
    return this
  }

  async createClient(data: CreateClientDTO): Promise<Client> {
    const created = await new this.model(data).save()
    return created.toObject() as Client
  }

  async updateClient(id: string, data: UpdateClientDTO): Promise<Client> {
    const updated = await this.model
      .findOneAndUpdate({ id }, data, { new: true, lean: true })
      .exec()
    if (!updated) throw new Error(`Client with id ${id} not found`)
    return updated
  }

  async findByClientId(clientId: string): Promise<Client | null> {
    return this.model.findOne({ clientId }).lean<Client>().exec()
  }

  async deleteClient(id: string): Promise<void> {
    await this.model.findOneAndDelete({ id }).exec()
  }
}
