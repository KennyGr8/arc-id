import { 
  MemoryIdentityAdapter, MemoryDeviceAdapter, MemoryEmailTokenAdapter, MemoryMfaAdapter, MemoryOAuthAdapter, MemorySessionAdapter, MemorySubscriptionAdapter, MemoryWalletAdapter, MemoryTenantAdapter, MemoryTenantPolicyAdapter, MemoryProjectAdapter, MemoryConsentAdapter, MemoryDynamicRoleAdapter, MemoryDynamicStatusAdapter, MemoryClientAdapter, MemoryAuthorizationCodeAdapter, MemoryAccessTokenAdapter, MemoryRefreshTokenAdapter, MemoryAccessDelegationAdapter, MemoryVerifiableCredentialAdapter, MemoryLocalAccountAdapter, MemoryMembershipAdapter, MemoryExternalIdentifierAdapter, MemoryAuditLogAdapter, MemoryRevokedJtiAdapter 
} from './index'

export class MemoryDBAdapter {
  identityAdapter: MemoryIdentityAdapter;
  deviceAdapter: MemoryDeviceAdapter;
  emailTokenAdapter: MemoryEmailTokenAdapter;
  mfaAdapter: MemoryMfaAdapter;
  oauthAdapter: MemoryOAuthAdapter;
  sessionAdapter: MemorySessionAdapter;
  subscriptionAdapter: MemorySubscriptionAdapter;

  walletAdapter: MemoryWalletAdapter;
  tenantAdapter: MemoryTenantAdapter;
  tenantPolicyAdapter: MemoryTenantPolicyAdapter;
  projectAdapter: MemoryProjectAdapter;
  consentAdapter: MemoryConsentAdapter;
  dynamicRoleAdapter: MemoryDynamicRoleAdapter;
  dynamicStatusAdapter: MemoryDynamicStatusAdapter;
  clientAdapter: MemoryClientAdapter;
  authorizationCodeAdapter: MemoryAuthorizationCodeAdapter;
  accessTokenAdapter: MemoryAccessTokenAdapter;
  refreshTokenAdapter: MemoryRefreshTokenAdapter;
  accessDelegationAdapter: MemoryAccessDelegationAdapter;
  verifiableCredentialAdapter: MemoryVerifiableCredentialAdapter;
  localAccountAdapter: MemoryLocalAccountAdapter;
  membershipAdapter: MemoryMembershipAdapter;
  externalIdentifierAdapter: MemoryExternalIdentifierAdapter;
  auditLogAdapter: MemoryAuditLogAdapter;
  revokedJtiAdapter: MemoryRevokedJtiAdapter;

  constructor() {
    this.identityAdapter = new MemoryIdentityAdapter();
    this.deviceAdapter = new MemoryDeviceAdapter();
    this.emailTokenAdapter = new MemoryEmailTokenAdapter();
    this.mfaAdapter = new MemoryMfaAdapter();
    this.oauthAdapter = new MemoryOAuthAdapter();
    this.sessionAdapter = new MemorySessionAdapter();
    this.subscriptionAdapter = new MemorySubscriptionAdapter();

    this.walletAdapter = new MemoryWalletAdapter();
    this.tenantAdapter = new MemoryTenantAdapter();
    this.tenantPolicyAdapter = new MemoryTenantPolicyAdapter();
    this.projectAdapter = new MemoryProjectAdapter();
    this.consentAdapter = new MemoryConsentAdapter();
    this.dynamicRoleAdapter = new MemoryDynamicRoleAdapter();
    this.dynamicStatusAdapter = new MemoryDynamicStatusAdapter();
    this.clientAdapter = new MemoryClientAdapter();
    this.authorizationCodeAdapter = new MemoryAuthorizationCodeAdapter();
    this.accessTokenAdapter = new MemoryAccessTokenAdapter();
    this.refreshTokenAdapter = new MemoryRefreshTokenAdapter();
    this.accessDelegationAdapter = new MemoryAccessDelegationAdapter();
    this.verifiableCredentialAdapter = new MemoryVerifiableCredentialAdapter();
    this.localAccountAdapter = new MemoryLocalAccountAdapter();
    this.membershipAdapter = new MemoryMembershipAdapter();
    this.externalIdentifierAdapter = new MemoryExternalIdentifierAdapter();
    this.auditLogAdapter = new MemoryAuditLogAdapter();
    this.revokedJtiAdapter = new MemoryRevokedJtiAdapter();
  }

  // no-op for memory
  switchClient(_newClient?: any) {
    // Nothing to do in memory
  }
}
