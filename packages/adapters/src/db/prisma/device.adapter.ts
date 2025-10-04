// adapters/src/db/prisma/device.adapter.ts
import type {
  PrismaClients,
  IDeviceAdapter,
  RegisterDeviceDTO,
  UpdateDeviceDTO,
  Device
} from '@arc-id/core'

export class DeviceAdapter<T extends PrismaClients> implements IDeviceAdapter {
  private prisma: T

  constructor(prisma: T) {
    this.prisma = prisma
  }

  switchClient(newClient: T) {
    this.prisma = newClient
  }

  async registerDevice(data: RegisterDeviceDTO): Promise<Device> {
    return (this.prisma as any).device.create({ data })
  }

  async updateDevice(id: string, data: UpdateDeviceDTO): Promise<Device> {
    return (this.prisma as any).device.update({ where: { id }, data })
  }

  async findById(id: string): Promise<Device | null> {
    return (this.prisma as any).device.findUnique({ where: { id } })
  }

  async findByUser(userId: string): Promise<Device[]> {
    return (this.prisma as any).device.findMany({ where: { userId } })
  }

  async deleteDevice(id: string): Promise<void> {
    await (this.prisma as any).device.delete({ where: { id } })
  }
}
