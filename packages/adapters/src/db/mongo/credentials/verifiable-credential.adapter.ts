// adapters/src/db/mongo/verifiable-credential.adapter.ts
import type {
  VerifiableCredential,
  CreateVerifiableCredentialDTO,
  UpdateVerifiableCredentialDTO,
  IVerifiableCredentialAdapter,
} from '@arc-id/data'
import { Db } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoVerifiableCredentialAdapter
  implements IVerifiableCredentialAdapter
{
  constructor(private db: Db) {}

  switchClient(newClient: Db) {
    this.db = newClient
    return this
  }

  async createCredential(
    data: CreateVerifiableCredentialDTO
  ): Promise<VerifiableCredential> {
    const credential: VerifiableCredential = {
      id: generateId(),
      identityId: data.identityId,
      issuer: data.issuer,
      credential: data.credential,
      credentialHash: data.credentialHash,
      status: data.status ?? 'PENDING',
      proof: (data.proof ?? {}) as any,
      issuedAt: data.issuedAt ?? new Date(),
      expiresAt: data.expiresAt ?? null,
      createdAt: new Date(),
    }
    await this.db
      .collection<VerifiableCredential>('verifiableCredentials')
      .insertOne(credential)
    return credential
  }

  async updateCredential(
    id: string,
    data: UpdateVerifiableCredentialDTO
  ): Promise<VerifiableCredential> {
    const result = await this.db
      .collection<VerifiableCredential>('verifiableCredentials')
      .findOneAndUpdate(
        { id },
        { $set: { ...data, updatedAt: new Date() } },
        { returnDocument: 'after' }
      )
    if (!result) {
      throw new Error(`VerifiableCredential with id=${id} not found`)
    }
    return result
  }
}
