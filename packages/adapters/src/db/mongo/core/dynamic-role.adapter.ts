// adapters/src/db/mongo/dynamic-role.adapter.ts
import type {
  IDynamicRoleAdapter,
  CreateDynamicRoleDTO,
  DynamicRole,
} from '@arc-id/data'
import { Db } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoDynamicRoleAdapter implements IDynamicRoleAdapter {
  constructor(private db: Db) {}
  switchClient(newClient: Db) {
    this.db = newClient
    return this
  }

  async createRole(data: CreateDynamicRoleDTO): Promise<DynamicRole> {
    const role: DynamicRole = {
      id: generateId(),
      createdAt: new Date(),
      name: data.name,
      sector: data.sector ?? null, // ✅ enforce null instead of undefined
    }
    await this.db.collection<DynamicRole>('dynamicRoles').insertOne(role)
    return role
  }

  async findById(id: string): Promise<DynamicRole | null> {
    return this.db.collection<DynamicRole>('dynamicRoles').findOne({ id })
  }

  async findByName(name: string): Promise<DynamicRole | null> {
    return this.db.collection<DynamicRole>('dynamicRoles').findOne({ name })
  }
}
