// packages/adapters/src/http/ts-js/nest.adapter.ts
import { NestFactory } from '@nestjs/core'
import { Module, Controller, Get } from '@nestjs/common'
import { HttpAdapter, HttpHandler, HttpMiddleware } from '../types'

@Module({})
class AppModule {}

export class NestHttpAdapter implements HttpAdapter {
  private app: any
  private routes: { method: string; path: string; handler: HttpHandler }[] = []
  private middlewares: HttpMiddleware[] = []

  async init() {
    this.app = await NestFactory.create(AppModule)
  }

  async start(port: number) {
    await this.app.listen(port)
    console.log(`[ArcID][NestJS] running on port ${port}`)
  }

  async stop() {
    await this.app.close()
  }

  registerRoute(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    path: string,
    handler: HttpHandler
  ) {
    // For a real impl, we’d need dynamic controllers
    // For now, simulate by storing routes
    this.routes.push({ method, path, handler })
  }

  use(middleware: HttpMiddleware) {
    this.middlewares.push(middleware)
  }
}
// Note: A full NestJS adapter would require dynamic module/controller creation,