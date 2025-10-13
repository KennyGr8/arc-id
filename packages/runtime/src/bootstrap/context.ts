// packages/runtime/src/bootstrap/context.ts
import { runtimeEvents } from './events'
import type { ProviderMap } from './container'

export interface RuntimeContext {
  providers: ProviderMap
  events: typeof runtimeEvents
}
