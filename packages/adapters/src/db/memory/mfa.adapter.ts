import type { IMfaAdapter, CreateMfaDTO, UpdateMfaDTO, Mfa } from "@arc-id/core";
import { generateId } from "@arc-id/common";

export class MemoryMfaAdapter implements IMfaAdapter {
  private mfas: Mfa[] = [];

  async createMfa(data: CreateMfaDTO): Promise<Mfa> {
    const mfa: Mfa = {
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: data.userId,
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

  async findByUser(userId: string): Promise<Mfa[]> {
    return this.mfas.filter(m => m.userId === userId);
  }

  async enableMfa(id: string): Promise<Mfa> {
    const mfa = await this.findById(id);
    if (!mfa) throw new Error("MFA not found");
    mfa.enabled = true;
    return mfa;
  }

  async disableMfa(id: string): Promise<Mfa> {
    const mfa = await this.findById(id);
    if (!mfa) throw new Error("MFA not found");
    mfa.enabled = false;
    return mfa;
  }

  async updateMfa(id: string, data: UpdateMfaDTO): Promise<Mfa> {
    const mfa = await this.findById(id);
    if (!mfa) throw new Error("MFA not found");
    Object.assign(mfa, data);
    return mfa;
  }

  async deleteMfa(id: string): Promise<void> {
    this.mfas = this.mfas.filter(m => m.id !== id);
  }

  switchClient(_newClient?: any) {
    return this;
  }
}
