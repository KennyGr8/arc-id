import type { PrismaClients, IDynamicRoleAdapter, CreateDynamicRoleDTO } from "@arc-id/data";

export class DynamicRoleAdapter<T extends PrismaClients> implements IDynamicRoleAdapter {
  private prisma: T;

  constructor(prisma: T) {
    this.prisma = prisma;
  }

  switchClient(newClient: T) {
    this.prisma = newClient;
    return this;
  }

  async createRole(data: CreateDynamicRoleDTO) {
    return (this.prisma as any).dynamicRole.create({ data });
  }

  async findById(id: string) {
    return (this.prisma as any).dynamicRole.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return (this.prisma as any).dynamicRole.findUnique({ where: { name } });
  }
}
