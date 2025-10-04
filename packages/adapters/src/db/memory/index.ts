// index.ts
export * from './user.adapter';
export * from './device.adapter';
export * from './email-token.adapter';
export * from './mfa.adapter';
export * from './oauth.adapter';
export * from './session.adapter';
export * from './subscription.adapter';

import { MemoryUserAdapter } from './user.adapter';
import { MemoryDeviceAdapter } from './device.adapter';
import { MemoryEmailTokenAdapter } from './email-token.adapter';
import { MemoryMfaAdapter } from './mfa.adapter';
import { MemoryOAuthAdapter } from './oauth.adapter';
import { MemorySessionAdapter } from './session.adapter';
import { MemorySubscriptionAdapter } from './subscription.adapter';

export class MemoryDBAdapter {
  userAdapter: MemoryUserAdapter;
  deviceAdapter: MemoryDeviceAdapter;
  emailTokenAdapter: MemoryEmailTokenAdapter;
  mfaAdapter: MemoryMfaAdapter;
  oauthAdapter: MemoryOAuthAdapter;
  sessionAdapter: MemorySessionAdapter;
  subscriptionAdapter: MemorySubscriptionAdapter;

  constructor() {
    this.userAdapter = new MemoryUserAdapter();
    this.deviceAdapter = new MemoryDeviceAdapter();
    this.emailTokenAdapter = new MemoryEmailTokenAdapter();
    this.mfaAdapter = new MemoryMfaAdapter();
    this.oauthAdapter = new MemoryOAuthAdapter();
    this.sessionAdapter = new MemorySessionAdapter();
    this.subscriptionAdapter = new MemorySubscriptionAdapter();
  }

  // optional helper: maintains interface compatibility
  switchClient(_newClient?: any) {
    // No-op in memory mode
  }
}
