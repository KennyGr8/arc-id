import type { VerifiableCredential, IVerifiableCredentialAdapter, CreateVerifiableCredentialDTO, UpdateVerifiableCredentialDTO } from "@arc-id/data";
import { generateId } from "@arc-id/common";

export class MemoryVerifiableCredentialAdapter implements IVerifiableCredentialAdapter {
  private credentials: VerifiableCredential[] = [];

  async createCredential(data: CreateVerifiableCredentialDTO): Promise<VerifiableCredential> {
    const credential: VerifiableCredential = {
      id: generateId(),
      createdAt: new Date(),
      identityId: data.identityId,
      issuer: data.issuer,
      credential: data.credential ?? {},
      credentialHash: data.credentialHash,
      proof: data.proof ?? {},
      issuedAt: data.issuedAt,
      expiresAt: data.expiresAt ?? null,
      status: data.status ?? null,
    };
    this.credentials.push(credential);
    return credential;
  }

  async updateCredential(id: string, data: UpdateVerifiableCredentialDTO): Promise<VerifiableCredential> {
    const cred = this.credentials.find(c => c.id === id);
    if (!cred) throw new Error("Credential not found");
    Object.assign(cred, {
      ...data,
      proof: data.proof ?? cred.proof,
    });
    return cred;
  }

  switchClient() {
    return this;
  }
}
