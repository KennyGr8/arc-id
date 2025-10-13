// adapters/src/db/prisma/authorization-code.adapter.ts
import type { PrismaClients, IAuthorizationCodeAdapter, CreateAuthorizationCodeDTO, AuthorizationCode } from "@arc-id/data";

export class AuthorizationCodeAdapter<T extends PrismaClients> implements IAuthorizationCodeAdapter {
  private prisma: T;

  constructor(prisma: T) {
    this.prisma = prisma;
  }

  switchClient(newClient: T) {
    this.prisma = newClient;
  }

  async createCode(data: CreateAuthorizationCodeDTO): Promise<AuthorizationCode> {
    return (this.prisma as any).authorizationCode.create({ data });
  }

  async consumeCode(code: string): Promise<AuthorizationCode | null> {
    return (this.prisma as any).authorizationCode.update({
      where: { code },
      data: { consumed: true },
    });
  }

  async findByCode(code: string): Promise<AuthorizationCode | null> {
    return (this.prisma as any).authorizationCode.findUnique({ where: { code } });
  }
}
