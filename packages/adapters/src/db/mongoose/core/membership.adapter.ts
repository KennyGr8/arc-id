// adapters/src/db/mongoose/membership.adapter.ts
import type {
  IMembershipAdapter,
  CreateMembershipDTO,
  UpdateMembershipDTO,
  Membership,
} from '@arc-id/data'
import { Schema, model, Model } from 'mongoose'

const MembershipSchema = new Schema<Membership>({
  id: { type: String, required: true, unique: true },
  identityId: { type: String, required: true },
  tenantId: { type: String, required: true },
  role: { type: String, default: 'USER' },
  status: { type: String, default: 'ACTIVE' },
  profile: { type: Object },
  createdAt: { type: Date, default: Date.now },
})

const MembershipModel: Model<Membership> = model<Membership>(
  'Membership',
  MembershipSchema
)

export class MongooseMembershipAdapter implements IMembershipAdapter {
  constructor(private model: Model<Membership> = MembershipModel) {}
  switchClient(newModel: Model<Membership>) {
    this.model = newModel
    return this
  }

  async createMembership(data: CreateMembershipDTO): Promise<Membership> {
    return new this.model(data).save()
  }

  async updateMembership(
    id: string,
    data: UpdateMembershipDTO
  ): Promise<Membership> {
    const updated = await this.model.findOneAndUpdate({ id }, data, {
      new: true,
    })
    if (!updated) throw new Error('Membership not found')
    return updated
  }

  async findByUser(identityId: string): Promise<Membership[]> {
    return this.model.find({ identityId }).lean()
  }

  async findByTenant(tenantId: string): Promise<Membership[]> {
    return this.model.find({ tenantId }).lean()
  }

  async deleteMembership(id: string): Promise<void> {
    await this.model.deleteOne({ id })
  }
}
