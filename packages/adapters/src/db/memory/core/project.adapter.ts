import type { IProjectAdapter, CreateProjectDTO, UpdateProjectDTO, Project } from "@arc-id/data"
import { generateId } from "@arc-id/common"

export class MemoryProjectAdapter implements IProjectAdapter {
  private projects: Project[] = []

  async createProject(data: CreateProjectDTO): Promise<Project> {
    const project: Project = {
      id: generateId(),
      createdAt: new Date(),
      ...data
    } as Project
    this.projects.push(project)
    return project
  }

  async updateProject(id: string, data: UpdateProjectDTO): Promise<Project> {
    const proj = this.projects.find(p => p.id === id)
    if (!proj) throw new Error("Project not found")
    Object.assign(proj, data)
    return proj
  }

  async findById(id: string): Promise<Project | null> {
    return this.projects.find(p => p.id === id) ?? null
  }

  async findBySlug(slug: string): Promise<Project | null> {
    return this.projects.find(p => p.slug === slug) ?? null
  }

  async deleteProject(id: string): Promise<void> {
    this.projects = this.projects.filter(p => p.id !== id)
  }

  switchClient(_c?: any) { return this }
}
