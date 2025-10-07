import type { PrismaClients, ITenantPolicyAdapter, CreateTenantPolicyDTO, UpdateTenantPolicyDTO } from "@arc-id/data"

export class TenantPolicyAdapter<T extends PrismaClients> implements ITenantPolicyAdapter {
  constructor(private prisma: T) {}

  switchClient(newClient: T) { this.prisma = newClient; return this }

  async createPolicy(data: CreateTenantPolicyDTO) {
    return (this.prisma as any).tenantPolicy.create({
      data: {
        ...data,
        loginMethods: JSON.stringify(data.loginMethods)
      }
    })
  }

  async updatePolicy(id: string, data: UpdateTenantPolicyDTO) {
    return (this.prisma as any).tenantPolicy.update({
      where: { id },
      data: {
        ...data,
        loginMethods: data.loginMethods ? JSON.stringify(data.loginMethods) : undefined
      }
    })
  }

  async findByTenant(tenantId: string) {
    return (this.prisma as any).tenantPolicy.findUnique({ where: { tenantId } })
  }
}
