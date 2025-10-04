// packages/adapters/src/cache/loader.ts
import { config } from '@arc-id/common'
import { CacheAdapter } from './types'
import { redis, memory } from './index'
import { createProviderLoader } from '../config'

export type CacheProviders = 'redis' | 'memory'
export type CacheDomains = 'session' | 'rate-limit' | 'jobs' | 'general'

let cachedCache = { instance: null as CacheAdapter | null }

const CACHE_ORDER: CacheProviders[] = ['redis', 'memory']

function cacheFactory(provider: CacheProviders, domain: CacheDomains): CacheAdapter | null {
  switch (provider) {
    case 'redis':
      if (domain === 'session') return new redis.RedisSessionAdapter()
      if (domain === 'rate-limit') return new redis.RedisRateLimitAdapter()
      if (domain === 'jobs') return new redis.RedisJobsAdapter()
      if (domain === 'general') return new redis.RedisGeneralAdapter()
      break
    case 'memory':
      if (domain === 'session') return new memory.MemorySessionAdapter()
      if (domain === 'rate-limit') return new memory.MemoryRateLimitAdapter()
      if (domain === 'jobs') return new memory.MemoryJobsAdapter()
      if (domain === 'general') return new memory.MemoryGeneralAdapter()
      break
  }
  return null
}

export async function loadCacheProvider(
  domain: CacheDomains = 'session',
  provider?: CacheProviders
): Promise<CacheAdapter> {
  return createProviderLoader(
    config.CACHE.PROVIDER as CacheProviders,
    (prov) => cacheFactory(prov, domain),
    CACHE_ORDER,
    cachedCache,
    domain,
    provider
  )
}
