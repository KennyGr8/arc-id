// types/project.interface.ts
import type { Project } from '@generated/postgres'
import type { CreateProjectDTO, UpdateProjectDTO, IBaseAdapter } from '../../index'

export interface IProjectAdapter extends IBaseAdapter<any> {
  createProject(data: CreateProjectDTO): Promise<Project>
  updateProject(id: string, data: UpdateProjectDTO): Promise<Project>
  findById(id: string): Promise<Project | null>
  findBySlug(slug: string): Promise<Project | null>
  deleteProject(id: string): Promise<void>
}
