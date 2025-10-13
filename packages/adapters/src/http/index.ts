// packages/adapters/src/http/index.ts

// --- ts-js.js providers ---
export * as express from './ts-js/express.adapter'
export * as fastify from './ts-js/fastify.adapter'
export * as hono from './ts-js/hono.adapter'
export * as node from './ts-js/node.adapter'

export * as koa from './ts-js/koa.adapter'
export * as hapi from './ts-js/hapi.adapter'
export * as nest from './ts-js/nest.adapter'
export * as next from './ts-js/next.adapter'

// --- Python providers ---
// export * as fastapi from './python/fastapi.adapter'
// export * as flask from './python/flask.adapter'
// export * as django from './python/django.adapter'

// --- PHP providers ---
// export * as laravel from './php/laravel.adapter'
// export * as symfony from './php/symfony.adapter'

// --- Go providers ---
// export * as gin from './go/gin.adapter'
// export * as fiber from './go/fiber.adapter'
// export * as chi from './go/chi.adapter'

// --- shared contract ---
export * from './types'
export * from './loader'