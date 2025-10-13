// adapters/src/db/mongoose/project.adapter.ts
import type {
  IProjectAdapter,
  CreateProjectDTO,
  UpdateProjectDTO,
  Project,
} from '@arc-id/data'
import { Schema, model, Model } from 'mongoose'

const ProjectSchema = new Schema<Project>({
  id: { type: String, required: true, unique: true },
  tenantId: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
})

const ProjectModel: Model<Project> = model<Project>('Project', ProjectSchema)

export class MongooseProjectAdapter implements IProjectAdapter {
  constructor(private model: Model<Project> = ProjectModel) {}
  switchClient(newModel: Model<Project>) {
    this.model = newModel
    return this
  }

  async createProject(data: CreateProjectDTO) {
    return new this.model(data).save()
  }

  async updateProject(id: string, data: UpdateProjectDTO) {
    const updated = await this.model.findOneAndUpdate({ id }, data, {
      new: true,
    })
    if (!updated) throw new Error('Project not found')
    return updated
  }

  async findById(id: string) {
    return this.model.findOne({ id }).lean()
  }

  async findBySlug(slug: string) {
    return this.model.findOne({ slug }).lean()
  }

  async deleteProject(id: string) {
    await this.model.deleteOne({ id })
  }
}
