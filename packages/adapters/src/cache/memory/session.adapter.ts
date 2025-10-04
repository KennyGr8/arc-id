// packages/adapters/src/cache/memory/session.adapter.ts
import { BaseMemoryAdapter } from './base-memory.adapter'

export class MemorySessionAdapter extends BaseMemoryAdapter {
  constructor() {
    super('session', 30) // run cleanup every 30s
  }
}
