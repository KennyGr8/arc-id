import type { IDeviceAdapter, RegisterDeviceDTO, UpdateDeviceDTO, Device } from "@arc-id/data";
import { generateId } from "@arc-id/common";

export class MemoryDeviceAdapter implements IDeviceAdapter {
  private devices: Device[] = [];

  async registerDevice(data: RegisterDeviceDTO): Promise<Device> {
    const device: Device = {
      id: generateId(),
      createdAt: new Date(),
      identityId: data.identityId,
      localAccountId: data.localAccountId ?? null,
      name: data.name ?? null,
      fingerprint: data.fingerprint,
      platform: data.platform ?? null,
      browser: data.browser ?? null,
      city: data.city ?? null,
      country: data.country ?? null,
      lastSeenAt: new Date(),
    };

    this.devices.push(device);
    return device;
  }

  async findById(id: string): Promise<Device | null> {
    return this.devices.find(d => d.id === id) ?? null;
  }

  async findByIdentity(identityId: string): Promise<Device[]> {
    return this.devices.filter(d => d.identityId === identityId);
  }

  async updateDevice(id: string, data: UpdateDeviceDTO): Promise<Device> {
    const device = await this.findById(id);
    if (!device) throw new Error("Device not found");
    Object.assign(device, data, { lastSeenAt: new Date() });
    return device;
  }

  async deleteDevice(id: string): Promise<void> {
    this.devices = this.devices.filter(d => d.id !== id);
  }

  switchClient(_newClient?: any) {
    return this;
  }
}
