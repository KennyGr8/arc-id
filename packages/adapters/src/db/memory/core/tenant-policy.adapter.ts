// src/db/memory/core/tenant-policy.adapter.ts
import type { ITenantPolicyAdapter, CreateTenantPolicyDTO, UpdateTenantPolicyDTO, TenantPolicy } from "@arc-id/data";
import { generateId } from "@arc-id/common";

export class MemoryTenantPolicyAdapter implements ITenantPolicyAdapter {
  private policies: TenantPolicy[] = [];

  async createPolicy(data: CreateTenantPolicyDTO): Promise<TenantPolicy> {
    const policy: TenantPolicy = {
      id: generateId(),
      tenantId: data.tenantId,
      requireMfa: data.requireMfa ?? false,
      passwordRules: data.passwordRules ?? {},
      loginMethods: Array.isArray(data.loginMethods) ? data.loginMethods : (data.loginMethods ? data.loginMethods : []),
      createdAt: new Date(),
    } as TenantPolicy;

    this.policies.push(policy);
    return policy;
  }

  async updatePolicy(id: string, data: UpdateTenantPolicyDTO): Promise<TenantPolicy> {
    const policy = this.policies.find(p => p.id === id);
    if (!policy) throw new Error("Tenant policy not found");
    policy.requireMfa = data.requireMfa ?? policy.requireMfa;
    policy.passwordRules = data.passwordRules ?? policy.passwordRules;
    if (data.loginMethods) {
      policy.loginMethods = Array.isArray(data.loginMethods) ? data.loginMethods : data.loginMethods;
    }
    return policy;
  }

  async findByTenant(tenantId: string): Promise<TenantPolicy | null> {
    return this.policies.find(p => p.tenantId === tenantId) ?? null;
  }

  switchClient(_newClient?: any) {
    return this;
  }
}
