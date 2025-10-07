import type { IRevokedJtiAdapter, CreateRevokedJtiDTO, RevokedJti } from "@arc-id/data"
import { generateId } from "@arc-id/common"

export class MemoryRevokedJtiAdapter implements IRevokedJtiAdapter {
  private revoked: RevokedJti[] = []

  async revoke(data: CreateRevokedJtiDTO): Promise<RevokedJti> {
    const entry: RevokedJti = {
      id: generateId(),
      jti: data.jti,
      reason: data.reason ?? null,
      revokedAt: new Date()
    } as RevokedJti
    this.revoked.push(entry)
    return entry
  }

  async findByJti(jti: string): Promise<RevokedJti | null> {
    return this.revoked.find(r => r.jti === jti) ?? null
  }

  switchClient(_c?: any) { return this }
}
