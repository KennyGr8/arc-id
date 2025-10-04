import type { ISessionAdapter, CreateSessionDTO, UpdateSessionDTO, Session } from "@arc-id/core";
import { generateId } from "@arc-id/common";

export class MemorySessionAdapter implements ISessionAdapter {
  findSessionById ( id: string ): Promise<Session | null>
  {
    throw new Error( "Method not implemented." );
  }
  findSessionsByUser ( userId: string ): Promise<Session[]>
  {
    throw new Error( "Method not implemented." );
  }
  private sessions: Session[] = [];

  async createSession(data: CreateSessionDTO): Promise<Session> {
    const session: Session = {
      id: generateId(),
      createdAt: new Date(),
      userId: data.userId,
      ip: data.ip ?? null,
      userAgent: data.userAgent ?? null,
      deviceId: data.deviceId ?? null,
      expiresAt: data.expiresAt,
      valid: data.valid ?? true,
      lastUsedAt: new Date(),
    };

    this.sessions.push(session);
    return session;
  }

  async findById(id: string): Promise<Session | null> {
    return this.sessions.find(s => s.id === id) ?? null;
  }

  async findByUser(userId: string): Promise<Session[]> {
    return this.sessions.filter(s => s.userId === userId);
  }

  async updateSession(id: string, data: UpdateSessionDTO): Promise<Session> {
    const session = await this.findById(id);
    if (!session) throw new Error("Session not found");
    Object.assign(session, data, { lastUsedAt: new Date() });
    return session;
  }

  async revokeSession(id: string): Promise<void> {
    this.sessions = this.sessions.filter(s => s.id !== id);
  }

  async revokeAllUserSessions(userId: string): Promise<void> {
    this.sessions = this.sessions.filter(s => s.userId !== userId);
  }

  switchClient(_newClient?: any) {
    return this;
  }
}
