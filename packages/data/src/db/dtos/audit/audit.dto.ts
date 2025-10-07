// dtos/audit.dto.ts
export interface CreateAuditLogDTO {
  identityId?: string
  actorId?: string
  action: string
  resource?: string
  ip?: string
  userAgent?: string
  data?: Record<string, any>
}
