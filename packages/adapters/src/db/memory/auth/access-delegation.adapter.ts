import type { IAccessDelegationAdapter, CreateDelegationDTO, UpdateDelegationDTO, AccessDelegation } from "@arc-id/data";
import { generateId } from "@arc-id/common";

export class MemoryAccessDelegationAdapter implements IAccessDelegationAdapter {
  private delegations: AccessDelegation[] = [];

  async createDelegation(data: CreateDelegationDTO): Promise<AccessDelegation> {
    const delegation: AccessDelegation = {
      id: generateId(),
      grantorId: data.grantorId,
      granteeId: data.granteeId,
      tenantId: data.tenantId ?? null,
      scopes: data.scopes ?? [],
      expiresAt: data.expiresAt ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as AccessDelegation;

    this.delegations.push(delegation);
    return delegation;
  }

  async findDelegationsByGrantor(grantorId: string): Promise<AccessDelegation[]> {
    return this.delegations.filter(d => d.grantorId === grantorId);
  }

  async findDelegationsByGrantee(granteeId: string): Promise<AccessDelegation[]> {
    return this.delegations.filter(d => d.granteeId === granteeId);
  }

  async revokeDelegation(id: string): Promise<void> {
    this.delegations = this.delegations.filter(d => d.id !== id);
  }

  switchClient(_newClient?: any) {
    return this;
  }
}
