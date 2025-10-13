// adapters/src/db/mongoose/audit-log.adapter.ts
import type {
  IAuditLogAdapter,
  CreateAuditLogDTO,
  AuditLog,
} from '@arc-id/data'
import { Schema, model, Model } from 'mongoose'

const AuditLogSchema = new Schema<AuditLog>({
  id: { type: String, required: true, unique: true },
  identityId: { type: String },
  actorId: { type: String },
  action: { type: String, required: true },
  resource: { type: String },
  ip: { type: String },
  userAgent: { type: String },
  data: { type: Object },
  createdAt: { type: Date, default: Date.now },
})

const AuditLogModel: Model<AuditLog> = model<AuditLog>(
  'AuditLog',
  AuditLogSchema
)

export class MongooseAuditLogAdapter implements IAuditLogAdapter {
  constructor(private model: Model<AuditLog> = AuditLogModel) {}

  switchClient(newModel: Model<AuditLog>) {
    this.model = newModel
    return this
  }

  async createLog(data: CreateAuditLogDTO): Promise<AuditLog> {
    const log = new this.model({ ...data })
    return log.save()
  }

  async findByIdentity(identityId: string): Promise<AuditLog[]> {
    return this.model.find({ identityId }).lean()
  }

  async findByActor(actorId: string): Promise<AuditLog[]> {
    return this.model.find({ actorId }).lean()
  }
}
