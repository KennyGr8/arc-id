import type {
  IClientAdapter,
  CreateClientDTO,
  UpdateClientDTO,
  Client,
} from '@arc-id/data'
import type { Db, Collection } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoClientAdapter implements IClientAdapter {
  private collection: Collection<Client>

  constructor(private db: Db) {
    this.collection = db.collection<Client>('clients')
  }

  switchClient(newDb: Db) {
    this.db = newDb
    this.collection = newDb.collection<Client>('clients')
    return this
  }

  async createClient(data: CreateClientDTO): Promise<Client> {
    const client: Client = {
      id: generateId(),
      tenantId: data.tenantId ?? null,
      name: data.name ?? 'Unnamed Client',
      clientId: data.clientId,
      clientSecret: data.clientSecret ?? null,
      redirectUris: Array.isArray(data.redirectUris)
        ? data.redirectUris
        : data.redirectUris
        ? [data.redirectUris]
        : [],
      grantTypes: Array.isArray(data.grantTypes)
        ? data.grantTypes
        : data.grantTypes
        ? [data.grantTypes]
        : [],
      scopes: Array.isArray(data.scopes)
        ? data.scopes
        : data.scopes
        ? [data.scopes]
        : [],
      public: data.public ?? false,
      createdAt: new Date(),
    }

    await this.collection.insertOne(client)
    return client
  }

  async updateClient(id: string, data: UpdateClientDTO): Promise<Client> {
    const updateData: Partial<Client> = {
      name: data.name,
      clientSecret: data.clientSecret ?? null,
      redirectUris: Array.isArray(data.redirectUris)
        ? data.redirectUris
        : data.redirectUris
        ? [data.redirectUris]
        : undefined,
      grantTypes: Array.isArray(data.grantTypes)
        ? data.grantTypes
        : data.grantTypes
        ? [data.grantTypes]
        : undefined,
      scopes: Array.isArray(data.scopes)
        ? data.scopes
        : data.scopes
        ? [data.scopes]
        : undefined,
      public: data.public,
    }

    // Use returnDocument: 'after' and destructure result directly
    const updated = await this.collection.findOneAndUpdate(
      { id },
      { $set: { ...updateData } },
      { returnDocument: 'after' }
    )

    // `findOneAndUpdate` now returns `Client | null`
    if (!updated) throw new Error(`Client with id '${id}' not found`)
    return updated
  }

  async findByClientId(clientId: string): Promise<Client | null> {
    return this.collection.findOne({ clientId })
  }

  async deleteClient(id: string): Promise<void> {
    await this.collection.deleteOne({ id })
  }
}
