// adapters/src/db/prisma/subscription.adapter.ts
import type {
  PrismaClients,
  ISubscriptionAdapter,
  CreateSubscriptionDTO,
  UpdateSubscriptionDTO,
  Subscription
} from '@arc-id/data'
import { SubscriptionStatus } from '@arc-id/data'

export class SubscriptionAdapter<T extends PrismaClients> implements ISubscriptionAdapter {
  private prisma: T

  constructor(prisma: T) {
    this.prisma = prisma
  }

  switchClient(newClient: T) {
    this.prisma = newClient
    return this
  }

  async createSubscription(data: CreateSubscriptionDTO): Promise<Subscription> {
    return (this.prisma as any).subscription.create({
      data: {
        identityId: data.identityId,
        plan: data.plan,
        status: data.status ?? SubscriptionStatus.ACTIVE,
        startedAt: data.startedAt ?? new Date(),
        endsAt: data.endsAt ?? null,
        canceledAt: null,
      },
    })
  }

  async findById(id: string): Promise<Subscription | null> {
    return (this.prisma as any).subscription.findUnique({ where: { id } })
  }

  async findByUser(identityId: string): Promise<Subscription[]> {
    return (this.prisma as any).subscription.findMany({ where: { identityId } })
  }

  async updateSubscription(id: string, data: UpdateSubscriptionDTO): Promise<Subscription> {
    return (this.prisma as any).subscription.update({
      where: { id },
      data,
    })
  }

  async cancelSubscription(id: string): Promise<Subscription> {
    return (this.prisma as any).subscription.update({
      where: { id },
      data: { status: SubscriptionStatus.CANCELED, canceledAt: new Date() },
    })
  }
}
