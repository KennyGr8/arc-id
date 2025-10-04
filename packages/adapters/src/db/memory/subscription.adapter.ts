import type { ISubscriptionAdapter, CreateSubscriptionDTO, UpdateSubscriptionDTO, Subscription } from "@arc-id/core";
import { generateId } from "@arc-id/common";

export class MemorySubscriptionAdapter implements ISubscriptionAdapter {
  private subs: Subscription[] = [];

  async createSubscription(data: CreateSubscriptionDTO): Promise<Subscription> {
    const sub: Subscription = {
      id: generateId(),
      userId: data.userId,
      plan: data.plan,
      status: (data.status ?? "ACTIVE") as any,
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

  async findByUser(userId: string): Promise<Subscription[]> {
    return this.subs.filter(s => s.userId === userId);
  }

  async updateSubscription(id: string, data: UpdateSubscriptionDTO): Promise<Subscription> {
    const sub = await this.findById(id);
    if (!sub) throw new Error("Subscription not found");
    Object.assign(sub, data);
    return sub;
  }

  async cancelSubscription(id: string): Promise<Subscription> {
    const sub = await this.findById(id);
    if (!sub) throw new Error("Subscription not found");
    sub.status = "CANCELED" as any;
    sub.canceledAt = new Date();
    return sub;
  }

  switchClient(_newClient?: any) {
    return this;
  }
}
