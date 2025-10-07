// adapters/src/db/prisma/refresh-token.adapter.ts
import type { PrismaClients, IRefreshTokenAdapter, CreateRefreshTokenDTO, RefreshToken } from "@arc-id/data";

export class RefreshTokenAdapter<T extends PrismaClients> implements IRefreshTokenAdapter {
  private prisma: T;

  constructor(prisma: T) {
    this.prisma = prisma;
  }

  switchClient(newClient: T) {
    this.prisma = newClient;
  }

  async createToken(data: CreateRefreshTokenDTO): Promise<RefreshToken> {
    return (this.prisma as any).refreshToken.create({ data });
  }

  async revokeToken(token: string): Promise<void> {
    await (this.prisma as any).refreshToken.update({ where: { token }, data: { revoked: true } });
  }

  async rotateToken(token: string): Promise<RefreshToken | null> {
    const existing = await this.findByToken(token);
    if (!existing) return null;
    return (this.prisma as any).refreshToken.update({
      where: { token },
      data: { rotation: existing.rotation + 1 },
    });
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return (this.prisma as any).refreshToken.findUnique({ where: { token } });
  }
}
