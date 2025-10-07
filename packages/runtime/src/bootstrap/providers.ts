// packages/runtime/src/bootstrap/providers.ts
import { db, mail, billing, cache } from '@arc-id/adapters'
import { config, logger } from '@arc-id/common'

export async function initProviders() {
  logger.info('🔌 Initializing core providers...')

  const primaryDb = await db.loadDBProvider(config.DB.DOMAIN)
  const cacheService = await cache.loadCacheProvider(config.CACHE.DOMAIN)
  const mailer = await mail.loadMailProvider(config.MAIL.DOMAIN)
  const billingService = await billing.loadBillingProvider(config.BILLING.DOMAIN)

  logger.info('✅ Providers initialized successfully')

  return {
    db: primaryDb,
    cache: cacheService,
    mailer,
    billing: billingService,
  }
}
