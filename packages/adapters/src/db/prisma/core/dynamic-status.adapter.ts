import type { PrismaClients, IDynamicStatusAdapter, CreateDynamicStatusDTO } from "@arc-id/data";

export class DynamicStatusAdapter<T extends PrismaClients> implements IDynamicStatusAdapter {
  private prisma: T;

  constructor(prisma: T) {
    this.prisma = prisma;
  }

  switchClient(newClient: T) {
    this.prisma = newClient;
    return this;
  }

  async createStatus(data: CreateDynamicStatusDTO) {
    return (this.prisma as any).dynamicStatus.create({ data });
  }

  async findById(id: string) {
    return (this.prisma as any).dynamicStatus.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return (this.prisma as any).dynamicStatus.findUnique({ where: { name } });
  }
}
