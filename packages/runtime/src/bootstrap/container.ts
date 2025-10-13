// packages/runtime/src/bootstrap/container.ts
import type { DBAdapter, MailerAdapter, CacheAdapter, BillingAdapter } from '@arc-id/adapters'

export interface ProviderMap {
  db: DBAdapter
  cache: CacheAdapter
  mailer: MailerAdapter
  billing: BillingAdapter
}

let container: Partial<ProviderMap> = {}

export function registerProviders(providers: ProviderMap) {
  container = { ...container, ...providers }
}

export function useProvider<K extends keyof ProviderMap>(key: K): ProviderMap[K] {
  const provider = container[key]
  if (!provider) throw new Error(`Provider '${String(key)}' not registered in container`)
  return provider
}

export function getContainer(): Partial<ProviderMap> {
  return container
}
