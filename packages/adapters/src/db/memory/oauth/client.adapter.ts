// src/db/memory/oauth/client.adapter.ts
import type { IClientAdapter, CreateClientDTO, UpdateClientDTO, Client } from "@arc-id/data";
import { generateId } from "@arc-id/common";

export class MemoryClientAdapter implements IClientAdapter {
  private clients: Client[] = [];

  async createClient(data: CreateClientDTO): Promise<Client> {
    const client: Client = {
      id: generateId(),
      name: data.name,
      clientId: data.clientId,
      clientSecret: data.clientSecret ?? null,
      tenantId: data.tenantId ?? null,
      redirectUris: Array.isArray(data.redirectUris) ? data.redirectUris : (data.redirectUris ? [data.redirectUris] : []),
      grantTypes: Array.isArray(data.grantTypes) ? data.grantTypes : (data.grantTypes ? [data.grantTypes] : []),
      scopes: Array.isArray(data.scopes) ? data.scopes : (data.scopes ? [data.scopes] : []),
      public: data.public ?? false,
      createdAt: new Date(),
    } as Client;

    this.clients.push(client);
    return client;
  }

  async updateClient(id: string, data: UpdateClientDTO): Promise<Client> {
    const client = this.clients.find(c => c.id === id);
    if (!client) throw new Error("Client not found");
    // update allowed fields safely
    client.name = data.name ?? client.name;
    client.clientSecret = (data as any).clientSecret ?? client.clientSecret;
    client.redirectUris = data.redirectUris ? (Array.isArray(data.redirectUris) ? data.redirectUris : [data.redirectUris]) : client.redirectUris;
    client.grantTypes = data.grantTypes ? (Array.isArray(data.grantTypes) ? data.grantTypes : [data.grantTypes]) : client.grantTypes;
    client.scopes = data.scopes ? (Array.isArray(data.scopes) ? data.scopes : [data.scopes]) : client.scopes;
    client.public = data.public ?? client.public;
    return client;
  }

  async findByClientId(clientId: string): Promise<Client | null> {
    return this.clients.find(c => c.clientId === clientId) ?? null;
  }

  async deleteClient(id: string): Promise<void> {
    this.clients = this.clients.filter(c => c.id !== id);
  }

  switchClient(_newClient?: any) {
    return this;
  }
}
