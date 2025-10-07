import type { LocalAccount } from '@generated/postgres';
import type { CreateLocalAccountDTO, UpdateLocalAccountDTO, IBaseAdapter } from '../../index';

export interface ILocalAccountAdapter extends IBaseAdapter {
  createLocalAccount(data: CreateLocalAccountDTO): Promise<LocalAccount>
  updateLocalAccount(id: string, data: UpdateLocalAccountDTO): Promise<LocalAccount>
  findByEmail(email: string): Promise<LocalAccount | null>
  deleteLocalAccount(id: string): Promise<void>
}
