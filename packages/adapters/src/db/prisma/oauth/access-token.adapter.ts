// adapters/src/db/prisma/access-token.adapter.ts
import type { PrismaClients, IAccessTokenAdapter, CreateAccessTokenDTO, AccessToken } from "@arc-id/data";

export class AccessTokenAdapter<T extends PrismaClients> implements IAccessTokenAdapter {
  private prisma: T;

  constructor(prisma: T) {
    this.prisma = prisma;
  }

  switchClient(newClient: T) {
    this.prisma = newClient;
  }

  async createToken(data: CreateAccessTokenDTO): Promise<AccessToken> {
    return (this.prisma as any).accessToken.create({ data });
  }

  async revokeToken(token: string): Promise<void> {
    await (this.prisma as any).accessToken.update({ where: { token }, data: { revoked: true } });
  }

  async findByToken(token: string): Promise<AccessToken | null> {
    return (this.prisma as any).accessToken.findUnique({ where: { token } });
  }

  async findByJti(jti: string): Promise<AccessToken | null> {
    return (this.prisma as any).accessToken.findUnique({ where: { jti } });
  }
}
