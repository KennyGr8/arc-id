// adapters/src/db/loader.ts
import { config } from '@arc-id/common'
import type { DBAdapter } from './index'
import { getDBAdapter, DBProviders } from './types'

// Prisma utils
import {
  PrismaClients,
  getPrismaClient,
  connectAll,
  initLogging,
} from '@arc-id/data'

// Mongo & Mongoose utils
import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'

export type DBDomains = 'primary' | 'replica' | 'analytics'

const cachedDb: Record<DBDomains, DBAdapter | null> = {
  primary: null,
  replica: null,
  analytics: null,
}

// Order of preference for auto-fallback
const DB_ORDER: DBProviders[] = [
  'postgres',
  'cockroach',
  'mysql',
  'sqlite',
  'mongo',
  'mongoose',
  'memory',
]

async function dbFactory(
  provider: DBProviders,
  domain: DBDomains,
  prismaClient?: PrismaClients,
  mongoClient?: MongoClient,
  dbName?: string,
  mongooseInstance?: mongoose.Mongoose
): Promise<DBAdapter | null> {
  try {
    let db: DBAdapter | null = null

    switch (provider) {
      case 'postgres':
      case 'mysql':
      case 'sqlite':
      case 'cockroach': {
        const client = (prismaClient ?? (getPrismaClient(provider) as unknown)) as PrismaClients
        db = getDBAdapter(provider, client)
        if (client) {
          await connectAll()
          if (config.APP.NODE_ENV !== 'production') {
            initLogging()
          }
        }
        break
      }

      case 'mongo': {
        const client = mongoClient ?? new MongoClient(config.DB.URL)
        if (!dbName) throw new Error('Mongo requires dbName')
        await client.connect()
        db = getDBAdapter('mongo', client, dbName)
        break
      }

      case 'mongoose': {
        const mongo = mongooseInstance ?? (await mongoose.connect(config.DB.URL))
        db = getDBAdapter('mongoose', mongo)
        break
      }

      case 'memory': {
        db = getDBAdapter('memory')
        break
      }
    }

    return db
  } catch (err) {
    console.error(`[DB][${provider}][${domain}] Failed:`, (err as Error).message)
    return null
  }
}

/* Load a DB provider with fallback */
export async function loadDBProvider(
  domain: DBDomains = 'primary',
  provider?: DBProviders,
  prismaClient?: PrismaClients,
  mongoClient?: MongoClient,
  dbName?: string,
  mongooseInstance?: mongoose.Mongoose
): Promise<DBAdapter> {
  if (cachedDb[domain]) return cachedDb[domain]!

  const providersToTry = provider ? [provider] : DB_ORDER
  let db: DBAdapter | null = null

  for (const p of providersToTry) {
    db = await dbFactory(p, domain, prismaClient, mongoClient, dbName, mongooseInstance)
    if (db) break
  }

  if (!db) throw new Error(`Unable to load DB adapter for domain "${domain}"`)

  cachedDb[domain] = db
  return db
}

/** Clear DB cache for one or all domains */
export function clearDBCache(domain?: DBDomains) {
  if (domain) {
    cachedDb[domain] = null
  } else {
    Object.keys(cachedDb).forEach((key) => {
      cachedDb[key as DBDomains] = null
    })
  }
}
