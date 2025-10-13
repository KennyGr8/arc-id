import type { IDynamicRoleAdapter, CreateDynamicRoleDTO, DynamicRole } from "@arc-id/data";
import { generateId } from "@arc-id/common";

export class MemoryDynamicRoleAdapter implements IDynamicRoleAdapter {
  private roles: DynamicRole[] = [];

  async createRole(data: CreateDynamicRoleDTO): Promise<DynamicRole> {
    const role: DynamicRole = {
      id: generateId(),
      name: data.name,
      sector: data.sector ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as DynamicRole;

    this.roles.push(role);
    return role;
  }

  async findById(id: string): Promise<DynamicRole | null> {
    return this.roles.find(r => r.id === id) ?? null;
  }

  async findByName(name: string): Promise<DynamicRole | null> {
    return this.roles.find(r => r.name === name) ?? null;
  }

  switchClient(_newClient?: any) {
    return this;
  }
}
