import type { AccessDelegation } from '@generated/postgres';
import type { CreateDelegationDTO, UpdateDelegationDTO } from '../../index';

export interface IAccessDelegationAdapter<TClient = any> {
  switchClient(newClient: TClient): void;

  createDelegation(data: CreateDelegationDTO): Promise<AccessDelegation>;
  findDelegationsByGrantor(grantorId: string): Promise<AccessDelegation[]>;
  findDelegationsByGrantee(granteeId: string): Promise<AccessDelegation[]>;
  revokeDelegation(id: string): Promise<void>;
}
