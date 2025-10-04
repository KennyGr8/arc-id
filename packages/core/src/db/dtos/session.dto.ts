export interface CreateSessionDTO {
  userId: string
  ip?: string
  userAgent?: string
  deviceId?: string
  expiresAt: Date
  valid?: boolean
}

export interface UpdateSessionDTO {
  ip?: string
  userAgent?: string
  deviceId?: string
  expiresAt?: Date
  valid?: boolean
  lastUsedAt?: Date
}
