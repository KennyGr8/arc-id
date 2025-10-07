// src/db/memory/core/tenant.adapter.ts
import type { ITenantAdapter, CreateTenantDTO, UpdateTenantDTO, Tenant } from "@arc-id/data";
import { generateId } from "@arc-id/common";

export class MemoryTenantAdapter implements ITenantAdapter {
  private tenants: Tenant[] = [];

  async createTenant(data: CreateTenantDTO): Promise<Tenant> {
    const tenant: Tenant = {
      id: generateId(),
      name: data.name,
      slug: data.slug,
      sector: data.sector ?? null,     // ensure null if not provided
      createdAt: new Date(),
    } as Tenant;

    this.tenants.push(tenant);
    return tenant;
  }

  async updateTenant(id: string, data: UpdateTenantDTO): Promise<Tenant> {
    const tenant = this.tenants.find(t => t.id === id);
    if (!tenant) throw new Error("Tenant not found");
    tenant.name = data.name ?? tenant.name;
    tenant.sector = data.sector ?? tenant.sector;
    return tenant;
  }

  async findTenantById(id: string): Promise<Tenant | null> {
    return this.tenants.find(t => t.id === id) ?? null;
  }

  async findTenantBySlug(slug: string): Promise<Tenant | null> {
    return this.tenants.find(t => t.slug === slug) ?? null;
  }

  async deleteTenant(id: string): Promise<void> {
    this.tenants = this.tenants.filter(t => t.id !== id);
  }

  switchClient(_newClient?: any) {
    return this;
  }
}
