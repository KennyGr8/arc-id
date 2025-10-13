import type { PrismaClients, IConsentAdapter, CreateConsentDTO, UpdateConsentDTO } from "@arc-id/data";

export class ConsentAdapter<T extends PrismaClients> implements IConsentAdapter {
  private prisma: T;

  constructor(prisma: T) {
    this.prisma = prisma;
  }

  switchClient(newClient: T) {
    this.prisma = newClient;
    return this;
  }

  async createConsent(data: CreateConsentDTO) {
    return (this.prisma as any).consent.create({ data });
  }

  async updateConsent(id: string, data: UpdateConsentDTO) {
    return (this.prisma as any).consent.update({ where: { id }, data });
  }
}
