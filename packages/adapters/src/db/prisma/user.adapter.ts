// adapters/src/db/prisma/user.adapter.ts
import type { PrismaClients, IUserAdapter, User, CreateUserDTO, UpdateUserDTO } from '@arc-id/core'

export class UserAdapter<T extends PrismaClients> implements IUserAdapter {
  private prisma: T

  constructor(prisma: T) {
    this.prisma = prisma
  }

  switchClient(newClient: T) {
    this.prisma = newClient
  }

  async createUser(data: CreateUserDTO): Promise<User> {
    return (this.prisma as any).user.create({ data })
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    return (this.prisma as any).user.update({ where: { id }, data })
  }

  async findUserById(id: string): Promise<User | null> {
    return (this.prisma as any).user.findUnique({ where: { id } })
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return (this.prisma as any).user.findUnique({ where: { email } })
  }

  async deleteUser(id: string): Promise<void> {
    await (this.prisma as any).user.delete({ where: { id } })
  }

  async assignRole(userId: string, roleId: string): Promise<User> {
    return (this.prisma as any).user.update({
      where: { id: userId },
      data: { dynamicRoleId: roleId },
    })
  }

  async updateStatus(userId: string, statusId: string): Promise<User> {
    return (this.prisma as any).user.update({
      where: { id: userId },
      data: { dynamicStatusId: statusId },
    })
  }
}
