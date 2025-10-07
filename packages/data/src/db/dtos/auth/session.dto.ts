export interface CreateSessionDTO {
  identityId: string
  localAccountId?: string
  ip?: string
  userAgent?: string
  deviceId?: string
  expiresAt: Date
  lastUsedAt: Date
  valid?: boolean
}

export interface UpdateSessionDTO {
  valid?: boolean
  lastUsedAt?: Date
}
