// packages/adapters/src/cache/memory/jobs.adapter.ts
import { BaseMemoryAdapter } from './base-memory.adapter'

export class MemoryJobsAdapter extends BaseMemoryAdapter {
  constructor() {
    super('jobs', 30)
  }
}
