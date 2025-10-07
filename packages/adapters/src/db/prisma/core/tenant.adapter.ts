// adapters/src/db/prisma/tenant.adapter.ts
import type {
  Tenant,
  CreateTenantDTO,
  UpdateTenantDTO,
  ITenantAdapter,
  PrismaClients
} from "@arc-id/data";

export class TenantAdapter<T extends PrismaClients> implements ITenantAdapter {
  private prisma: T;
  constructor(prisma: T) {
    this.prisma = prisma;
  }

  switchClient(newClient: T) {
    this.prisma = newClient;
  }

  async createTenant(data: CreateTenantDTO): Promise<Tenant> {
    return (this.prisma as any).tenant.create({ data });
  }

  async updateTenant(id: string, data: UpdateTenantDTO): Promise<Tenant> {
    return (this.prisma as any).tenant.update({ where: { id }, data });
  }

  async findTenantById(id: string): Promise<Tenant | null> {
    return (this.prisma as any).tenant.findUnique({ where: { id } });
  }

  async findTenantBySlug(slug: string): Promise<Tenant | null> {
    return (this.prisma as any).tenant.findUnique({ where: { slug } });
  }

  async deleteTenant(id: string): Promise<void> {
    await (this.prisma as any).tenant.delete({ where: { id } });
  }
}
