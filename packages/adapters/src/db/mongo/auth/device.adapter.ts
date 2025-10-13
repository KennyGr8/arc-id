// adapters/src/db/mongo/device.adapter.ts
import type {
  IDeviceAdapter,
  RegisterDeviceDTO,
  UpdateDeviceDTO,
  Device,
} from '@arc-id/data'
import { Db } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoDeviceAdapter implements IDeviceAdapter {
  constructor(private db: Db) {}
  switchClient(newClient: Db) {
    this.db = newClient
    return this
  }

  async registerDevice(data: RegisterDeviceDTO): Promise<Device> {
    const device: Device = {
      id: generateId(),
      createdAt: new Date(),
      lastSeenAt: new Date(),
      identityId: data.identityId,
      localAccountId: data.localAccountId ?? null,
      name: data.name ?? null,
      fingerprint: data.fingerprint,
      platform: data.platform ?? null,
      browser: data.browser ?? null,
      city: data.city ?? null,
      country: data.country ?? null,
    }
    await this.db.collection<Device>('devices').insertOne(device)
    return device
  }

  async updateDevice(id: string, data: UpdateDeviceDTO): Promise<Device> {
    const result = await this.db
      .collection<Device>('devices')
      .findOneAndUpdate(
        { id },
        { $set: { ...data, lastSeenAt: new Date() } },
        { returnDocument: 'after' }
      )
    if (!result) throw new Error('Device not found')
    return result
  }

  async findById(id: string): Promise<Device | null> {
    return this.db.collection<Device>('devices').findOne({ id })
  }

  async findByIdentity(identityId: string): Promise<Device[]> {
    return this.db.collection<Device>('devices').find({ identityId }).toArray()
  }

  async deleteDevice(id: string): Promise<void> {
    await this.db.collection('devices').deleteOne({ id })
  }
}
