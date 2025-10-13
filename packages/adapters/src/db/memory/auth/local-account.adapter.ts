import type { ILocalAccountAdapter, CreateLocalAccountDTO, UpdateLocalAccountDTO, LocalAccount } from "@arc-id/data";
import { generateId } from "@arc-id/common";

export class MemoryLocalAccountAdapter implements ILocalAccountAdapter {
  private accounts: LocalAccount[] = [];

  async createLocalAccount(data: CreateLocalAccountDTO): Promise<LocalAccount> {
    const account: LocalAccount = {
      id: generateId(),
      identityId: data.identityId ?? null,
      email: data.email,
      passwordHash: data.passwordHash,
      passwordAlgorithm: "bcrypt", // default
      createdAt: new Date(),
      updatedAt: new Date(),
    } as LocalAccount;

    this.accounts.push(account);
    return account;
  }

  async updateLocalAccount(id: string, data: UpdateLocalAccountDTO): Promise<LocalAccount> {
    const existing = this.accounts.find(acc => acc.id === id);
    if (!existing) throw new Error("LocalAccount not found");

    const updated: LocalAccount = {
      ...existing,
      ...data,
      updatedAt: new Date(),
    };

    const idx = this.accounts.findIndex(acc => acc.id === id);
    this.accounts[idx] = updated;
    return updated;
  }

  async findByEmail(email: string): Promise<LocalAccount | null> {
    return this.accounts.find(acc => acc.email === email) ?? null;
  }

  async deleteLocalAccount(id: string): Promise<void> {
    this.accounts = this.accounts.filter(acc => acc.id !== id);
  }

  switchClient(_newClient?: any) {
    return this;
  }
}
