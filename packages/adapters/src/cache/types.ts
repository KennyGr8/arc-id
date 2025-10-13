// packages/adapters/src/cache/types.ts
export interface CacheAdapter {
  get<T = any>(key: string): Promise<T | null>
  set<T = any>(key: string, value: T, ttl?: number): Promise<void>
  del(key: string): Promise<void>
  incr?(key: string): Promise<number>
  expire?(key: string, ttl: number): Promise<void>
  flush?(): Promise<void>
}
