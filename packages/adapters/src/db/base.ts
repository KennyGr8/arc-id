// adapters/src/db/base.ts
import type {
  IIdentityAdapter,
  ISessionAdapter,
  ISubscriptionAdapter,
  IDeviceAdapter,
  IMfaAdapter,
  IEmailTokenAdapter,
  IOAuthAccountAdapter,
  IWalletAdapter,
  ITenantAdapter,
  ITenantPolicyAdapter,
  IProjectAdapter,
  IConsentAdapter,
  IDynamicRoleAdapter,
  IDynamicStatusAdapter,
  IClientAdapter,
  IAuthorizationCodeAdapter,
  IAccessTokenAdapter,
  IRefreshTokenAdapter,
  IAccessDelegationAdapter,
  IVerifiableCredentialAdapter,
  ILocalAccountAdapter,
  IMembershipAdapter,
  IExternalIdentifierAdapter,
  IAuditLogAdapter,
  IRevokedJtiAdapter,
} from '@arc-id/data';

/* Base interface for all DB adapters */
export interface DBAdapter<TClient = any> {
  identityAdapter: IIdentityAdapter;
  sessionAdapter: ISessionAdapter;
  subscriptionAdapter: ISubscriptionAdapter;
  deviceAdapter: IDeviceAdapter;
  mfaAdapter: IMfaAdapter;
  emailTokenAdapter: IEmailTokenAdapter;
  oauthAdapter: IOAuthAccountAdapter;

  walletAdapter: IWalletAdapter;
  tenantAdapter: ITenantAdapter;
  tenantPolicyAdapter: ITenantPolicyAdapter;
  projectAdapter: IProjectAdapter;
  consentAdapter: IConsentAdapter;
  dynamicRoleAdapter: IDynamicRoleAdapter;
  dynamicStatusAdapter: IDynamicStatusAdapter;
  clientAdapter: IClientAdapter;
  authorizationCodeAdapter: IAuthorizationCodeAdapter;
  accessTokenAdapter: IAccessTokenAdapter;
  refreshTokenAdapter: IRefreshTokenAdapter;
  accessDelegationAdapter: IAccessDelegationAdapter;
  verifiableCredentialAdapter: IVerifiableCredentialAdapter;
  localAccountAdapter: ILocalAccountAdapter;
  membershipAdapter: IMembershipAdapter;
  externalIdentifierAdapter: IExternalIdentifierAdapter;
  auditLogAdapter: IAuditLogAdapter;
  revokedJtiAdapter: IRevokedJtiAdapter;

  switchClient(client: TClient): void;
  connect?(): Promise<void>;
  disconnect?(): Promise<void>;
  client?: TClient;
}
