// adapters/src/db/types.ts
import { config } from '@arc-id/common';
import { PrismaDBAdapter } from './prisma';
import { MemoryDBAdapter } from './memory';
import { MongoDBAdapter } from './mongo';
import { MongooseDBAdapter } from './mongoose';

import type { PrismaClients } from '@arc-id/data';
import type { DBAdapter as BaseDBAdapter } from './index';

export type DBProviders = 'postgres' | 'mysql' | 'sqlite' | 'cockroach' | 'memory' | 'mongo' | 'mongoose';

export function getDBAdapter<T extends PrismaClients = PrismaClients>(
  provider: DBProviders = config.DB.PROVIDER as DBProviders,
  client?: any,
  dbName?: string
): BaseDBAdapter<any> {
  switch (provider) {
    case 'postgres':
    case 'mysql':
    case 'sqlite':
    case 'cockroach':
      if (!client) throw new Error(`Prisma client must be provided for provider "${provider}"`);
      return new PrismaDBAdapter(client);

    case 'memory':
      return new MemoryDBAdapter();

    case 'mongo':
      if (!client || !dbName) throw new Error('Mongo client and dbName must be provided');
      return new MongoDBAdapter(client, dbName);

    case 'mongoose':
      if (!client) throw new Error('Mongoose instance must be provided');
      return new MongooseDBAdapter(client);

    default:
      throw new Error(`Unsupported DB provider: ${provider}`);
  }
}
