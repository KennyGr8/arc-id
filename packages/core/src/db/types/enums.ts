export enum MfaType {
  TOTP = "TOTP",
  WEBAUTHN = "WEBAUTHN",
  EMAIL = "EMAIL",
  SMS = "SMS",
}

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  GUEST = "GUEST",
  CUSTOM = "CUSTOM", // dynamic / sector-specific
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  VERIFIED = "VERIFIED",
  SUSPENDED = "SUSPENDED",
  BANNED = "BANNED",
  DELETED = "DELETED",
  PENDING = "PENDING",
  CUSTOM = "CUSTOM", // dynamic / sector-specific
}

export enum SubscriptionPlan {
  FREE = "FREE",
  PRO = "PRO",
  ENTERPRISE = "ENTERPRISE",
  STUDENT = "STUDENT",
}

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  CANCELED = "CANCELED",
  EXPIRED = "EXPIRED",
}

export enum TokenType {
  VERIFY_EMAIL = "VERIFY_EMAIL",
  RESET_PASSWORD = "RESET_PASSWORD",
  MAGIC_LINK = "MAGIC_LINK",
}
