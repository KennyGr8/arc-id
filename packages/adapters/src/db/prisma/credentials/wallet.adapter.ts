// adapters/src/db/prisma/wallet.adapter.ts
import type {
  Wallet,
  CreateWalletDTO,
  UpdateWalletDTO,
  IWalletAdapter,
  PrismaClients
} from "@arc-id/data";

export class WalletAdapter<T extends PrismaClients> implements IWalletAdapter {
  private prisma: T;
  constructor(prisma: T) {
    this.prisma = prisma;
  }

  switchClient(newClient: T) {
    this.prisma = newClient;
  }

  async createWallet(data: CreateWalletDTO): Promise<Wallet> {
    return (this.prisma as any).wallet.create({ data });
  }

  async updateWallet(id: string, data: UpdateWalletDTO): Promise<Wallet> {
    return (this.prisma as any).wallet.update({ where: { id }, data });
  }
}
