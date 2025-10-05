// packages/adapters/src/cache/memory/base-memory.adapter.ts
import { CacheAdapter } from '../index'

type CacheEntry<T> = {
  value: T
  expiresAt?: number // unix ms
}

export abstract class BaseMemoryAdapter implements CacheAdapter {
  protected store: Map<string, CacheEntry<any>> = new Map()
  private cleanupInterval: ReturnType<typeof setInterval>

  constructor(private domain: string, cleanupSeconds: number = 30) {
    // start cleanup every X seconds
    this.cleanupInterval = setInterval(
      () => this.cleanup(),
      cleanupSeconds * 1000
    )
  }

  protected key(k: string) {
    return `${this.domain}:${k}`
  }

  async get<T>(key: string): Promise<T | null> {
    const entry = this.store.get(this.key(key))
    if (!entry) return null
    if (entry.expiresAt && entry.expiresAt < Date.now()) {
      this.store.delete(this.key(key)) // purge expired
      return null
    }
    return entry.value as T
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const expiresAt = ttl ? Date.now() + ttl * 1000 : undefined
    this.store.set(this.key(key), { value, expiresAt })
  }

  async del(key: string): Promise<void> {
    this.store.delete(this.key(key))
  }

  async flush(): Promise<void> {
    this.store.clear()
  }

  async incr(key: string): Promise<number> {
    const existing = (await this.get<number>(key)) || 0
    const newVal = existing + 1
    await this.set(key, newVal)
    return newVal
  }

  async expire(key: string, ttl: number): Promise<void> {
    const entry = this.store.get(this.key(key))
    if (entry) {
      entry.expiresAt = Date.now() + ttl * 1000
      this.store.set(this.key(key), entry)
    }
  }

  private cleanup() {
    const now = Date.now()
    for (const [k, entry] of this.store.entries()) {
      if (entry.expiresAt && entry.expiresAt < now) {
        this.store.delete(k)
      }
    }
  }

  stopCleanup() {
    clearInterval(this.cleanupInterval)
  }
}
