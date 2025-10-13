import type { PrismaClients, IProjectAdapter, CreateProjectDTO, UpdateProjectDTO } from "@arc-id/data"

export class ProjectAdapter<T extends PrismaClients> implements IProjectAdapter {
  constructor(private prisma: T) {}

  switchClient(newClient: T) { this.prisma = newClient; return this }

  async createProject(data: CreateProjectDTO) {
    return (this.prisma as any).project.create({ data })
  }

  async updateProject(id: string, data: UpdateProjectDTO) {
    return (this.prisma as any).project.update({ where: { id }, data })
  }

  async findById(id: string) {
    return (this.prisma as any).project.findUnique({ where: { id } })
  }

  async findBySlug(slug: string) {
    return (this.prisma as any).project.findUnique({ where: { slug } })
  }

  async deleteProject(id: string) {
    await (this.prisma as any).project.delete({ where: { id } })
  }
}
