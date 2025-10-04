import type { User } from '@generated/postgres'
import type { CreateUserDTO, UpdateUserDTO } from '../index'

export interface IBaseAdapter<TClient> {
  switchClient(newClient: TClient): void
}

export interface IUserAdapter extends IBaseAdapter<any> {
  createUser(data: CreateUserDTO): Promise<User>
  updateUser(id: string, data: UpdateUserDTO): Promise<User>
  findUserById(id: string): Promise<User | null>
  findUserByEmail(email: string): Promise<User | null>
  deleteUser(id: string): Promise<void>

  assignRole(userId: string, dynamicRoleId: string): Promise<User>
  updateStatus(userId: string, dynamicStatusId: string): Promise<User>
}
