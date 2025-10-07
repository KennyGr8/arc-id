// types/membership.interface.ts
import type { Membership } from '@generated/postgres';
import type { CreateMembershipDTO, UpdateMembershipDTO, IBaseAdapter } from '../../index';

export interface IMembershipAdapter extends IBaseAdapter<any> {
  createMembership(data: CreateMembershipDTO): Promise<Membership>
  updateMembership(id: string, data: UpdateMembershipDTO): Promise<Membership>
  findByUser(identityId: string): Promise<Membership[]>
  findByTenant(tenantId: string): Promise<Membership[]>
  deleteMembership(id: string): Promise<void>
}
