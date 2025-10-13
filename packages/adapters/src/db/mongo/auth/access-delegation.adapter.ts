import type {
  IAccessDelegationAdapter,
  CreateDelegationDTO,
  AccessDelegation,
} from '@arc-id/data'
import { Db } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoAccessDelegationAdapter implements IAccessDelegationAdapter {
  constructor(private db: Db) {}
  switchClient(newClient: Db) {
    this.db = newClient
    return this
  }

  async createDelegation(data: CreateDelegationDTO): Promise<AccessDelegation> {
    const delegation: AccessDelegation = {
      id: generateId(),
      createdAt: new Date(),
      grantorId: data.grantorId,
      granteeId: data.granteeId,
      tenantId: data.tenantId ?? null, // ✅ default null
      scopes: data.scopes ?? [],
      expiresAt: data.expiresAt ?? null, // ✅ default null
    }
    await this.db
      .collection<AccessDelegation>('accessDelegations')
      .insertOne(delegation)
    return delegation
  }

  async findDelegationsByGrantor(
    grantorId: string
  ): Promise<AccessDelegation[]> {
    return this.db
      .collection<AccessDelegation>('accessDelegations')
      .find({ grantorId })
      .toArray()
  }

  async findDelegationsByGrantee(
    granteeId: string
  ): Promise<AccessDelegation[]> {
    return this.db
      .collection<AccessDelegation>('accessDelegations')
      .find({ granteeId })
      .toArray()
  }

  async revokeDelegation(id: string): Promise<void> {
    await this.db.collection('accessDelegations').deleteOne({ id })
  }
}
