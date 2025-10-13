// adapters/src/db/mongoose/dynamic-role.adapter.ts
import type { IDynamicRoleAdapter, CreateDynamicRoleDTO, DynamicRole } from "@arc-id/data";
import { Schema, model, Model } from "mongoose";

const DynamicRoleSchema = new Schema<DynamicRole>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  sector: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const DynamicRoleModel: Model<DynamicRole> = model<DynamicRole>("DynamicRole", DynamicRoleSchema);

export class MongooseDynamicRoleAdapter implements IDynamicRoleAdapter {
  constructor(private model: Model<DynamicRole> = DynamicRoleModel) {}
  switchClient(newModel: Model<DynamicRole>) { this.model = newModel; return this; }

  async createRole(data: CreateDynamicRoleDTO) {
    return new this.model(data).save();
  }

  async findById(id: string) {
    return this.model.findOne({ id }).lean();
  }

  async findByName(name: string) {
    return this.model.findOne({ name }).lean();
  }
}
