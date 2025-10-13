import type { IDynamicStatusAdapter, CreateDynamicStatusDTO, DynamicStatus } from "@arc-id/data";
import { generateId } from "@arc-id/common";

export class MemoryDynamicStatusAdapter implements IDynamicStatusAdapter {
  private statuses: DynamicStatus[] = [];

  async createStatus(data: CreateDynamicStatusDTO): Promise<DynamicStatus> {
    const status: DynamicStatus = {
      id: generateId(),
      name: data.name,
      sector: data.sector ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as DynamicStatus;

    this.statuses.push(status);
    return status;
  }

  async findById(id: string): Promise<DynamicStatus | null> {
    return this.statuses.find(s => s.id === id) ?? null;
  }

  async findByName(name: string): Promise<DynamicStatus | null> {
    return this.statuses.find(s => s.name === name) ?? null;
  }

  switchClient(_newClient?: any) {
    return this;
  }
}
