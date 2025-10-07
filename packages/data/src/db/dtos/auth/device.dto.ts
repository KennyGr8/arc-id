export interface RegisterDeviceDTO {
  identityId: string
  localAccountId?: string
  name?: string
  fingerprint: string
  platform?: string
  browser?: string
  city?: string
  country?: string
}

export interface UpdateDeviceDTO {
  name?: string
  platform?: string
  browser?: string
  city?: string
  country?: string
  lastSeenAt?: Date
}
