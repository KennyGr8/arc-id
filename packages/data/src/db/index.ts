export * from './prisma'
export * from './types'
export * from './dtos'

// packages/core/src/db/index.ts
export { PrismaClient as SQLiteClient } from '@generated/sqlite';
export { PrismaClient as PostgresClient } from '@generated/postgres';
export { PrismaClient as CockroachClient } from '@generated/cockroach';
export { PrismaClient as MySQLClient } from '@generated/mysql';

export type { DBProviders, PrismaClients, PrismaClientsMap } from './prisma';
export { getPrismaClient, connectAll, disconnectAll, initLogging } from './prisma';