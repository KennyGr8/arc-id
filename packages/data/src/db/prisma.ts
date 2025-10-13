// packages/core/src/db/prisma.ts
import { PrismaClient as PostgresClient } from "@generated/postgres";
import { PrismaClient as MySQLClient } from "@generated/mysql";
import { PrismaClient as CockroachClient } from "@generated/cockroach";
import { PrismaClient as SQLiteClient } from "@generated/sqlite";
import { config } from '@arc-id/common';

let postgres: PostgresClient | null = null;
let mysql: MySQLClient | null = null;
let cockroach: CockroachClient | null = null;
let sqlite: SQLiteClient | null = null;

export type DBProviders = 'postgres' | 'mysql' | 'cockroach' | 'sqlite';

export type PrismaClientsMap = {
  postgres: PostgresClient;
  mysql: MySQLClient;
  cockroach: CockroachClient;
  sqlite: SQLiteClient;
};

export type PrismaClients = PrismaClientsMap[keyof PrismaClientsMap];

export const getPostgres = (): PostgresClient => {
  if (!postgres) postgres = new PostgresClient({ datasources: { db: { url: config.DB.URL } } });
  return postgres;
};

export const getMySQL = (): MySQLClient => {
  if (!mysql) mysql = new MySQLClient({ datasources: { db: { url: process.env.DB_URL_MYSQL } } });
  return mysql;
};

export const getCockroach = (): CockroachClient => {
  if (!cockroach) cockroach = new CockroachClient({ datasources: { db: { url: process.env.DB_URL_COCKROACH } } });
  return cockroach;
};

export const getSQLite = (): SQLiteClient => {
  if (!sqlite) sqlite = new SQLiteClient({ datasources: { db: { url: process.env.DB_URL_SQLITE } } });
  return sqlite;
};

export const getPrismaClient = (provider: DBProviders): PrismaClients => {
  switch (provider) {
    case 'postgres': return getPostgres();
    case 'mysql': return getMySQL();
    case 'cockroach': return getCockroach();
    case 'sqlite': return getSQLite();
    default: throw new Error(`Unsupported provider: ${provider}`);
  }
};

// ---------- Connect / Disconnect ----------
export const connectAll = async () => {
  await Promise.all([
    postgres ? postgres.$connect() : Promise.resolve(),
    mysql ? mysql.$connect() : Promise.resolve(),
    cockroach ? cockroach.$connect() : Promise.resolve(),
    sqlite ? sqlite.$connect() : Promise.resolve(),
  ]);
};

export const disconnectAll = async () => {
  await Promise.all([
    postgres ? postgres.$disconnect() : Promise.resolve(),
    mysql ? mysql.$disconnect() : Promise.resolve(),
    cockroach ? cockroach.$disconnect() : Promise.resolve(),
    sqlite ? sqlite.$disconnect() : Promise.resolve(),
  ]);
};

// ---------- Logging ----------
export const initLogging = () => {
  if (config.APP.NODE_ENV === 'production') return;

  const addLogging = <TClient extends { $extends?: any; $use?: any }>(client: TClient, name: string) => {
    if (client.$extends) {
      client.$extends({
        query: {
          $allModels: {
            async $allOperations({ operation, model, params, query }: any) {
              console.debug(`[prisma][${name}] ${model ?? "<model>"} ${operation}`, params);
              return query(params);
            },
          },
        },
      });
    }

    if (client.$use) {
      client.$use(async (params: any, next: (params: any) => Promise<any>) => {
        console.debug(`[prisma][${name}][middleware] ${params.model ?? "<model>"} ${params.action}`, params.args);
        return next(params);
      });
    }
  };

  if (postgres) addLogging(postgres, "Postgres");
  if (mysql) addLogging(mysql, "MySQL");
  if (cockroach) addLogging(cockroach, "Cockroach");
  if (sqlite) addLogging(sqlite, "SQLite");
};
