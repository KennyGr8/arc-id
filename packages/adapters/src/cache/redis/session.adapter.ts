import Redis from 'ioredis'
import { CacheAdapter } from '../types'
import { config } from '@arc-id/common'

export class RedisSessionAdapter implements CacheAdapter {
  private client: Redis
  private domain = 'session'

  constructor() {
    this.client = new Redis(config.CACHE.URL)
  }

  private key(k: string) {
    return `${this.domain}:${k}`
  }

  async get<T>(key: string): Promise<T | null> {
    const val = await this.client.get(this.key(key))
    return val ? JSON.parse(val) as T : null
  }

  async set<T>(key: string, value: T, ttl?: number) {
    const str = JSON.stringify(value)
    ttl
      ? await this.client.set(this.key(key), str, 'EX', ttl)
      : await this.client.set(this.key(key), str)
  }

  async del(key: string) {
    await this.client.del(this.key(key))
  }
}
