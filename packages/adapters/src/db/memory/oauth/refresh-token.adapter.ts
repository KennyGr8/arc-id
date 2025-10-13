// adapters/src/memory/refresh-token.adapter.ts
import type { IRefreshTokenAdapter, CreateRefreshTokenDTO, RefreshToken } from "@arc-id/data";
import { generateId } from "@arc-id/common";

export class MemoryRefreshTokenAdapter implements IRefreshTokenAdapter {
  private tokens: RefreshToken[] = [];

  async createToken(data: CreateRefreshTokenDTO): Promise<RefreshToken> {
    const token: RefreshToken = {
      id: generateId(),
      issuedAt: new Date(),
      revoked: false,
      rotation: 0,
      ...data,
    };
    this.tokens.push(token);
    return token;
  }

  async revokeToken(tokenStr: string): Promise<void> {
    const token = await this.findByToken(tokenStr);
    if (token) token.revoked = true;
  }

  async rotateToken(tokenStr: string): Promise<RefreshToken | null> {
    const token = await this.findByToken(tokenStr);
    if (!token) return null;
    token.rotation += 1;
    return token;
  }

  async findByToken(tokenStr: string): Promise<RefreshToken | null> {
    return this.tokens.find(t => t.token === tokenStr) ?? null;
  }

  switchClient(_newClient?: any) {
    return this;
  }
}
