import type { IIdentityAdapter, CreateIdentityDTO, UpdateIdentityDTO, Identity } from "@arc-id/data";
import { generateId } from "@arc-id/common";
import { Role, UserStatus } from "@arc-id/data";
import type { JsonValue } from "@prisma/client/runtime/library";

export class MemoryIdentityAdapter implements IIdentityAdapter {
  private identities: Identity[] = [];

  async createIdentity(data: CreateIdentityDTO): Promise<Identity> {
    const identity: Identity = {
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      primaryEmail: data.primaryEmail,
      name: data.name ?? null,
      emailVerified: false,
      status: data.status ?? UserStatus.ACTIVE,
      role: data.role ?? Role.USER,
      dynamicRoleId: data.dynamicRoleId ?? null,
      dynamicStatusId: data.dynamicStatusId ?? null,
      metadata: (data.metadata as JsonValue) ?? {},
    };

    this.identities.push(identity);
    return identity;
  }

  async updateIdentity(id: string, data: UpdateIdentityDTO): Promise<Identity> {
    const existing = await this.findIdentityById(id);
    if (!existing) throw new Error("Identity not found");

    const updated: Identity = {
      ...existing,
      ...data,
      updatedAt: new Date(),
    };

    const idx = this.identities.findIndex(u => u.id === id);
    this.identities[idx] = updated;
    return updated;
  }

  async findIdentityById(id: string): Promise<Identity | null> {
    return this.identities.find(u => u.id === id) ?? null;
  }

  async findIdentityByEmail(email: string): Promise<Identity | null> {
    return this.identities.find(u => u.primaryEmail === email) ?? null;
  }

  async deleteIdentity(id: string): Promise<void> {
    this.identities = this.identities.filter(u => u.id !== id);
  }

  async assignRole(identityId: string, roleId: string): Promise<Identity> {
    const identity = await this.findIdentityById(identityId);
    if (!identity) throw new Error("Identity not found");
    identity.dynamicRoleId = roleId;
    return identity;
  }

  async updateStatus(identityId: string, statusId: string): Promise<Identity> {
    const identity = await this.findIdentityById(identityId);
    if (!identity) throw new Error("Identity not found");
    identity.dynamicStatusId = statusId;
    return identity;
  }

  switchClient(_newClient?: any) {
    return this;
  }
}
