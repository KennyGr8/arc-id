// packages/adapters/src/config/create-provider-loader.ts
export type ProviderFactory<T, P extends string, D extends string> = (
  provider: P,
  domain: D
) => T | null;

export async function createProviderLoader<T, P extends string, D extends string>(
  envProvider: P,
  factory: ProviderFactory<T, P, D>,
  fallbackOrder: P[],
  cache: { instance: T | null },
  domain: D,
  explicitProvider?: P
): Promise<T> {
  if (cache.instance) return cache.instance;

  const provider = explicitProvider || envProvider;

  try {
    const instance = factory(provider, domain);
    if (!instance) throw new Error(`Provider '${provider}' not supported for domain '${domain}'`);
    cache.instance = instance;
    return instance;
  } catch (err) {
    console.error(`[ProviderLoader][${provider}] failed for domain '${domain}' →`, err);

    // Try fallbacks
    for (const alt of fallbackOrder.filter((p) => p !== provider)) {
      try {
        const instance = factory(alt, domain);
        if (!instance) continue;
        console.log(`Using fallback provider: ${alt} (domain: ${domain})`);
        cache.instance = instance;
        return instance;
      } catch {
        continue;
      }
    }

    throw new Error(`All providers failed for loader with default '${envProvider}' (domain: '${domain}')`);
  }
}
