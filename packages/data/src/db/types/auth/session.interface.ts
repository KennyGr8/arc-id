import type { Session } from '@generated/postgres'
import type { CreateSessionDTO, UpdateSessionDTO, IBaseAdapter } from '../../index'

export interface ISessionAdapter extends IBaseAdapter<any> {
  createSession(data: CreateSessionDTO): Promise<Session>
  findSessionById(id: string): Promise<Session | null>
  findSessionsByUser(userId: string): Promise<Session[]>
  updateSession(id: string, data: UpdateSessionDTO): Promise<Session>
  revokeSession(id: string): Promise<void>
  revokeAllUserSessions(userId: string): Promise<void>
}
