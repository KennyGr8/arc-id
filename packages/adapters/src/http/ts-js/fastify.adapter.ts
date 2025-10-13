// packages/adapters/src/http/ts-js/fastify.adapter.ts
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import cookie from '@fastify/cookie'
import {
  HttpAdapter,
  HttpHandler,
  HttpMiddleware,
  HttpResponse,
} from '../types'

export class FastifyHttpAdapter implements HttpAdapter {
  private app: FastifyInstance
  private server?: any

  constructor() {
    this.app = Fastify()
  }

  async init() {
    // Register cookie plugin
    await this.app.register(cookie)
    // Register JSON parser (Fastify handles JSON by default)
  }

  async start(port: number) {
    this.server = await this.app.listen({ port, host: '0.0.0.0' })
    console.log(`[ArcID][Fastify] running on port ${port}`)
  }

  async stop() {
    if (this.server) {
      await this.app.close()
    }
  }

  private createResponse(reply: FastifyReply): HttpResponse {
    const response: HttpResponse = {
      status: (code: number) => {
        reply.status(code)
        return response
      },
      json: (data: any) => reply.send(data),
      send: (data: any) => reply.send(data),
      setHeader: (key: string, value: string) => {
        reply.header(key, value)
        return response
      },
    }
    return response
  }

  registerRoute(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    path: string,
    handler: HttpHandler
  ) {
    this.app.route({
      method,
      url: path,
      handler: async (req: FastifyRequest, reply: FastifyReply) => {
        const response = this.createResponse(reply)

        await handler(
          {
            params: req.params as Record<string, any>,
            query: req.query as Record<string, any>,
            body: req.body,
            headers: req.headers as Record<string, string | string[]>,
            cookies: (req.cookies || {}) as Record<string, string>,
          },
          response
        )
      },
    })
  }

  use(middleware: HttpMiddleware) {
    this.app.addHook(
      'preHandler',
      async (req: FastifyRequest, reply: FastifyReply) => {
        const response = this.createResponse(reply)

        await middleware(
          {
            params: req.params as Record<string, any>,
            query: req.query as Record<string, any>,
            body: req.body,
            headers: req.headers as Record<string, string | string[]>,
            cookies: (req.cookies || {}) as Record<string, string>,
          },
          response,
          () => Promise.resolve()
        )
      }
    )
  }
}
