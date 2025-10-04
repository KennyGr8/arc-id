import type { Device } from '@generated/postgres'
import type { RegisterDeviceDTO, UpdateDeviceDTO, IBaseAdapter } from '../index'

export interface IDeviceAdapter extends IBaseAdapter<any> {
  registerDevice(data: RegisterDeviceDTO): Promise<Device>
  updateDevice(id: string, data: UpdateDeviceDTO): Promise<Device>
  findById(id: string): Promise<Device | null>
  findByUser(userId: string): Promise<Device[]>
  deleteDevice(id: string): Promise<void>
}
