// adapters/src/db/mongoose/session.adapter.ts
import type { ISessionAdapter, CreateSessionDTO, UpdateSessionDTO, Session } from "@arc-id/data";
import { Schema, model, Model } from "mongoose";

const SessionSchema = new Schema<Session>({
  id: { type: String, required: true, unique: true },
  identityId: { type: String, required: true },
  localAccountId: { type: String },
  ip: { type: String },
  userAgent: { type: String },
  deviceId: { type: String },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  valid: { type: Boolean, default: true },
  lastUsedAt: { type: Date, default: Date.now },
});

const SessionModel: Model<Session> = model<Session>("Session", SessionSchema);

export class MongooseSessionAdapter implements ISessionAdapter {
  constructor(private model: Model<Session> = SessionModel) {}

  switchClient(newModel: Model<Session>) { this.model = newModel; return this; }

  async createSession(data: CreateSessionDTO): Promise<Session> {
    return new this.model(data).save();
  }

  async findSessionById(id: string): Promise<Session | null> {
    return this.model.findOne({ id }).lean();
  }

  async findSessionsByUser(identityId: string): Promise<Session[]> {
    return this.model.find({ identityId }).lean();
  }

  async updateSession(id: string, data: UpdateSessionDTO): Promise<Session> {
    const updated = await this.model.findOneAndUpdate({ id }, data, { new: true });
    if (!updated) throw new Error("Session not found");
    return updated;
  }

  async revokeSession(id: string): Promise<void> {
    await this.model.deleteOne({ id });
  }

  async revokeAllUserSessions(identityId: string): Promise<void> {
    await this.model.deleteMany({ identityId });
  }
}
