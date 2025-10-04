// adapters/src/db/types.ts
import { config } from '@arc-id/common';
import { PrismaDBAdapter } from './prisma';
import { MemoryDBAdapter } from './memory';
// import { MongoDBAdapter } from './mongo';

import type {
  IUserAdapter,
  ISessionAdapter,
  ISubscriptionAdapter,
  IDeviceAdapter,
  IMfaAdapter,
  IEmailTokenAdapter,
  IOAuthAdapter,
  PrismaClients
} from '@arc-id/core';

export type DBProviders = 'postgres' | 'mysql' | 'sqlite' | 'cockroach' | 'memory';

export interface DBAdapter<TClient = any> {
  userAdapter: IUserAdapter;
  sessionAdapter: ISessionAdapter;
  subscriptionAdapter: ISubscriptionAdapter;
  deviceAdapter: IDeviceAdapter;
  mfaAdapter: IMfaAdapter;
  emailTokenAdapter: IEmailTokenAdapter;
  oauthAdapter: IOAuthAdapter;
}

/**
 * Factory to create a universal DB adapter
 */
export function getDBAdapter<T extends PrismaClients = PrismaClients>(
  provider: DBProviders = config.DB.PROVIDER as DBProviders,
  prismaClient?: T
): DBAdapter<T> {
  switch (provider) {
    case 'postgres':
    case 'mysql':
    case 'sqlite':
    case 'cockroach':
      if (!prismaClient) {
        throw new Error(`Prisma client must be provided for provider "${provider}"`);
      }
      return new PrismaDBAdapter(prismaClient);

    case 'memory':
      return new MemoryDBAdapter();

    // case 'mongo':
    //   return new MongoDBAdapter();

    default:
      throw new Error(`Unsupported DB provider: ${provider}`);
  }
}

/* Re-export adapters for direct import */
export * as prisma from './prisma';
export * as memory from './memory';
// export * as mongo from './mongo';
