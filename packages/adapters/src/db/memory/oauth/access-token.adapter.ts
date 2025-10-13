// src/db/memory/oauth/access-token.adapter.ts
import type { IAccessTokenAdapter, CreateAccessTokenDTO, AccessToken } from "@arc-id/data";
import { generateId } from "@arc-id/common";

export class MemoryAccessTokenAdapter implements IAccessTokenAdapter {
  private tokens: AccessToken[] = [];

  async createToken(data: CreateAccessTokenDTO): Promise<AccessToken> {
    // ensure proper types and defaults (jti -> null, scopes -> string[])
    const token: AccessToken = {
      id: generateId(),
      token: data.token,
      clientId: data.clientId,
      identityId: data.identityId,
      scopes: Array.isArray(data.scopes) ? data.scopes : (data.scopes ? [data.scopes] : []),
      issuedAt: data.issuedAt ?? new Date(),
      expiresAt: data.expiresAt,
      revoked: data.revoked ?? false,
      jti: data.jti ?? null,
    };

    this.tokens.push(token);
    return token;
  }

  async revokeToken(tokenStr: string): Promise<void> {
    const token = this.tokens.find(t => t.token === tokenStr);
    if (token) token.revoked = true;
  }

  async findByToken(tokenStr: string): Promise<AccessToken | null> {
    return this.tokens.find(t => t.token === tokenStr) ?? null;
  }

  async findByJti(jti: string): Promise<AccessToken | null> {
    return this.tokens.find(t => t.jti === jti) ?? null;
  }

  switchClient(_newClient?: any) {
    return this;
  }
}
