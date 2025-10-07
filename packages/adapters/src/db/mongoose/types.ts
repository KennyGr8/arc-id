// adapters/src/db/mongoose/types.ts
import type { IIdentityAdapter, ISessionAdapter, ISubscriptionAdapter, IDeviceAdapter, IMfaAdapter, IEmailTokenAdapter, IOAuthAccountAdapter, IWalletAdapter, ITenantAdapter, ITenantPolicyAdapter, IProjectAdapter, IConsentAdapter, IDynamicRoleAdapter, IDynamicStatusAdapter, IClientAdapter, IAuthorizationCodeAdapter, IAccessTokenAdapter, IRefreshTokenAdapter, IAccessDelegationAdapter, IVerifiableCredentialAdapter, ILocalAccountAdapter, IMembershipAdapter, IExternalIdentifierAdapter, IAuditLogAdapter, IRevokedJtiAdapter,
} from '@arc-id/data'

import { MongooseIdentityAdapter, MongooseDeviceAdapter, MongooseEmailTokenAdapter, MongooseMfaAdapter, MongooseOAuthAdapter, MongooseSessionAdapter, MongooseSubscriptionAdapter, MongooseWalletAdapter, MongooseTenantAdapter, MongooseTenantPolicyAdapter, MongooseProjectAdapter, MongooseConsentAdapter, MongooseDynamicRoleAdapter, MongooseDynamicStatusAdapter, MongooseClientAdapter, MongooseAuthorizationCodeAdapter, MongooseAccessTokenAdapter, MongooseRefreshTokenAdapter, MongooseAccessDelegationAdapter, MongooseVerifiableCredentialAdapter, MongooseLocalAccountAdapter, MongooseMembershipAdapter, MongooseExternalIdentifierAdapter, MongooseAuditLogAdapter, MongooseRevokedJtiAdapter,
} from './index'

import type { DBAdapter as BaseDBAdapter } from '../index'
import type mongoose from 'mongoose'

export class MongooseDBAdapter implements BaseDBAdapter<mongoose.Mongoose> {
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

  constructor(mongo: mongoose.Mongoose) {
    this.identityAdapter = new MongooseIdentityAdapter()
    this.sessionAdapter = new MongooseSessionAdapter()
    this.subscriptionAdapter = new MongooseSubscriptionAdapter()
    this.deviceAdapter = new MongooseDeviceAdapter()
    this.mfaAdapter = new MongooseMfaAdapter()
    this.emailTokenAdapter = new MongooseEmailTokenAdapter()
    this.oauthAdapter = new MongooseOAuthAdapter()

    this.walletAdapter = new MongooseWalletAdapter()
    this.tenantAdapter = new MongooseTenantAdapter()
    this.tenantPolicyAdapter = new MongooseTenantPolicyAdapter()
    this.projectAdapter = new MongooseProjectAdapter()
    this.consentAdapter = new MongooseConsentAdapter()
    this.dynamicRoleAdapter = new MongooseDynamicRoleAdapter()
    this.dynamicStatusAdapter = new MongooseDynamicStatusAdapter()
    this.clientAdapter = new MongooseClientAdapter()
    this.authorizationCodeAdapter = new MongooseAuthorizationCodeAdapter()
    this.accessTokenAdapter = new MongooseAccessTokenAdapter()
    this.refreshTokenAdapter = new MongooseRefreshTokenAdapter()
    this.accessDelegationAdapter = new MongooseAccessDelegationAdapter()
    this.verifiableCredentialAdapter = new MongooseVerifiableCredentialAdapter()
    this.localAccountAdapter = new MongooseLocalAccountAdapter()
    this.membershipAdapter = new MongooseMembershipAdapter()
    this.externalIdentifierAdapter = new MongooseExternalIdentifierAdapter()
    this.auditLogAdapter = new MongooseAuditLogAdapter()
    this.revokedJtiAdapter = new MongooseRevokedJtiAdapter()

    // Initialize all adapters with the same Mongoose connection
    this.switchClient(mongo)
  }

  switchClient(mongo: mongoose.Mongoose) {
    this.identityAdapter.switchClient(mongo)
    this.sessionAdapter.switchClient(mongo)
    this.subscriptionAdapter.switchClient(mongo)
    this.deviceAdapter.switchClient(mongo)
    this.mfaAdapter.switchClient(mongo)
    this.emailTokenAdapter.switchClient(mongo)
    this.oauthAdapter.switchClient(mongo)

    this.walletAdapter.switchClient(mongo)
    this.tenantAdapter.switchClient(mongo)
    this.tenantPolicyAdapter.switchClient(mongo)
    this.projectAdapter.switchClient(mongo)
    this.consentAdapter.switchClient(mongo)
    this.dynamicRoleAdapter.switchClient(mongo)
    this.dynamicStatusAdapter.switchClient(mongo)
    this.clientAdapter.switchClient(mongo)
    this.authorizationCodeAdapter.switchClient(mongo)
    this.accessTokenAdapter.switchClient(mongo)
    this.refreshTokenAdapter.switchClient(mongo)
    this.accessDelegationAdapter.switchClient(mongo)
    this.verifiableCredentialAdapter.switchClient(mongo)
    this.localAccountAdapter.switchClient(mongo)
    this.membershipAdapter.switchClient(mongo)
    this.externalIdentifierAdapter.switchClient(mongo)
    this.auditLogAdapter.switchClient(mongo)
    this.revokedJtiAdapter.switchClient(mongo)
  }
}
