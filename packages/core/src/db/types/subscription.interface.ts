import type { Subscription } from '@generated/postgres'
import type { CreateSubscriptionDTO, UpdateSubscriptionDTO, IBaseAdapter } from '../index'

export interface ISubscriptionAdapter extends IBaseAdapter<any> {
  createSubscription(data: CreateSubscriptionDTO): Promise<Subscription>
  findById(id: string): Promise<Subscription | null>
  findByUser(userId: string): Promise<Subscription[]>
  updateSubscription(id: string, data: UpdateSubscriptionDTO): Promise<Subscription>
  cancelSubscription(id: string): Promise<Subscription>
}
