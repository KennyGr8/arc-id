// adapters/src/db/prisma/index.ts
import type {
  PrismaClients,
  IUserAdapter,
  ISessionAdapter,
  ISubscriptionAdapter,
  IDeviceAdapter,
  IMfaAdapter,
  IEmailTokenAdapter,
  IOAuthAdapter
} from '@arc-id/core';

import { UserAdapter } from './user.adapter';
import { SessionAdapter } from './session.adapter';
import { SubscriptionAdapter } from './subscription.adapter';
import { DeviceAdapter } from './device.adapter';
import { MfaAdapter } from './mfa.adapter';
import { EmailTokenAdapter } from './email-token.adapter';
import { OAuthAdapter } from './oauth.adapter';

import type { DBAdapter as BaseDBAdapter } from '../index';

export class PrismaDBAdapter<T extends PrismaClients> implements BaseDBAdapter<T> {
  userAdapter: IUserAdapter;
  sessionAdapter: ISessionAdapter;
  subscriptionAdapter: ISubscriptionAdapter;
  deviceAdapter: IDeviceAdapter;
  mfaAdapter: IMfaAdapter;
  emailTokenAdapter: IEmailTokenAdapter;
  oauthAdapter: IOAuthAdapter;

  constructor(prisma: T) {
    this.userAdapter = new UserAdapter(prisma);
    this.sessionAdapter = new SessionAdapter(prisma);
    this.subscriptionAdapter = new SubscriptionAdapter(prisma);
    this.deviceAdapter = new DeviceAdapter(prisma);
    this.mfaAdapter = new MfaAdapter(prisma);
    this.emailTokenAdapter = new EmailTokenAdapter(prisma);
    this.oauthAdapter = new OAuthAdapter(prisma);
  }

  switchClient(newClient: T) {
    this.userAdapter.switchClient(newClient);
    this.sessionAdapter.switchClient(newClient);
    this.subscriptionAdapter.switchClient(newClient);
    this.deviceAdapter.switchClient(newClient);
    this.mfaAdapter.switchClient(newClient);
    this.emailTokenAdapter.switchClient(newClient);
    this.oauthAdapter.switchClient(newClient);
  }
}
