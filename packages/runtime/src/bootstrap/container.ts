// packages/runtime/src/bootstrap/container.ts
type ProviderMap = Record<string, any>

let container: ProviderMap = {}

export function registerProviders(providers: ProviderMap) {
  container = { ...container, ...providers }
}

export function useProvider<T = any>(key: string): T {
  const provider = container[key]
  if (!provider) throw new Error(`Provider '${key}' not registered in container`)
  return provider
}

export function getContainer() {
  return container
}
