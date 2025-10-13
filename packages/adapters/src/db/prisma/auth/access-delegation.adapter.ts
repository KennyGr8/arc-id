import type { PrismaClients, IAccessDelegationAdapter, CreateDelegationDTO } from "@arc-id/data";

export class AccessDelegationAdapter<T extends PrismaClients> implements IAccessDelegationAdapter {
  private prisma: T;

  constructor(prisma: T) {
    this.prisma = prisma;
  }

  switchClient(newClient: T) {
    this.prisma = newClient;
    return this;
  }

  async createDelegation(data: CreateDelegationDTO) {
    return (this.prisma as any).accessDelegation.create({ data });
  }

  async findDelegationsByGrantor(grantorId: string) {
    return (this.prisma as any).accessDelegation.findMany({ where: { grantorId } });
  }

  async findDelegationsByGrantee(granteeId: string) {
    return (this.prisma as any).accessDelegation.findMany({ where: { granteeId } });
  }

  async revokeDelegation(id: string) {
    await (this.prisma as any).accessDelegation.delete({ where: { id } });
  }
}
