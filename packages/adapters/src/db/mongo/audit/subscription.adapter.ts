// adapters/src/db/mongo/subscription.adapter.ts
import type {
  ISubscriptionAdapter,
  CreateSubscriptionDTO,
  UpdateSubscriptionDTO,
  Subscription,
} from '@arc-id/data'
import { SubscriptionStatus } from '@arc-id/data'
import { Db } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoSubscriptionAdapter implements ISubscriptionAdapter {
  constructor(private db: Db) {}

  switchClient(newClient: Db) {
    this.db = newClient
    return this
  }

  async createSubscription(data: CreateSubscriptionDTO): Promise<Subscription> {
    const doc: Subscription = {
      id: generateId(),
      identityId: data.identityId,
      plan: data.plan,
      status: data.status ?? SubscriptionStatus.ACTIVE,
      startedAt: data.startedAt ?? new Date(),
      endsAt: data.endsAt ?? null,
      canceledAt: null,
    }
    await this.db.collection<Subscription>('subscriptions').insertOne(doc)
    return doc
  }

  async findById(id: string): Promise<Subscription | null> {
    return this.db.collection<Subscription>('subscriptions').findOne({ id })
  }

  async findByUser(identityId: string): Promise<Subscription[]> {
    return this.db
      .collection<Subscription>('subscriptions')
      .find({ identityId })
      .toArray()
  }

  async updateSubscription(
    id: string,
    data: UpdateSubscriptionDTO
  ): Promise<Subscription> {
    const result = await this.db
      .collection<Subscription>('subscriptions')
      .findOneAndUpdate({ id }, { $set: data }, { returnDocument: 'after' })
    if (!result) throw new Error('Subscription not found')
    return result
  }

  async cancelSubscription(id: string): Promise<Subscription> {
    const result = await this.db
      .collection<Subscription>('subscriptions')
      .findOneAndUpdate(
        { id },
        {
          $set: { status: SubscriptionStatus.CANCELED, canceledAt: new Date() },
        },
        { returnDocument: 'after' }
      )
    if (!result) throw new Error('Subscription not found')
    return result
  }
}
