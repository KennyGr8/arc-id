// adapters/src/db/prisma/client.adapter.ts
import type { PrismaClients, IClientAdapter, CreateClientDTO, UpdateClientDTO, Client } from "@arc-id/data";

export class ClientAdapter<T extends PrismaClients> implements IClientAdapter {
  private prisma: T;

  constructor(prisma: T) {
    this.prisma = prisma;
  }

  switchClient(newClient: T) {
    this.prisma = newClient;
  }

  async createClient(data: CreateClientDTO): Promise<Client> {
    return (this.prisma as any).client.create({ data });
  }

  async updateClient(id: string, data: UpdateClientDTO): Promise<Client> {
    return (this.prisma as any).client.update({ where: { id }, data });
  }

  async findByClientId(clientId: string): Promise<Client | null> {
    return (this.prisma as any).client.findUnique({ where: { clientId } });
  }

  async deleteClient(id: string): Promise<void> {
    await (this.prisma as any).client.delete({ where: { id } });
  }
}
