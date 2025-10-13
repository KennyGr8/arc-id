import { Hono, Context } from 'hono'
import { serve, Server } from '@hono/node-server'
import { HttpAdapter, HttpHandler, HttpMiddleware, HttpResponse } from '../types'
import type { StatusCode } from 'hono/utils/http-status'

export class HonoHttpAdapter implements HttpAdapter {
  private app: Hono
  private server?: Server

  constructor() {
    this.app = new Hono()
  }

  async init() {
    // Optional: setup plugins or middleware
  }

  async start(port: number) {
    this.server = serve({
      fetch: this.app.fetch,
      port,
    })
    console.log(`[ArcID][Hono] running on port ${port}`)
  }

  async stop() {
    this.server?.close()
  }

  private createResponse(c: Context): HttpResponse {
    const response: HttpResponse = {
      status: (code: number) => {
        c.status(code as StatusCode)
        return response
      },
      json: (data: unknown) => c.json(data),
      send: (data: unknown) =>
        c.text(typeof data === 'string' ? data : JSON.stringify(data)),
      setHeader: (key: string, value: string) => {
        c.header(key, value)
        return response
      },
    }
    return response
  }

  private async createRequest(c: Context) {
    let body: Record<string, unknown> = {}
    try {
      body = await c.req.json()
    } catch {
      body = {}
    }

    const query: Record<string, string> = {}
    const queryParams = c.req.query()
    for (const key in queryParams) {
      query[key] = queryParams[key]
    }

    const cookies: Record<string, string> = {}
    const cookieHeader = c.req.header('cookie')
    if (cookieHeader) {
      cookieHeader.split(';').forEach((cookieStr) => {
        const [key, val] = cookieStr.split('=')
        if (key && val) cookies[key.trim()] = val.trim()
      })
    }

    const headers: Record<string, string> = {}
    for (const [key, value] of c.req.raw.headers.entries()) {
      headers[key] = value
    }

    const params: Record<string, string> = {} // Hono doesn't expose paramNames directly

    return { params, query, body, headers, cookies }
  }

  registerRoute(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    path: string,
    handler: HttpHandler
  ) {
    const methodMap = {
      GET: this.app.get,
      POST: this.app.post,
      PUT: this.app.put,
      DELETE: this.app.delete,
      PATCH: this.app.patch,
    }

    methodMap[method].call(this.app, path, async (c: Context) => {
      const req = await this.createRequest(c)
      const res = this.createResponse(c)
      await handler(req, res)
    })
  }

  use(middleware: HttpMiddleware) {
    this.app.use(async (c: Context, next) => {
      const req = await this.createRequest(c)
      const res = this.createResponse(c)
      await middleware(req, res, next)
    })
  }
}
