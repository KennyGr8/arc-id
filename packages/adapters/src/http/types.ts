// packages/adapters/src/http/types.ts

export interface HttpRequest {
  params: Record<string, any>
  query: Record<string, any>
  body?: any
  headers: Record<string, string | string[]>
  cookies?: Record<string, string>
}

export interface HttpResponse {
  status: (code: number) => HttpResponse
  json: (data: any) => void
  send: (data: any) => void
  setHeader?: (key: string, value: string) => HttpResponse
}

export type HttpHandler = (
  req: HttpRequest,
  res: HttpResponse
) => Promise<void> | void

export type HttpMiddleware = (
  req: HttpRequest,
  res: HttpResponse,
  next: () => void
) => Promise<void> | void

export interface HttpAdapter {
  init(): Promise<void>
  start(port: number): Promise<void>
  stop(): Promise<void>

  registerRoute(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    path: string,
    handler: HttpHandler
  ): void

  use(middleware: HttpMiddleware): void
}
