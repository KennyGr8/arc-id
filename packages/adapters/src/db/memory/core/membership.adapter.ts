import type { IMembershipAdapter, CreateMembershipDTO, UpdateMembershipDTO, Membership } from "@arc-id/data";
import { generateId } from "@arc-id/common";

export class MemoryMembershipAdapter implements IMembershipAdapter {
  private memberships: Membership[] = [];

  async createMembership(data: CreateMembershipDTO): Promise<Membership> {
    const membership: Membership = {
      id: generateId(),
      createdAt: new Date(),
      identityId: data.identityId,
      tenantId: data.tenantId,
      status: data.status ?? "ACTIVE",
      role: data.role ?? "USER",
      profile: data.profile ?? {},
    };
    this.memberships.push(membership);
    return membership;
  }

  async updateMembership(id: string, data: UpdateMembershipDTO): Promise<Membership> {
    const membership = this.memberships.find(m => m.id === id);
    if (!membership) throw new Error("Membership not found");
    Object.assign(membership, data);
    return membership;
  }

  async findByUser(identityId: string): Promise<Membership[]> {
    return this.memberships.filter(m => m.identityId === identityId);
  }

  async findByTenant(tenantId: string): Promise<Membership[]> {
    return this.memberships.filter(m => m.tenantId === tenantId);
  }

  async deleteMembership(id: string): Promise<void> {
    this.memberships = this.memberships.filter(m => m.id !== id);
  }

  switchClient(_newClient?: any) {
    return this;
  }
}
