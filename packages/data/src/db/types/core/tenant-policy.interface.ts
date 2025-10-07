// types/tenant-policy.interface.ts
import type { TenantPolicy } from '@generated/postgres'
import type { CreateTenantPolicyDTO, UpdateTenantPolicyDTO, IBaseAdapter } from '../../index'

export interface ITenantPolicyAdapter extends IBaseAdapter<any> {
  createPolicy(data: CreateTenantPolicyDTO): Promise<TenantPolicy>
  updatePolicy(id: string, data: UpdateTenantPolicyDTO): Promise<TenantPolicy>
  findByTenant(tenantId: string): Promise<TenantPolicy | null>
}
