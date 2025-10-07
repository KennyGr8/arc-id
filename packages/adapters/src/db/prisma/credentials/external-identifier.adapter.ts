// adapters/src/db/prisma/external-identifier.adapter.ts
import type {
  ExternalIdentifier,
  CreateExternalIdentifierDTO,
  UpdateExternalIdentifierDTO,
  IExternalIdentifierAdapter,
  PrismaClients
} from "@arc-id/data";

export class ExternalIdentifierAdapter<T extends PrismaClients>
  implements IExternalIdentifierAdapter 
{
  private prisma: T;
  constructor(prisma: T) {
    this.prisma = prisma;
  }

  switchClient(newClient: T) {
    this.prisma = newClient;
  }

  async createIdentifier(data: CreateExternalIdentifierDTO): Promise<ExternalIdentifier> {
    return (this.prisma as any).externalIdentifier.create({ data });
  }

  async updateIdentifier(id: string, data: UpdateExternalIdentifierDTO): Promise<ExternalIdentifier> {
    return (this.prisma as any).externalIdentifier.update({ where: { id }, data });
  }

  async findByTypeAndHash(type: string, valueHash: string): Promise<ExternalIdentifier | null> {
    return (this.prisma as any).externalIdentifier.findUnique({
      where: { type_valueHash: { type, valueHash } }
    });
  }
}
