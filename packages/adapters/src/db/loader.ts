// adapters/src/db/loader.ts
import { config } from '@arc-id/common';
import { DBAdapter, getDBAdapter } from './index';
import { PrismaClients, getPrismaClient, connectAll, initLogging } from '@arc-id/core';

export type DBDomains = 'primary' | 'replica' | 'analytics';

const cachedDb: Record<DBDomains, DBAdapter | null> = {
  primary: null,
  replica: null,
  analytics: null,
};

// Define the priority order for provider fallback
const DB_ORDER: Array<NonNullable<typeof config.DB.PROVIDER> | 'memory'> = [
  'postgres',
  'cockroach',
  'mysql',
  'sqlite',
  'memory',
];

/**
 * Factory to create a DBAdapter for a specific provider and domain.
 */
async function dbFactory(
  provider: NonNullable<typeof config.DB.PROVIDER> | 'memory',
  domain: DBDomains,
  prismaClient?: PrismaClients
): Promise<DBAdapter | null> {
  try {
    // Get Prisma client if needed
    const client = prismaClient ?? (provider !== 'memory' ? getPrismaClient(provider) : undefined);

    // Create adapter
    const db = getDBAdapter(provider, client);
    if (!db) return null;

    // Connect and add logging for non-memory DBs
    if (provider !== 'memory' && client) {
      await connectAll();
      if (config.APP.NODE_ENV !== 'production') initLogging();
    }

    return db;
  } catch (err) {
    console.error(`[DB][${provider}] Failed to create adapter:`, (err as Error).message);
    return null;
  }
}

/**
 * Load a DB provider with caching and optional fallback.
 */
export async function loadDBProvider(
  domain: DBDomains = 'primary',
  provider?: NonNullable<typeof config.DB.PROVIDER> | 'memory',
  prismaClient?: PrismaClients
): Promise<DBAdapter> {
  // Return cached adapter if already loaded
  if (cachedDb[domain]) return cachedDb[domain]!;

  const providersToTry = provider ? [provider] : DB_ORDER;

  let db: DBAdapter | null = null;

  for (const p of providersToTry) {
    db = await dbFactory(p, domain, prismaClient);
    if (db) break; // Stop at first successful provider
  }

  if (!db) {
    throw new Error(
      `Unable to load DB adapter for domain "${domain}" with providers: ${providersToTry.join(', ')}`
    );
  }

  cachedDb[domain] = db;
  return db;
}

/**
 * Clear the DB cache.
 */
export function clearDBCache(domain?: DBDomains) {
  if (domain) {
    cachedDb[domain] = null;
  } else {
    Object.keys(cachedDb).forEach(key => (cachedDb[key as DBDomains] = null));
  }
}
