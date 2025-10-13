// adapters/src/db/prisma/device.adapter.ts
import type {
  PrismaClients,
  IDeviceAdapter,
  RegisterDeviceDTO,
  UpdateDeviceDTO,
  Device
} from '@arc-id/data'

export class DeviceAdapter<T extends PrismaClients> implements IDeviceAdapter {
  private prisma: T

  constructor(prisma: T) {
    this.prisma = prisma
  }

  switchClient(newClient: T) {
    this.prisma = newClient
    return this
  }

  async registerDevice(data: RegisterDeviceDTO): Promise<Device> {
    return (this.prisma as any).device.create({
      data: {
        identityId: data.identityId,
        localAccountId: data.localAccountId ?? null,
        name: data.name ?? null,
        fingerprint: data.fingerprint,
        platform: data.platform ?? null,
        browser: data.browser ?? null,
        city: data.city ?? null,
        country: data.country ?? null,
        lastSeenAt: new Date(),
      },
    })
  }

  async updateDevice(id: string, data: UpdateDeviceDTO): Promise<Device> {
    return (this.prisma as any).device.update({
      where: { id },
      data: {
        ...data,
        lastSeenAt: data.lastSeenAt ?? new Date(),
      },
    })
  }

  async findById(id: string): Promise<Device | null> {
    return (this.prisma as any).device.findUnique({ where: { id } })
  }

  async findByIdentity(identityId: string): Promise<Device[]> {
    return (this.prisma as any).device.findMany({ where: { identityId } })
  }

  async deleteDevice(id: string): Promise<void> {
    await (this.prisma as any).device.delete({ where: { id } })
  }
}
