// adapters/src/db/mongo/dynamic-status.adapter.ts
import type {
  IDynamicStatusAdapter,
  CreateDynamicStatusDTO,
  DynamicStatus,
} from '@arc-id/data'
import { Db } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoDynamicStatusAdapter implements IDynamicStatusAdapter {
  constructor(private db: Db) {}
  switchClient(newClient: Db) {
    this.db = newClient
    return this
  }

  async createStatus(data: CreateDynamicStatusDTO): Promise<DynamicStatus> {
    const status: DynamicStatus = {
      id: generateId(),
      createdAt: new Date(),
      name: data.name,
      sector: data.sector ?? null, // ✅ enforce null instead of undefined
    }
    await this.db.collection<DynamicStatus>('dynamicStatuses').insertOne(status)
    return status
  }

  async findById(id: string): Promise<DynamicStatus | null> {
    return this.db.collection<DynamicStatus>('dynamicStatuses').findOne({ id })
  }

  async findByName(name: string): Promise<DynamicStatus | null> {
    return this.db
      .collection<DynamicStatus>('dynamicStatuses')
      .findOne({ name })
  }
}
