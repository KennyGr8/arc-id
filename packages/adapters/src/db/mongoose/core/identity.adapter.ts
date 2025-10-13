// adapters/src/db/mongoose/identity.adapter.ts
import type { IIdentityAdapter, Identity, CreateIdentityDTO, UpdateIdentityDTO } from "@arc-id/data";
import { Schema, model, Model } from "mongoose";

const IdentitySchema = new Schema<Identity>({
  id: { type: String, required: true, unique: true },
  primaryEmail: { type: String, unique: true },
  emailVerified: { type: Boolean, default: false },
  name: { type: String },
  role: { type: String, default: "USER" },
  status: { type: String, default: "PENDING" },
  dynamicRoleId: { type: String },
  dynamicStatusId: { type: String },
  metadata: { type: Object },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const IdentityModel: Model<Identity> = model<Identity>("Identity", IdentitySchema);

export class MongooseIdentityAdapter implements IIdentityAdapter {
  constructor(private model: Model<Identity> = IdentityModel) {}
  switchClient(newModel: Model<Identity>) { this.model = newModel; return this; }

  async createIdentity(data: CreateIdentityDTO): Promise<Identity> {
    return new this.model({ ...data, metadata: data.metadata ?? {} }).save();
  }

  async updateIdentity(id: string, data: UpdateIdentityDTO): Promise<Identity> {
    const updated = await this.model.findOneAndUpdate({ id }, data, { new: true });
    if (!updated) throw new Error("Identity not found");
    return updated;
  }

  async findIdentityById(id: string): Promise<Identity | null> {
    return this.model.findOne({ id }).lean();
  }

  async findIdentityByEmail(email: string): Promise<Identity | null> {
    return this.model.findOne({ primaryEmail: email }).lean();
  }

  async deleteIdentity(id: string): Promise<void> {
    await this.model.deleteOne({ id });
  }

  async assignRole(identityId: string, roleId: string): Promise<Identity> {
    const updated = await this.model.findOneAndUpdate({ id: identityId }, { dynamicRoleId: roleId }, { new: true });
    if (!updated) throw new Error("Identity not found");
    return updated;
  }

  async updateStatus(identityId: string, statusId: string): Promise<Identity> {
    const updated = await this.model.findOneAndUpdate({ id: identityId }, { dynamicStatusId: statusId }, { new: true });
    if (!updated) throw new Error("Identity not found");
    return updated;
  }
}
