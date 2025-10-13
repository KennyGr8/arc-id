// adapters/src/db/mongo/project.adapter.ts
import type {
  IProjectAdapter,
  CreateProjectDTO,
  UpdateProjectDTO,
  Project,
} from '@arc-id/data'
import { Db } from 'mongodb'
import { generateId } from '@arc-id/common'

export class MongoProjectAdapter implements IProjectAdapter {
  constructor(private db: Db) {}
  switchClient(newClient: Db) {
    this.db = newClient
    return this
  }

  async createProject(data: CreateProjectDTO): Promise<Project> {
    const project: Project = {
      id: generateId(),
      createdAt: new Date(),
      ...data,
    }
    await this.db.collection<Project>('projects').insertOne(project)
    return project
  }

  async updateProject(id: string, data: UpdateProjectDTO): Promise<Project> {
    const result = await this.db
      .collection<Project>('projects')
      .findOneAndUpdate({ id }, { $set: data }, { returnDocument: 'after' })
    if (!result) throw new Error('Project not found')
    return result
  }

  async findById(id: string): Promise<Project | null> {
    return this.db.collection<Project>('projects').findOne({ id })
  }

  async findBySlug(slug: string): Promise<Project | null> {
    return this.db.collection<Project>('projects').findOne({ slug })
  }

  async deleteProject(id: string): Promise<void> {
    await this.db.collection('projects').deleteOne({ id })
  }
}
