import type { IOAuthAdapter, LinkOAuthAccountDTO, OAuthAccount } from "@arc-id/core";
import { generateId } from "@arc-id/common";

export class MemoryOAuthAdapter implements IOAuthAdapter {
  private accounts: OAuthAccount[] = [];

  async linkAccount(data: LinkOAuthAccountDTO): Promise<OAuthAccount> {
    const account: OAuthAccount = {
      id: generateId(),
      createdAt: new Date(),
      userId: data.userId,
      provider: data.provider,
      providerUserId: data.providerUserId,
      accessToken: data.accessToken ?? null,
      refreshToken: data.refreshToken ?? null,
    };

    this.accounts.push(account);
    return account;
  }

  async findByProviderUserId(provider: string, providerUserId: string): Promise<OAuthAccount | null> {
    return this.accounts.find(a => a.provider === provider && a.providerUserId === providerUserId) ?? null;
  }

  async findByUser(userId: string): Promise<OAuthAccount[]> {
    return this.accounts.filter(a => a.userId === userId);
  }

  async unlinkAccount(id: string): Promise<void> {
    this.accounts = this.accounts.filter(a => a.id !== id);
  }

  switchClient(_newClient?: any): this {
    return this;
  }
}
