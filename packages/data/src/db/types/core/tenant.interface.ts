// types/tenant.interface.ts
import type { Tenant} from '@generated/postgres';
import type { CreateTenantDTO, UpdateTenantDTO, IBaseAdapter } from '../../index';

export interface ITenantAdapter extends IBaseAdapter<any> {
  createTenant(data: CreateTenantDTO): Promise<Tenant>
  updateTenant(id: string, data: UpdateTenantDTO): Promise<Tenant>
  findTenantById(id: string): Promise<Tenant | null>
  findTenantBySlug(slug: string): Promise<Tenant | null>
  deleteTenant(id: string): Promise<void>
}
