
// packages/adapters/src/cache/memory/rate-limit.adapter.ts
import { BaseMemoryAdapter } from './base-memory.adapter'

export class MemoryRateLimitAdapter extends BaseMemoryAdapter {
  constructor() {
    super('rate-limit', 30)
  }
}
