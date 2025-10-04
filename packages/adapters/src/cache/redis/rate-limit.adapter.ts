import Redis from 'ioredis';
import { CacheAdapter } from '../types';
import { config } from '@arc-id/common'

export class RedisRateLimitAdapter implements CacheAdapter {
  private client: Redis;
  private domain = 'rate-limit';

  constructor() {
    this.client = new Redis(config.CACHE.URL);
  }

  private key(k: string) {
    return `${this.domain}:${k}`;
  }

  async incr(key: string): Promise<number> {
    return this.client.incr(this.key(key));
  }

  async expire(key: string, ttl: number): Promise<void> {
    await this.client.expire(this.key(key), ttl);
  }

  async get<T>(key: string): Promise<T | null> {
    const val = await this.client.get(this.key(key));
    return val ? (JSON.parse(val) as T) : null;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const str = JSON.stringify(value);
    ttl
      ? await this.client.set(this.key(key), str, 'EX', ttl)
      : await this.client.set(this.key(key), str);
  }

  async del(key: string) {
    await this.client.del(this.key(key));
  }
}
