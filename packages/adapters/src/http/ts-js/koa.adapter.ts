// packages/adapters/src/http/ts-js/koa.adapter.ts
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import { HttpAdapter, HttpHandler, HttpMiddleware } from '../types'

export class KoaHttpAdapter implements HttpAdapter {
  private app: Koa
  private router: Router
  private server?: any

  constructor() {
    this.app = new Koa()
    this.router = new Router()
  }

  async init() {
    this.app.use(bodyParser())
    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
  }

  async start(port: number) {
    this.server = this.app.listen(port, () => {
      console.log(`[ArcID][Koa] running on port ${port}`)
    })
  }

  async stop() {
    if (this.server) {
      this.server.close()
    }
  }

  registerRoute(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    path: string,
    handler: HttpHandler
  ) {
    ;(this.router as any)[method.toLowerCase()](path, async (ctx: any) => {
      await handler(
        {
          params: ctx.params,
          query: ctx.query,
          body: ctx.request.body,
          headers: ctx.headers,
          cookies: ctx.cookies,
        },
        {
          status: (code: number) => {
            ctx.status = code
            return this as any
          },
          json: (data: any) => (ctx.body = data),
          send: (data: any) => (ctx.body = data),
          setHeader: (key: string, value: string) => {
            ctx.set(key, value)
            return this as any
          },
        }
      )
    })
  }

  use(middleware: HttpMiddleware) {
    this.app.use(async (ctx, next) => {
      await middleware(
        {
          params: ctx.params,
          query: ctx.query,
          body: ctx.request.body,
          headers: ctx.headers,
          cookies: ctx.cookies,
        },
        {
          status: (code: number) => {
            ctx.status = code
            return this as any
          },
          json: (data: any) => (ctx.body = data),
          send: (data: any) => (ctx.body = data),
          setHeader: (key: string, value: string) => {
            ctx.set(key, value)
            return this as any
          },
        },
        next
      )
    })
  }
}
