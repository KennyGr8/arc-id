import type { IEmailTokenAdapter, CreateEmailTokenDTO, EmailToken } from '@arc-id/data';
import { generateId } from '@arc-id/common';

export class MemoryEmailTokenAdapter implements IEmailTokenAdapter {
  private tokens: EmailToken[] = [];

  async createToken(data: CreateEmailTokenDTO): Promise<EmailToken> {
    const token: EmailToken = {
      id: generateId(),
      createdAt: new Date(),
      identityId: data.identityId,
      token: data.token,
      expiresAt: data.expiresAt,
      type: data.type as any,
      consumed: data.consumed ?? false,
    };

    this.tokens.push(token);
    return token;
  }

  async findById(id: string): Promise<EmailToken | null> {
    return this.tokens.find(t => t.id === id) ?? null;
  }

  async findByToken(tokenStr: string): Promise<EmailToken | null> {
    return this.tokens.find(t => t.token === tokenStr) ?? null;
  }

  async findByUser(identityId: string): Promise<EmailToken[]> {
    return this.tokens.filter(t => t.identityId === identityId);
  }

  async consumeToken(id: string): Promise<void> {
    const token = await this.findById(id);
    if (!token) throw new Error("Token not found");
    token.consumed = true;
  }

  async deleteToken(id: string): Promise<void> {
    this.tokens = this.tokens.filter(t => t.id !== id);
  }

  switchClient(_newClient?: any) {
    return this;
  }
}
