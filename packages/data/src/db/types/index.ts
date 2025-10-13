// src/db/types/index.ts
export * from './core'
export * from './oauth'
export * from './auth'
export * from './audit'
export * from './credentials'

export * from './base.adapter'
export * from './enums'

// re-export Prisma types for convenience
export type {
  Identity,  Session,  EmailToken,
  OAuthAccount,  Device,  Mfa,  Subscription,
  Wallet, Tenant, TenantPolicy, Project,
  Consent, DynamicRole, DynamicStatus, Client,
  AuthorizationCode, AccessToken, RefreshToken, AccessDelegation, VerifiableCredential, LocalAccount, Membership, ExternalIdentifier, AuditLog, RevokedJti
} from '@generated/postgres'
