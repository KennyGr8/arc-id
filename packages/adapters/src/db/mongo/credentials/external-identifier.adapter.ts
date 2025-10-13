// adapters/src/db/mongo/external-identifier.adapter.ts
import type {
  ExternalIdentifier,
  CreateExternalIdentifierDTO,
  UpdateExternalIdentifierDTO,
  IExternalIdentifierAdapter,
} from '@arc-id/data'
import { Db } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoExternalIdentifierAdapter
  implements IExternalIdentifierAdapter
{
  constructor(private db: Db) {}

  switchClient(newClient: Db) {
    this.db = newClient
    return this
  }

  async createIdentifier(
    data: CreateExternalIdentifierDTO
  ): Promise<ExternalIdentifier> {
    const identifier: ExternalIdentifier = {
      id: generateId(),
      identityId: data.identityId,
      type: data.type,
      valueHash: data.valueHash,
      displayValue: data.displayValue ?? null,
      verified: false,
      verifiedAt: null,
      verificationMethod: null,
      verificationSource: null,
      metadata: (data.metadata ?? {}) as any,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    await this.db
      .collection<ExternalIdentifier>('externalIdentifiers')
      .insertOne(identifier)
    return identifier
  }

  async updateIdentifier(
    id: string,
    data: UpdateExternalIdentifierDTO
  ): Promise<ExternalIdentifier> {
    const result = await this.db
      .collection<ExternalIdentifier>('externalIdentifiers')
      .findOneAndUpdate(
        { id },
        { $set: { ...data, updatedAt: new Date() } },
        { returnDocument: 'after' }
      )

    if (!result) {
      throw new Error(`ExternalIdentifier with id=${id} not found`)
    }
    return result
  }

  async findByTypeAndHash(
    type: string,
    valueHash: string
  ): Promise<ExternalIdentifier | null> {
    return this.db
      .collection<ExternalIdentifier>('externalIdentifiers')
      .findOne({ type, valueHash })
  }
}
