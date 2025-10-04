import type { IUserAdapter, CreateUserDTO, UpdateUserDTO, User } from "@arc-id/core";
import { generateId } from "@arc-id/common";

export class MemoryUserAdapter implements IUserAdapter {
  private users: User[] = [];

  async createUser(data: CreateUserDTO): Promise<User> {
    const user: User = {
      id: generateId(),
      createdAt: new Date(),
      email: data.email,
      passwordHash: data.passwordHash,
      role: (data.role ?? "USER") as any,
      status: (data.status ?? "ACTIVE") as any,
      name: data.name ?? null,
      dynamicRoleId: data.dynamicRoleId ?? null,
      dynamicStatusId: data.dynamicStatusId ?? null,
    } as User;

    this.users.push(user);
    return user;
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    const existing = await this.findUserById(id);
    if (!existing) throw new Error("User not found");

    const updated: User = {
      ...existing,
      ...data,
      name: data.name ?? existing.name,
      role: (data.role ?? existing.role) as any,
      status: (data.status ?? existing.status) as any,
      dynamicRoleId: data.dynamicRoleId ?? existing.dynamicRoleId,
      dynamicStatusId: data.dynamicStatusId ?? existing.dynamicStatusId,
    };

    const idx = this.users.findIndex(u => u.id === id);
    this.users[idx] = updated;
    return updated;
  }

  async findUserById(id: string): Promise<User | null> {
    return this.users.find(u => u.id === id) ?? null;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.users.find(u => u.email === email) ?? null;
  }

  async deleteUser(id: string): Promise<void> {
    this.users = this.users.filter(u => u.id !== id);
  }

  async assignRole(userId: string, roleId: string): Promise<User> {
    const user = await this.findUserById(userId);
    if (!user) throw new Error("User not found");
    user.role = roleId as any;
    return user;
  }

  async updateStatus(userId: string, statusId: string): Promise<User> {
    const user = await this.findUserById(userId);
    if (!user) throw new Error("User not found");
    user.status = statusId as any;
    return user;
  }

  switchClient(_newClient?: any) {
    return this;
  }
}
