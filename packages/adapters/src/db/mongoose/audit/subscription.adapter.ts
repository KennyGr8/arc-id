// adapters/src/db/mongoose/subscription.adapter.ts
import type {
  ISubscriptionAdapter,
  CreateSubscriptionDTO,
  UpdateSubscriptionDTO,
  Subscription,
} from '@arc-id/data'
import { SubscriptionStatus } from '@arc-id/data'
import { Schema, model, Model } from 'mongoose'

const SubscriptionSchema = new Schema<Subscription>({
  id: { type: String, required: true, unique: true },
  identityId: { type: String, required: true },
  plan: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(SubscriptionStatus),
    default: SubscriptionStatus.ACTIVE,
  },
  startedAt: { type: Date, default: Date.now },
  endsAt: { type: Date, default: null },
  canceledAt: { type: Date, default: null },
})

const SubscriptionModel: Model<Subscription> = model<Subscription>(
  'Subscription',
  SubscriptionSchema
)

export class MongooseSubscriptionAdapter implements ISubscriptionAdapter {
  constructor(private model: Model<Subscription> = SubscriptionModel) {}

  switchClient(newModel: Model<Subscription>) {
    this.model = newModel
    return this
  }

  async createSubscription(data: CreateSubscriptionDTO): Promise<Subscription> {
    const sub = new this.model({
      ...data,
      status: data.status ?? SubscriptionStatus.ACTIVE,
      startedAt: data.startedAt ?? new Date(),
    })
    return sub.save()
  }

  async findById(id: string): Promise<Subscription | null> {
    return this.model.findOne({ id }).lean()
  }

  async findByUser(identityId: string): Promise<Subscription[]> {
    return this.model.find({ identityId }).lean()
  }

  async updateSubscription(
    id: string,
    data: UpdateSubscriptionDTO
  ): Promise<Subscription> {
    const updated = await this.model.findOneAndUpdate({ id }, data, {
      new: true,
    })
    if (!updated) throw new Error('Subscription not found')
    return updated
  }

  async cancelSubscription(id: string): Promise<Subscription> {
    const updated = await this.model.findOneAndUpdate(
      { id },
      { status: SubscriptionStatus.CANCELED, canceledAt: new Date() },
      { new: true }
    )
    if (!updated) throw new Error('Subscription not found')
    return updated
  }
}
