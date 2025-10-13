// runtime/src/http/bootstrap.ts

import { loadHttpProvider, type HttpAdapter } from '@arc-id/adapters'

// simple helper to run a test server
async function bootstrap() {
  // default: "api" domain
  const http: HttpAdapter = await loadHttpProvider('api')

  await http.init()

  // Health check route
  http.registerRoute('GET', '/health', async (req, res) => {
    res.json({
      ok: true,
      provider: process.env.HTTP_PROVIDER || 'default',
      domain: 'api',
      query: req.query,
    })
  })

  // Example POST route
  http.registerRoute('POST', '/echo', async (req, res) => {
    res.json({
      youSent: req.body,
      provider: process.env.HTTP_PROVIDER || 'default',
    })
  })

  // Example middleware (logs requests)
  http.use(async (req, _res, next) => {
    console.log(`[${process.env.HTTP_PROVIDER}] ${JSON.stringify(req.query)}`)
    next()
  })

  await http.start(3000)
}

bootstrap().catch((err) => {
  console.error('Bootstrap failed:', err)
  process.exit(1)
} )

/*
To run different HTTP providers, set the HTTP_PROVIDER environment variable and execute the script.

# Express
HTTP_PROVIDER=express ts-node examples/http/bootstrap.ts

# Fastify
HTTP_PROVIDER=fastify ts-node examples/http/bootstrap.ts

# Hono
HTTP_PROVIDER=hono ts-node examples/http/bootstrap.ts

# Koa
HTTP_PROVIDER=koa ts-node examples/http/bootstrap.ts

# Hapi
HTTP_PROVIDER=hapi ts-node examples/http/bootstrap.ts

# Nest (stubbed MVP)
HTTP_PROVIDER=nest ts-node examples/http/bootstrap.ts

# Next.js (custom server)
HTTP_PROVIDER=next ts-node examples/http/bootstrap.ts

# Native Node HTTP
HTTP_PROVIDER=node ts-node examples/http/bootstrap.ts
*/