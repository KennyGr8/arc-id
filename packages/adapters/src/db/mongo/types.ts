// adapters/src/db/mongo/types.ts
import type {
  IIdentityAdapter, ISessionAdapter, ISubscriptionAdapter, IDeviceAdapter, IMfaAdapter, IEmailTokenAdapter, IOAuthAccountAdapter, IWalletAdapter, ITenantAdapter, ITenantPolicyAdapter, IProjectAdapter, IConsentAdapter, IDynamicRoleAdapter, IDynamicStatusAdapter, IClientAdapter, IAuthorizationCodeAdapter, IAccessTokenAdapter, IRefreshTokenAdapter, IAccessDelegationAdapter, IVerifiableCredentialAdapter, ILocalAccountAdapter, IMembershipAdapter, IExternalIdentifierAdapter, IAuditLogAdapter, IRevokedJtiAdapter,
} from '@arc-id/data'

import {
  MongoIdentityAdapter,
  MongoDeviceAdapter,
  MongoEmailTokenAdapter,
  MongoMfaAdapter,
  MongoOAuthAdapter,
  MongoSessionAdapter,
  MongoSubscriptionAdapter,
  MongoWalletAdapter,
  MongoTenantAdapter,
  MongoTenantPolicyAdapter,
  MongoProjectAdapter,
  MongoConsentAdapter,
  MongoDynamicRoleAdapter,
  MongoDynamicStatusAdapter,
  MongoClientAdapter,
  MongoAuthorizationCodeAdapter,
  MongoAccessTokenAdapter,
  MongoRefreshTokenAdapter,
  MongoAccessDelegationAdapter,
  MongoVerifiableCredentialAdapter,
  MongoLocalAccountAdapter,
  MongoMembershipAdapter,
  MongoExternalIdentifierAdapter,
  MongoAuditLogAdapter,
  MongoRevokedJtiAdapter,
} from './index'

import type { DBAdapter as BaseDBAdapter } from '../index'
import type { MongoClient, Db } from 'mongodb'

export class MongoDBAdapter implements BaseDBAdapter<Db> {
  identityAdapter: IIdentityAdapter
  sessionAdapter: ISessionAdapter
  subscriptionAdapter: ISubscriptionAdapter
  deviceAdapter: IDeviceAdapter
  mfaAdapter: IMfaAdapter
  emailTokenAdapter: IEmailTokenAdapter
  oauthAdapter: IOAuthAccountAdapter

  walletAdapter: IWalletAdapter
  tenantAdapter: ITenantAdapter
  tenantPolicyAdapter: ITenantPolicyAdapter
  projectAdapter: IProjectAdapter
  consentAdapter: IConsentAdapter
  dynamicRoleAdapter: IDynamicRoleAdapter
  dynamicStatusAdapter: IDynamicStatusAdapter
  clientAdapter: IClientAdapter
  authorizationCodeAdapter: IAuthorizationCodeAdapter
  accessTokenAdapter: IAccessTokenAdapter
  refreshTokenAdapter: IRefreshTokenAdapter
  accessDelegationAdapter: IAccessDelegationAdapter
  verifiableCredentialAdapter: IVerifiableCredentialAdapter
  localAccountAdapter: ILocalAccountAdapter
  membershipAdapter: IMembershipAdapter
  externalIdentifierAdapter: IExternalIdentifierAdapter
  auditLogAdapter: IAuditLogAdapter
  revokedJtiAdapter: IRevokedJtiAdapter

  private db: Db

  constructor(client: MongoClient, dbName: string) {
    this.db = client.db(dbName)

    this.identityAdapter = new MongoIdentityAdapter(this.db)
    this.sessionAdapter = new MongoSessionAdapter(this.db)
    this.subscriptionAdapter = new MongoSubscriptionAdapter(this.db)
    this.deviceAdapter = new MongoDeviceAdapter(this.db)
    this.mfaAdapter = new MongoMfaAdapter(this.db)
    this.emailTokenAdapter = new MongoEmailTokenAdapter(this.db)
    this.oauthAdapter = new MongoOAuthAdapter(this.db)

    this.walletAdapter = new MongoWalletAdapter(this.db)
    this.tenantAdapter = new MongoTenantAdapter(this.db)
    this.tenantPolicyAdapter = new MongoTenantPolicyAdapter(this.db)
    this.projectAdapter = new MongoProjectAdapter(this.db)
    this.consentAdapter = new MongoConsentAdapter(this.db)
    this.dynamicRoleAdapter = new MongoDynamicRoleAdapter(this.db)
    this.dynamicStatusAdapter = new MongoDynamicStatusAdapter(this.db)
    this.clientAdapter = new MongoClientAdapter(this.db)
    this.authorizationCodeAdapter = new MongoAuthorizationCodeAdapter(this.db)
    this.accessTokenAdapter = new MongoAccessTokenAdapter(this.db)
    this.refreshTokenAdapter = new MongoRefreshTokenAdapter(this.db)
    this.accessDelegationAdapter = new MongoAccessDelegationAdapter(this.db)
    this.verifiableCredentialAdapter = new MongoVerifiableCredentialAdapter(this.db)
    this.localAccountAdapter = new MongoLocalAccountAdapter(this.db)
    this.membershipAdapter = new MongoMembershipAdapter(this.db)
    this.externalIdentifierAdapter = new MongoExternalIdentifierAdapter(this.db)
    this.auditLogAdapter = new MongoAuditLogAdapter(this.db)
    this.revokedJtiAdapter = new MongoRevokedJtiAdapter(this.db)

    // initialize adapters with db
    this.switchClient(this.db)
  }

  switchClient(db: Db) {
    this.db = db

    this.identityAdapter.switchClient(db)
    this.sessionAdapter.switchClient(db)
    this.subscriptionAdapter.switchClient(db)
    this.deviceAdapter.switchClient(db)
    this.mfaAdapter.switchClient(db)
    this.emailTokenAdapter.switchClient(db)
    this.oauthAdapter.switchClient(db)

    this.walletAdapter.switchClient(db)
    this.tenantAdapter.switchClient(db)
    this.tenantPolicyAdapter.switchClient(db)
    this.projectAdapter.switchClient(db)
    this.consentAdapter.switchClient(db)
    this.dynamicRoleAdapter.switchClient(db)
    this.dynamicStatusAdapter.switchClient(db)
    this.clientAdapter.switchClient(db)
    this.authorizationCodeAdapter.switchClient(db)
    this.accessTokenAdapter.switchClient(db)
    this.refreshTokenAdapter.switchClient(db)
    this.accessDelegationAdapter.switchClient(db)
    this.verifiableCredentialAdapter.switchClient(db)
    this.localAccountAdapter.switchClient(db)
    this.membershipAdapter.switchClient(db)
    this.externalIdentifierAdapter.switchClient(db)
    this.auditLogAdapter.switchClient(db)
    this.revokedJtiAdapter.switchClient(db)
  }
}
