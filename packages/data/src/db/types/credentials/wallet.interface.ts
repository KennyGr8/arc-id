// types/wallet.interface.ts
import type { Wallet } from '@generated/postgres';
import type { CreateWalletDTO, UpdateWalletDTO, IBaseAdapter } from '../../index';

export interface IWalletAdapter extends IBaseAdapter {
  createWallet(data: CreateWalletDTO): Promise<Wallet>
  updateWallet(id: string, data: UpdateWalletDTO): Promise<Wallet>
}
