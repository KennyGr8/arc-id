import type { Wallet, IWalletAdapter, CreateWalletDTO, UpdateWalletDTO } from "@arc-id/data";
import { generateId } from "@arc-id/common";

export class MemoryWalletAdapter implements IWalletAdapter {
  private wallets: Wallet[] = [];

  async createWallet(data: CreateWalletDTO): Promise<Wallet> {
    const wallet: Wallet = {
      id: generateId(),
      createdAt: new Date(),
      identityId: data.identityId,
      provider: data.provider,
      providerWalletId: data.providerWalletId,
      metadata: data.metadata ?? {},
    };
    this.wallets.push(wallet);
    return wallet;
  }

  async updateWallet(id: string, data: UpdateWalletDTO): Promise<Wallet> {
    const wallet = this.wallets.find(w => w.id === id);
    if (!wallet) throw new Error("Wallet not found");
    Object.assign(wallet, {
      ...data,
      metadata: data.metadata ?? wallet.metadata,
    });
    return wallet;
  }

  switchClient() {
    return this;
  }
}
