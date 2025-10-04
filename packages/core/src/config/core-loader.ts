import { db, mail, cache, billing } from '@arc-id/adapters'

export async function initCore() {
  const database = await db.loadDBProvider('primary')
  const cacheStore = await cache.loadCacheProvider('session')
  const mailer = await mail.loadMailProvider('transactional')
  const billingSystem = await billing.loadBillingProvider('checkout')

  return { database, cacheStore, mailer, billingSystem }
}
