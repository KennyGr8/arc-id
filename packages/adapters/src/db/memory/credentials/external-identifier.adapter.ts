import type { ExternalIdentifier, IExternalIdentifierAdapter, CreateExternalIdentifierDTO, UpdateExternalIdentifierDTO } from "@arc-id/data";
import { generateId } from "@arc-id/common";

export class MemoryExternalIdentifierAdapter implements IExternalIdentifierAdapter {
  private identifiers: ExternalIdentifier[] = [];

  async createIdentifier(data: CreateExternalIdentifierDTO): Promise<ExternalIdentifier> {
    const identifier: ExternalIdentifier = {
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      verifiedAt: null,
      identityId: data.identityId,
      type: data.type,
      valueHash: data.valueHash,
      displayValue: data.displayValue ?? null,
      verified: data.verified ?? false,
      verificationMethod: data.verificationMethod ?? null,
      verificationSource: data.verificationSource ?? null,
      metadata: data.metadata ?? {},
    };
    this.identifiers.push(identifier);
    return identifier;
  }

  async updateIdentifier(id: string, data: UpdateExternalIdentifierDTO): Promise<ExternalIdentifier> {
    const identifier = this.identifiers.find(i => i.id === id);
    if (!identifier) throw new Error("Identifier not found");
    Object.assign(identifier, {
      ...data,
      metadata: data.metadata ?? identifier.metadata,
      updatedAt: new Date(),
    });
    return identifier;
  }

  async findByTypeAndHash(type: string, valueHash: string): Promise<ExternalIdentifier | null> {
    return this.identifiers.find(i => i.type === type && i.valueHash === valueHash) ?? null;
  }

  switchClient() {
    return this;
  }
}
