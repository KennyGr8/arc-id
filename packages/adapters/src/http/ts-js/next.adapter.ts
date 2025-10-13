// packages/adapters/src/http/ts-js/next.adapter.ts
import next from 'next'
import { createServer } from 'http'
import { parse } from 'url'
import { HttpAdapter, HttpHandler, HttpMiddleware } from '../types'

export class NextHttpAdapter implements HttpAdapter {
  private app: any
  private handle: any
  private server?: any
  private routes: { method: string; path: string; handler: HttpHandler }[] = []

  constructor(dev = true, dir = '.') {
    this.app = next({ dev, dir })
    this.handle = this.app.getRequestHandler()
  }

  async init() {
    await this.app.prepare()
  }

  async start(port: number) {
    this.server = createServer((req, res) => {
      const parsedUrl = parse(req.url!, true)
      const route = this.routes.find(
        (r) => r.path === parsedUrl.pathname && r.method === req.method
      )

      if (route) {
        route.handler(
          {
            params: {}, // Next doesn't natively expose dynamic params here
            query: parsedUrl.query,
            body: {}, // would need body-parser
            headers: req.headers as Record<string, string | string[]>,
            cookies: {}, // cookie-parser
          },
          {
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
        )
      } else {
        this.handle(req, res, parsedUrl)
      }
    })

    this.server.listen(port, () => {
      console.log(`[ArcID][Next.js] running on port ${port}`)
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
    // Next doesn't have middleware hooks at this level pre-v13.
    // Could be stubbed or integrated with custom server middleware.
  }
}
