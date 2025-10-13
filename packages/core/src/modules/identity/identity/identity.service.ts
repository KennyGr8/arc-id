import type { IIdentityAdapter, Identity, CreateIdentityDTO, UpdateIdentityDTO } from '@arc-id/data';

export class IdentityService {
  constructor(private adapter: IIdentityAdapter) {}

  async create(data: CreateIdentityDTO): Promise<Identity> {
    return this.adapter.createIdentity(data);
  }

  async update(id: string, data: UpdateIdentityDTO): Promise<Identity> {
    return this.adapter.updateIdentity(id, data);
  }

  async findById(id: string): Promise<Identity | null> {
    return this.adapter.findIdentityById(id);
  }

  async findByEmail(email: string): Promise<Identity | null> {
    return this.adapter.findIdentityByEmail(email);
  }

  async delete(id: string): Promise<void> {
    return this.adapter.deleteIdentity(id);
  }

  async assignRole(identityId: string, roleId: string): Promise<Identity> {
    return this.adapter.assignRole(identityId, roleId);
  }

  async updateStatus(identityId: string, statusId: string): Promise<Identity> {
    return this.adapter.updateStatus(identityId, statusId);
  }
}
