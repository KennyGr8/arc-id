// adapters/src/db/prisma/membership.adapter.ts
import type {
  PrismaClients,
  IMembershipAdapter,
  CreateMembershipDTO,
  UpdateMembershipDTO,
  Membership
} from "@arc-id/data";

export class MembershipAdapter<T extends PrismaClients> implements IMembershipAdapter {
  private prisma: T;

  constructor(prisma: T) {
    this.prisma = prisma;
  }

  switchClient(newClient: T) {
    this.prisma = newClient;
  }

  async createMembership(data: CreateMembershipDTO): Promise<Membership> {
    return (this.prisma as any).membership.create({ data });
  }

  async updateMembership(id: string, data: UpdateMembershipDTO): Promise<Membership> {
    return (this.prisma as any).membership.update({
      where: { id },
      data,
    });
  }

  async findByUser(identityId: string): Promise<Membership[]> {
    return (this.prisma as any).membership.findMany({ where: { identityId } });
  }

  async findByTenant(tenantId: string): Promise<Membership[]> {
    return (this.prisma as any).membership.findMany({ where: { tenantId } });
  }

  async deleteMembership(id: string): Promise<void> {
    await (this.prisma as any).membership.delete({ where: { id } });
  }
}
