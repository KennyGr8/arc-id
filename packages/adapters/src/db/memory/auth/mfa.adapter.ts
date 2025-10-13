import type { IMfaAdapter, CreateMfaDTO, UpdateMfaDTO, Mfa } from "@arc-id/data";
import { generateId } from "@arc-id/common";

export class MemoryMfaAdapter implements IMfaAdapter {
  private mfas: Mfa[] = [];

  async createMfa(data: CreateMfaDTO): Promise<Mfa> {
    const mfa: Mfa = {
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      identityId: data.identityId,
      type: data.type,
      secret: data.secret ?? null,
      enabled: data.enabled ?? false,
    };

    this.mfas.push(mfa);
    return mfa;
  }

  async findById(id: string): Promise<Mfa | null> {
    return this.mfas.find(m => m.id === id) ?? null;
  }

  async findByIdentity(identityId: string): Promise<Mfa[]> {
    return this.mfas.filter(m => m.identityId === identityId);
  }

  async enableMfa(id: string): Promise<Mfa> {
    const mfa = await this.findById(id);
    if (!mfa) throw new Error("MFA not found");
    mfa.enabled = true;
    mfa.updatedAt = new Date();
    return mfa;
  }

  async disableMfa(id: string): Promise<Mfa> {
    const mfa = await this.findById(id);
    if (!mfa) throw new Error("MFA not found");
    mfa.enabled = false;
    mfa.updatedAt = new Date();
    return mfa;
  }

  async updateMfa(id: string, data: UpdateMfaDTO): Promise<Mfa> {
    const mfa = await this.findById(id);
    if (!mfa) throw new Error("MFA not found");
    Object.assign(mfa, data, { updatedAt: new Date() });
    return mfa;
  }

  async deleteMfa(id: string): Promise<void> {
    this.mfas = this.mfas.filter(m => m.id !== id);
  }

  switchClient(_newClient?: any) {
    return this;
  }
}
