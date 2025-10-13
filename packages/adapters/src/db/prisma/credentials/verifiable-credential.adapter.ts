// adapters/src/db/prisma/verifiable-credential.adapter.ts
import type {
  VerifiableCredential,
  CreateVerifiableCredentialDTO,
  UpdateVerifiableCredentialDTO,
  IVerifiableCredentialAdapter,
  PrismaClients
} from "@arc-id/data";

export class VerifiableCredentialAdapter<T extends PrismaClients>
  implements IVerifiableCredentialAdapter 
{
  private prisma: T;
  constructor(prisma: T) {
    this.prisma = prisma;
  }

  switchClient(newClient: T) {
    this.prisma = newClient;
  }

  async createCredential(data: CreateVerifiableCredentialDTO): Promise<VerifiableCredential> {
    return (this.prisma as any).verifiableCredential.create({ data });
  }

  async updateCredential(id: string, data: UpdateVerifiableCredentialDTO): Promise<VerifiableCredential> {
    return (this.prisma as any).verifiableCredential.update({ where: { id }, data });
  }
}
