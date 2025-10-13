// packages/adapters/src/http/ts-js/node.adapter.ts
import { createServer, IncomingMessage, ServerResponse } from 'http'
import { parse } from 'url'
import { HttpAdapter, HttpHandler, HttpMiddleware } from '../types'

export class NodeHttpAdapter implements HttpAdapter {
  private server?: any
  private routes: { method: string; path: string; handler: HttpHandler }[] = []
  private middlewares: HttpMiddleware[] = []

  async init() {}

  async start(port: number) {
    this.server = createServer(
      async (req: IncomingMessage, res: ServerResponse) => {
        const parsedUrl = parse(req.url || '', true)
        const route = this.routes.find(
          (r) => r.path === parsedUrl.pathname && r.method === req.method
        )

        const request = {
          params: {}, // would need regex parsing
          query: parsedUrl.query,
          body: {}, // would need to parse POST body
          headers: req.headers as Record<string, string | string[]>,
          cookies: {}, // would need cookie-parser
        }

        const response = {
          status: (code: number) => {
            res.statusCode = code
            return this as any
          },
          json: (data: any) => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(data))
          },
          send: (data: any) => res.end(data),
          setHeader: (key: string, value: string) => {
            res.setHeader(key, value)
            return this as any
          },
        }

        // middleware execution
        for (const mw of this.middlewares) {
          let nextCalled = false
          await mw(request, response, () => {
            nextCalled = true
          })
          if (!nextCalled) return
        }

        if (route) {
          await route.handler(request, response)
        } else {
          res.statusCode = 404
          res.end('Not Found')
        }
      }
    )

    this.server.listen(port, () => {
      console.log(`[ArcID][Node HTTP] running on port ${port}`)
    })
  }

  async stop() {
    if (this.server) this.server.close()
  }

  registerRoute(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    path: string,
    handler: HttpHandler
  ) {
    this.routes.push({ method, path, handler })
  }

  use(middleware: HttpMiddleware) {
    this.middlewares.push(middleware)
  }
}
