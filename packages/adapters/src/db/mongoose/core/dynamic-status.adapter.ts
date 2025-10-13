// adapters/src/db/mongoose/dynamic-status.adapter.ts
import type { IDynamicStatusAdapter, CreateDynamicStatusDTO, DynamicStatus } from "@arc-id/data";
import { Schema, model, Model } from "mongoose";

const DynamicStatusSchema = new Schema<DynamicStatus>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  sector: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const DynamicStatusModel: Model<DynamicStatus> = model<DynamicStatus>("DynamicStatus", DynamicStatusSchema);

export class MongooseDynamicStatusAdapter implements IDynamicStatusAdapter {
  constructor(private model: Model<DynamicStatus> = DynamicStatusModel) {}
  switchClient(newModel: Model<DynamicStatus>) { this.model = newModel; return this; }

  async createStatus(data: CreateDynamicStatusDTO) {
    return new this.model(data).save();
  }

  async findById(id: string) {
    return this.model.findOne({ id }).lean();
  }

  async findByName(name: string) {
    return this.model.findOne({ name }).lean();
  }
}
