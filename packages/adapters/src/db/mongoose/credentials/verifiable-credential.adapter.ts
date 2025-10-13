// adapters/src/db/mongoose/verifiable-credential.adapter.ts
import type {
  VerifiableCredential,
  CreateVerifiableCredentialDTO,
  UpdateVerifiableCredentialDTO,
  IVerifiableCredentialAdapter,
} from "@arc-id/data";
import { Schema, model, Model } from "mongoose";

const VerifiableCredentialSchema = new Schema<VerifiableCredential>({
  id: { type: String, required: true, unique: true },
  identityId: { type: String, required: true },
  issuer: { type: String, required: true },
  proof: { type: Schema.Types.Mixed, default: {} },
  issuedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: "pending" },
});

const VerifiableCredentialModel: Model<VerifiableCredential> =
  model<VerifiableCredential>("VerifiableCredential", VerifiableCredentialSchema);

export class MongooseVerifiableCredentialAdapter implements IVerifiableCredentialAdapter {
  constructor(private model: Model<VerifiableCredential> = VerifiableCredentialModel) {}

  switchClient(newModel: Model<VerifiableCredential>) {
    this.model = newModel;
    return this;
  }

  async createCredential(data: CreateVerifiableCredentialDTO): Promise<VerifiableCredential> {
    return new this.model({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).save();
  }

  async updateCredential(id: string, data: UpdateVerifiableCredentialDTO): Promise<VerifiableCredential> {
    const updated = await this.model
      .findOneAndUpdate({ id }, { ...data, updatedAt: new Date() }, { new: true })
      .lean()
      .exec();

    if (!updated) {
      throw new Error(`VerifiableCredential with id=${id} not found`);
    }
    return updated as VerifiableCredential;
  }
}
