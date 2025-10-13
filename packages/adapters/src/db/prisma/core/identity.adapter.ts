import type { PrismaClients, IIdentityAdapter, Identity, CreateIdentityDTO, UpdateIdentityDTO } from '@arc-id/data'

export class IdentityAdapter<T extends PrismaClients> implements IIdentityAdapter {
  private prisma: T

  constructor(prisma: T) {
    this.prisma = prisma
  }

  switchClient(newClient: T) {
    this.prisma = newClient
    return this
  }

  async createIdentity(data: CreateIdentityDTO): Promise<Identity> {
    return (this.prisma as any).identity.create({
      data: {
        primaryEmail: data.primaryEmail,
        name: data.name,
        role: data.role,
        status: data.status,
        dynamicRoleId: data.dynamicRoleId,
        dynamicStatusId: data.dynamicStatusId,
        metadata: data.metadata ?? {},
      },
    })
  }

  async updateIdentity(id: string, data: UpdateIdentityDTO): Promise<Identity> {
    return (this.prisma as any).identity.update({
      where: { id },
      data,
    })
  }

  async findIdentityById(id: string): Promise<Identity | null> {
    return (this.prisma as any).identity.findUnique({ where: { id } })
  }

  async findIdentityByEmail(email: string): Promise<Identity | null> {
    return (this.prisma as any).identity.findUnique({ where: { primaryEmail: email } })
  }

  async deleteIdentity(id: string): Promise<void> {
    await (this.prisma as any).identity.delete({ where: { id } })
  }

  async assignRole(identityId: string, roleId: string): Promise<Identity> {
    return (this.prisma as any).identity.update({
      where: { id: identityId },
      data: { dynamicRoleId: roleId },
    })
  }

  async updateStatus(identityId: string, statusId: string): Promise<Identity> {
    return (this.prisma as any).identity.update({
      where: { id: identityId },
      data: { dynamicStatusId: statusId },
    })
  }
}
