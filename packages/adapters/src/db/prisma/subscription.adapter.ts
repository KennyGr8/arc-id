// adapters/src/db/prisma/subscription.adapter.ts
import type {
  PrismaClients,
  ISubscriptionAdapter,
  CreateSubscriptionDTO,
  UpdateSubscriptionDTO,
  Subscription
} from '@arc-id/core'

export class SubscriptionAdapter<T extends PrismaClients> implements ISubscriptionAdapter {
  private prisma: T

  constructor(prisma: T) {
    this.prisma = prisma
  }

  switchClient(newClient: T) {
    this.prisma = newClient
  }

  async createSubscription(data: CreateSubscriptionDTO): Promise<Subscription> {
    return (this.prisma as any).subscription.create({ data })
  }

  async findById(id: string): Promise<Subscription | null> {
    return (this.prisma as any).subscription.findUnique({ where: { id } })
  }

  async findByUser(userId: string): Promise<Subscription[]> {
    return (this.prisma as any).subscription.findMany({ where: { userId } })
  }

  async updateSubscription(id: string, data: UpdateSubscriptionDTO): Promise<Subscription> {
    return (this.prisma as any).subscription.update({ where: { id }, data })
  }

  async cancelSubscription(id: string): Promise<Subscription> {
    return (this.prisma as any).subscription.update({
      where: { id },
      data: { status: 'CANCELED', canceledAt: new Date() }
    })
  }
}
