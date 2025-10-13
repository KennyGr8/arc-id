// packages/adapters/src/http/ts-js/express.adapter.ts
import express, { Request, Response } from 'express'
import { HttpAdapter, HttpHandler, HttpMiddleware, HttpResponse } from '../types'

export class ExpressHttpAdapter implements HttpAdapter {
  private app = express()
  private server?: ReturnType<typeof this.app.listen>

  async init() {
    this.app.use(express.json())
  }

  async start(port: number) {
    this.server = this.app.listen(port, () => {
      console.log(`[ArcID][Express] running on port ${port}`)
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
    const routeMethods: Record<'get' | 'post' | 'put' | 'delete' | 'patch', Function> = {
      get: this.app.get.bind(this.app),
      post: this.app.post.bind(this.app),
      put: this.app.put.bind(this.app),
      delete: this.app.delete.bind(this.app),
      patch: this.app.patch.bind(this.app),
    }

    const fn = routeMethods[method.toLowerCase() as keyof typeof routeMethods]

    fn(path, async (req: Request, res: Response) => {
      const response: HttpResponse = {
        status: (code: number) => {
          res.status(code)
          return response
        },
        json: (data: any) => res.json(data),
        send: (data: any) => res.send(data),
        setHeader: (key: string, value: string) => {
          res.setHeader(key, value)
          return response
        },
      }

      await handler(
        {
          params: req.params,
          query: req.query,
          body: req.body,
          headers: req.headers as Record<string, string | string[]>,
          cookies: req.cookies,
        },
        response
      )
    })
  }

  use(middleware: HttpMiddleware) {
    this.app.use(async (req: Request, res: Response, next) => {
      const response: HttpResponse = {
        status: (code: number) => {
          res.status(code)
          return response
        },
        json: (data: any) => res.json(data),
        send: (data: any) => res.send(data),
        setHeader: (key: string, value: string) => {
          res.setHeader(key, value)
          return response
        },
      }

      await middleware(
        {
          params: req.params,
          query: req.query,
          body: req.body,
          headers: req.headers as Record<string, string | string[]>,
          cookies: req.cookies,
        },
        response,
        next
      )
    })
  }
}
