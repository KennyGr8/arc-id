// packages/adapters/src/http/ts-js/hapi.adapter.ts
import Hapi from '@hapi/hapi'
import { HttpAdapter, HttpHandler, HttpMiddleware } from '../types'

export class HapiHttpAdapter implements HttpAdapter {
  private server: Hapi.Server

  constructor() {
    this.server = Hapi.server({ host: '0.0.0.0', port: 0 })
  }

  async init() {
    // hapi plugins can be registered here
  }

  async start(port: number) {
    this.server.settings.port = port
    await this.server.start()
    console.log(`[ArcID][Hapi] running on port ${port}`)
  }

  async stop() {
    await this.server.stop()
  }

  registerRoute(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    path: string,
    handler: HttpHandler
  ) {
    this.server.route({
      method,
      path,
      handler: async (req, h) => {
        let response: any
        await handler(
          {
            params: req.params as Record<string, any>,
            query: req.query as Record<string, any>,
            body: req.payload,
            headers: req.headers as Record<string, string | string[]>,
            cookies: req.state,
          },
          {
            status: (code: number) => {
              h.response().code(code)
              return this as any
            },
            json: (data: any) => {
              response = h.response(data).type('application/json')
            },
            send: (data: any) => {
              response = h.response(data)
            },
            setHeader: (key: string, value: string) => {
              h.response().header(key, value)
              return this as any
            },
          }
        )
        return response
      },
    })
  }

  use(middleware: HttpMiddleware) {
    this.server.ext('onRequest', async (req, h) => {
      let proceed = false
      await middleware(
        {
          params: req.params as Record<string, any>,
          query: req.query as Record<string, any>,
          body: req.payload,
          headers: req.headers as Record<string, string | string[]>,
          cookies: req.state,
        },
        {
          status: (code: number) => {
            h.response().code(code)
            return this as any
          },
          json: (data: any) => h.response(data).type('application/json'),
          send: (data: any) => h.response(data),
          setHeader: (key: string, value: string) => {
            h.response().header(key, value)
            return this as any
          },
        },
        () => {
          proceed = true
        }
      )
      return proceed ? h.continue : h.abandon
    })
  }
}
