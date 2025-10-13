// src/db/memory/oauth/oauth.adapter.ts
import type { IOAuthAccountAdapter, LinkOAuthAccountDTO, UnlinkOAuthAccountDTO, OAuthAccount } from "@arc-id/data";
import { generateId } from "@arc-id/common";

export class MemoryOAuthAdapter implements IOAuthAccountAdapter {
  private accounts: OAuthAccount[] = [];

  async linkAccount(data: LinkOAuthAccountDTO): Promise<OAuthAccount> {
    const account: OAuthAccount = {
      id: generateId(),
      identityId: data.identityId,
      provider: data.provider,
      providerUserId: data.providerUserId,
      accessToken: data.accessToken ?? null,
      refreshToken: data.refreshToken ?? null,
      providerMetadata: data.providerMetadata ?? {},
      linkedAt: new Date(),
      verified: data.verified ?? false, // ensure required field exists
    } as OAuthAccount;

    this.accounts.push(account);
    return account;
  }

  async findByProviderIdentityId(provider: string, providerUserId: string): Promise<OAuthAccount | null> {
    return this.accounts.find(a => a.provider === provider && a.providerUserId === providerUserId) ?? null;
  }

  async findByIdentity(identityId: string): Promise<OAuthAccount[]> {
    return this.accounts.filter(a => a.identityId === identityId);
  }

  async unlinkAccount(id: string): Promise<void> {
    this.accounts = this.accounts.filter(a => a.id !== id);
  }

  async unlinkByIdentity(data: UnlinkOAuthAccountDTO): Promise<void> {
    const { identityId, provider, providerUserId } = data;
    this.accounts = this.accounts.filter(a => {
      if (a.identityId !== identityId) return true;
      if (a.provider !== provider) return true;
      if (providerUserId && a.providerUserId !== providerUserId) return true;
      return false;
    });
  }

  switchClient(_newClient?: any) {
    return this;
  }
}
