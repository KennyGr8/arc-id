import Redis from 'ioredis';
import { CacheAdapter } from '../index';
import { config } from '@arc-id/common'

export class RedisGeneralAdapter implements CacheAdapter {
  private client: Redis;
  private domain = 'general';

  constructor() {
    this.client = new Redis(config.CACHE.URL);
  }

  private key(k: string) {
    return `${this.domain}:${k}`;
  }

  async get<T>(key: string): Promise<T | null> {
    const val = await this.client.get(this.key(key));
    return val ? JSON.parse(val) : null;
  }

  async set<T>(key: string, value: T, ttl?: number) {
    const str = JSON.stringify(value);
    ttl
      ? await this.client.set(this.key(key), str, 'EX', ttl)
      : await this.client.set(this.key(key), str);
  }

  async del(key: string) {
    await this.client.del(this.key(key));
  }
}
