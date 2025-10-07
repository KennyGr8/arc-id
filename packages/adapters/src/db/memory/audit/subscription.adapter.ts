import type { ISubscriptionAdapter, CreateSubscriptionDTO, UpdateSubscriptionDTO, Subscription } from "@arc-id/data";
import { generateId } from "@arc-id/common";
import { SubscriptionStatus } from "@arc-id/data";

export class MemorySubscriptionAdapter implements ISubscriptionAdapter {
  private subs: Subscription[] = [];

  async createSubscription(data: CreateSubscriptionDTO): Promise<Subscription> {
    const sub: Subscription = {
      id: generateId(),
      identityId: data.identityId,
      plan: data.plan,
      status: data.status ?? SubscriptionStatus.ACTIVE,
      startedAt: data.startedAt ?? new Date(),
      endsAt: data.endsAt ?? null,
      canceledAt: null,
    };

    this.subs.push(sub);
    return sub;
  }

  async findById(id: string): Promise<Subscription | null> {
    return this.subs.find(s => s.id === id) ?? null;
  }

  async findByUser(identityId: string): Promise<Subscription[]> {
    return this.subs.filter(s => s.identityId === identityId);
  }

  async updateSubscription(id: string, data: UpdateSubscriptionDTO): Promise<Subscription> {
    const sub = await this.findById(id);
    if (!sub) throw new Error("Subscription not found");

    const updated: Subscription = {
      ...sub,
      ...data,
    };

    const idx = this.subs.findIndex(s => s.id === id);
    this.subs[idx] = updated;
    return updated;
  }

  async cancelSubscription(id: string): Promise<Subscription> {
    const sub = await this.findById(id);
    if (!sub) throw new Error("Subscription not found");
    sub.status = SubscriptionStatus.CANCELED;
    sub.canceledAt = new Date();
    return sub;
  }

  switchClient(_newClient?: any) {
    return this;
  }
}
