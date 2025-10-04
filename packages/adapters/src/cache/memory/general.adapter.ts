// packages/adapters/src/cache/memory/general.adapter.ts
import { BaseMemoryAdapter } from './base-memory.adapter'

export class MemoryGeneralAdapter extends BaseMemoryAdapter {
  constructor() {
    super('general', 30)
  }
}