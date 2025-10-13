// packages/adapters/src/http/loader.ts
import { config } from '@arc-id/common'
import { HttpAdapter } from './types'
import { express, fastify, hono, node, hapi, koa, nest, next } from './index' // Node providers
// NOTE: future imports for Python/PHP/Go will live here
// import { fastapi, flask } from './python'
// import { laravel, symfony } from './php'
// import { gin, fiber } from './go'

import { createProviderLoader } from '../config'

export type HttpProviders =
  | 'express'
  | 'fastify'
  | 'hono'
  | 'node'
  | 'koa'
  | 'hapi'
  | 'nest'
  | 'next'
  // --- placeholders for ---
  // future expansions
  | 'fastapi'
  | 'flask'
  | 'django'
  | 'laravel'
  | 'symfony'
  | 'go'

export type HttpDomains = 'default' | 'api' | 'admin' | 'public' | 'internal'

/**
 * cached instances of adapters per domain
 */
const cachedHttp: Record<HttpDomains, HttpAdapter | null> = {
  default: null,
  api: null,
  admin: null,
  public: null,
  internal: null,
}

/**
 * priority order of HTTP providers
 * (will try each if none explicitly configured)
 */
const HTTP_ORDER: HttpProviders[] = ['express', 'fastify', 'hono', 'node', 'koa', 'hapi', 'nest', 'next']

function httpFactory(
  provider: HttpProviders,
  domain: HttpDomains
): HttpAdapter | null {
  switch (provider) {
    case 'express':
      return new express.ExpressHttpAdapter()
    case 'fastify':
      return new fastify.FastifyHttpAdapter()
    case 'hono':
      return new hono.HonoHttpAdapter()
    case 'hapi':
      return new hapi.HapiHttpAdapter()
    case 'koa':
      return new koa.KoaHttpAdapter()
    case 'nest':
      return new nest.NestHttpAdapter()
    case 'next':
      return new next.NextHttpAdapter()
    case 'node':
      return new node.NodeHttpAdapter()

    // --- Future hooks for Python/PHP/Go ---
    // case 'fastapi':
    //   return new fastapi.PythonHttpAdapter('fastapi')
    // case 'flask':
    //   return new flask.PythonHttpAdapter('flask')
    // case 'laravel':
    //   return new laravel.PhpHttpAdapter('laravel')
    // case 'symfony':
    //   return new symfony.PhpHttpAdapter('symfony')
    // case 'go':
    //   return new go.GoHttpAdapter('gin') // or fiber, chi, etc.
  }
  return null
}

/**
 * Loader function
 * - picks provider from config or param
 * - falls back to HTTP_ORDER
 * - caches per domain
 */
export async function loadHttpProvider(
  domain: HttpDomains = 'default',
  provider?: HttpProviders
): Promise<HttpAdapter> {
  return createProviderLoader(
    config.HTTP.PROVIDER as HttpProviders,
    (prov) => httpFactory(prov, domain),
    HTTP_ORDER,
    cachedHttp,
    domain,
    provider
  )
}
