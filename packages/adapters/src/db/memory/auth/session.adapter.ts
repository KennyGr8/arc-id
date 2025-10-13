import type { ISessionAdapter, CreateSessionDTO, UpdateSessionDTO, Session } from "@arc-id/data";
import { generateId } from "@arc-id/common";

export class MemorySessionAdapter implements ISessionAdapter {
  private sessions: Session[] = [];

  async createSession(data: CreateSessionDTO): Promise<Session> {
    const session: Session = {
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      identityId: data.identityId,
      localAccountId: data.localAccountId ?? null,
      ip: data.ip ?? null,
      userAgent: data.userAgent ?? null,
      deviceId: data.deviceId ?? null,
      expiresAt: data.expiresAt,
      valid: data.valid ?? true,
      lastUsedAt: new Date(),
    } as Session;

    this.sessions.push(session);
    return session;
  }

  async findSessionById(id: string): Promise<Session | null> {
    return this.sessions.find(s => s.id === id) ?? null;
  }

  async findSessionsByUser(identityId: string): Promise<Session[]> {
    return this.sessions.filter(s => s.identityId === identityId);
  }

  async updateSession(id: string, data: UpdateSessionDTO): Promise<Session> {
    const session = await this.findSessionById(id);
    if (!session) throw new Error("Session not found");

    const updated: Session = {
      ...session,
      ...data,
      lastUsedAt: data.lastUsedAt ?? new Date(),
    };

    const idx = this.sessions.findIndex(s => s.id === id);
    this.sessions[idx] = updated;
    return updated;
  }

  async revokeSession(id: string): Promise<void> {
    this.sessions = this.sessions.filter(s => s.id !== id);
  }

  async revokeAllUserSessions(identityId: string): Promise<void> {
    this.sessions = this.sessions.filter(s => s.identityId !== identityId);
  }

  switchClient(_newClient?: any) {
    return this;
  }
}
