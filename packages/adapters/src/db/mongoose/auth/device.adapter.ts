// adapters/src/db/mongoose/device.adapter.ts
import type {
  IDeviceAdapter,
  RegisterDeviceDTO,
  UpdateDeviceDTO,
  Device,
} from '@arc-id/data'
import { Schema, model, Model } from 'mongoose'

const DeviceSchema = new Schema<Device>({
  id: { type: String, required: true, unique: true },
  identityId: { type: String, required: true },
  localAccountId: { type: String },
  name: { type: String },
  fingerprint: { type: String, required: true, unique: true },
  platform: { type: String },
  browser: { type: String },
  city: { type: String },
  country: { type: String },
  createdAt: { type: Date, default: Date.now },
  lastSeenAt: { type: Date, default: Date.now },
})

const DeviceModel: Model<Device> = model<Device>('Device', DeviceSchema)

export class MongooseDeviceAdapter implements IDeviceAdapter {
  constructor(private model: Model<Device> = DeviceModel) {}
  switchClient(newModel: Model<Device>) {
    this.model = newModel
    return this
  }

  async registerDevice(data: RegisterDeviceDTO): Promise<Device> {
    return new this.model({ ...data, lastSeenAt: new Date() }).save()
  }

  async updateDevice(id: string, data: UpdateDeviceDTO): Promise<Device> {
    const updated = await this.model.findOneAndUpdate(
      { id },
      { ...data, lastSeenAt: new Date() },
      { new: true }
    )
    if (!updated) throw new Error('Device not found')
    return updated
  }

  async findById(id: string): Promise<Device | null> {
    return this.model.findOne({ id }).lean()
  }

  async findByIdentity(identityId: string): Promise<Device[]> {
    return this.model.find({ identityId }).lean()
  }

  async deleteDevice(id: string): Promise<void> {
    await this.model.deleteOne({ id })
  }
}
