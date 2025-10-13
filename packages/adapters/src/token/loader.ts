// packages/adapters/src/token/loader.ts
import { jwt } from './index'
import { TokenAdapter } from './types'
import { createProviderLoader } from '../config'

export type TokenProviders = 'jwt'
export type TokenDomains = 'session' | 'access' | 'refresh'

let cachedToken: { instance: TokenAdapter | null } = { instance: null }

const TOKEN_ORDER: TokenProviders[] = ['jwt']

function tokenFactory(
  provider: TokenProviders,
  _domain: TokenDomains
): TokenAdapter | null {
  switch (provider) {
    case 'jwt':
      return new jwt.JwtTokenAdapter()
  }
  return null
}

export async function loadTokenProvider(
  domain: TokenDomains = 'session',
  provider?: TokenProviders
): Promise<TokenAdapter> {
  return createProviderLoader(
    process.env.TOKEN_PROVIDER as TokenProviders,
    (prov) => tokenFactory(prov, domain),
    TOKEN_ORDER,
    cachedToken,
    domain,
    provider
  )
}
