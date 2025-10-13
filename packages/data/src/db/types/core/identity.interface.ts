import type { Identity } from '@generated/postgres';
import type { CreateIdentityDTO, UpdateIdentityDTO, IBaseAdapter } from '../../index';

export interface IIdentityAdapter extends IBaseAdapter {
  createIdentity(data: CreateIdentityDTO): Promise<Identity>
  updateIdentity(id: string, data: UpdateIdentityDTO): Promise<Identity>
  findIdentityById(id: string): Promise<Identity | null>
  findIdentityByEmail(email: string): Promise<Identity | null>
  deleteIdentity(id: string): Promise<void>
  assignRole(identityId: string, dynamicRoleId: string): Promise<Identity>
  updateStatus(identityId: string, dynamicStatusId: string): Promise<Identity>
}
