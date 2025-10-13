import type { IConsentAdapter, CreateConsentDTO, UpdateConsentDTO, Consent } from "@arc-id/data";
import { generateId } from "@arc-id/common";

export class MemoryConsentAdapter implements IConsentAdapter {
  private consents: Consent[] = [];

  async createConsent(data: CreateConsentDTO): Promise<Consent> {
    const consent: Consent = {
      id: generateId(),
      identityId: data.identityId,
      clientId: data.clientId,
      scopes: Array.isArray(data.scopes) ? data.scopes : [data.scopes],
      grantedAt: data.grantedAt ?? new Date(),
      revokedAt: null,
    };
    this.consents.push(consent);
    return consent;
  }

  async updateConsent(id: string, data: UpdateConsentDTO): Promise<Consent> {
    const consent = this.consents.find(c => c.id === id);
    if (!consent) throw new Error("Consent not found");
    Object.assign(consent, data);
    return consent;
  }

  switchClient(_newClient?: any) { return this }
}
