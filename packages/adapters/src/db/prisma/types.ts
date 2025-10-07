import type {
  PrismaClients, IIdentityAdapter, ISessionAdapter, ISubscriptionAdapter, IDeviceAdapter, IMfaAdapter, IEmailTokenAdapter, IOAuthAccountAdapter, IWalletAdapter, ITenantAdapter, ITenantPolicyAdapter, IProjectAdapter, IConsentAdapter, IDynamicRoleAdapter, IDynamicStatusAdapter, IClientAdapter, IAuthorizationCodeAdapter, IAccessTokenAdapter, IRefreshTokenAdapter, IAccessDelegationAdapter, IVerifiableCredentialAdapter, ILocalAccountAdapter, IMembershipAdapter, IExternalIdentifierAdapter, IAuditLogAdapter, IRevokedJtiAdapter,
} from '@arc-id/data';

import { 
  IdentityAdapter, DeviceAdapter, EmailTokenAdapter, MfaAdapter, OAuthAdapter, SessionAdapter, SubscriptionAdapter, WalletAdapter, TenantAdapter, TenantPolicyAdapter, ProjectAdapter, ConsentAdapter, DynamicRoleAdapter, DynamicStatusAdapter, ClientAdapter, AuthorizationCodeAdapter, AccessTokenAdapter, RefreshTokenAdapter, AccessDelegationAdapter, VerifiableCredentialAdapter, LocalAccountAdapter, MembershipAdapter, ExternalIdentifierAdapter, AuditLogAdapter, RevokedJtiAdapter 
} from './index'

import type { DBAdapter as BaseDBAdapter } from '../index';

export class PrismaDBAdapter<T extends PrismaClients> implements BaseDBAdapter<T> {
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

  constructor(prisma: T) {
    this.identityAdapter = new IdentityAdapter(prisma);
    this.sessionAdapter = new SessionAdapter(prisma);
    this.subscriptionAdapter = new SubscriptionAdapter(prisma);
    this.deviceAdapter = new DeviceAdapter(prisma);
    this.mfaAdapter = new MfaAdapter(prisma);
    this.emailTokenAdapter = new EmailTokenAdapter(prisma);
    this.oauthAdapter = new OAuthAdapter(prisma);

    this.walletAdapter = new WalletAdapter(prisma);
    this.tenantAdapter = new TenantAdapter(prisma);
    this.tenantPolicyAdapter = new TenantPolicyAdapter(prisma);
    this.projectAdapter = new ProjectAdapter(prisma);
    this.consentAdapter = new ConsentAdapter(prisma);
    this.dynamicRoleAdapter = new DynamicRoleAdapter(prisma);
    this.dynamicStatusAdapter = new DynamicStatusAdapter(prisma);
    this.clientAdapter = new ClientAdapter(prisma);
    this.authorizationCodeAdapter = new AuthorizationCodeAdapter(prisma);
    this.accessTokenAdapter = new AccessTokenAdapter(prisma);
    this.refreshTokenAdapter = new RefreshTokenAdapter(prisma);
    this.accessDelegationAdapter = new AccessDelegationAdapter(prisma);
    this.verifiableCredentialAdapter = new VerifiableCredentialAdapter(prisma);
    this.localAccountAdapter = new LocalAccountAdapter(prisma);
    this.membershipAdapter = new MembershipAdapter(prisma);
    this.externalIdentifierAdapter = new ExternalIdentifierAdapter(prisma);
    this.auditLogAdapter = new AuditLogAdapter(prisma);
    this.revokedJtiAdapter = new RevokedJtiAdapter(prisma);
  }

  switchClient(newClient: T) {
    this.identityAdapter.switchClient(newClient);
    this.sessionAdapter.switchClient(newClient);
    this.subscriptionAdapter.switchClient(newClient);
    this.deviceAdapter.switchClient(newClient);
    this.mfaAdapter.switchClient(newClient);
    this.emailTokenAdapter.switchClient(newClient);
    this.oauthAdapter.switchClient(newClient);

    this.walletAdapter.switchClient(newClient);
    this.tenantAdapter.switchClient(newClient);
    this.tenantPolicyAdapter.switchClient(newClient);
    this.projectAdapter.switchClient(newClient);
    this.consentAdapter.switchClient(newClient);
    this.dynamicRoleAdapter.switchClient(newClient);
    this.dynamicStatusAdapter.switchClient(newClient);
    this.clientAdapter.switchClient(newClient);
    this.authorizationCodeAdapter.switchClient(newClient);
    this.accessTokenAdapter.switchClient(newClient);
    this.refreshTokenAdapter.switchClient(newClient);
    this.accessDelegationAdapter.switchClient(newClient);
    this.verifiableCredentialAdapter.switchClient(newClient);
    this.localAccountAdapter.switchClient(newClient);
    this.membershipAdapter.switchClient(newClient);
    this.externalIdentifierAdapter.switchClient(newClient);
    this.auditLogAdapter.switchClient(newClient);
    this.revokedJtiAdapter.switchClient(newClient);
  }
}
