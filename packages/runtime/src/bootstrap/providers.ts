// packages/runtime/src/bootstrap/providers.ts
import { db, mail, billing, cache } from '@arc-id/adapters'
import { config } from '@arc-id/common'

export async function initProviders() {
  const primaryDb = await db.loadDBProvider('primary')
  const cacheService = await cache.loadCacheProvider('session')
  const mailer = await mail.loadMailProvider('transactional')
  const billingService = await billing.loadBillingProvider('checkout')

  return {
    db: primaryDb,
    cache: cacheService,
    mailer,
    billing: billingService,
  }
}
