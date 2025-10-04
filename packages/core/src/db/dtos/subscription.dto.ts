import { SubscriptionPlan, SubscriptionStatus } from '../index'

export interface CreateSubscriptionDTO {
  userId: string
  plan: SubscriptionPlan
  status?: SubscriptionStatus
  startedAt?: Date
  endsAt?: Date
}

export interface UpdateSubscriptionDTO {
  plan?: SubscriptionPlan
  status?: SubscriptionStatus
  endsAt?: Date
  canceledAt?: Date
}
