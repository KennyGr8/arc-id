import Redis from 'ioredis';
import { CacheAdapter } from '../index';
import { config } from '@arc-id/common'

export class RedisJobsAdapter implements CacheAdapter {
  private client: Redis;
  private domain = 'jobs';

  constructor() {
    this.client = new Redis(config.CACHE.URL);
  }

  private key(k: string) {
    return `${this.domain}:${k}`;
  }

  async set<T>(key: string, value: T, ttl?: number) {
    const data = JSON.stringify(value);
    if (ttl) {
      await this.client.set(this.key(key), data, 'EX', ttl);
    } else {
      await this.client.set(this.key(key), data);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.client.get(this.key(key));
    return data ? JSON.parse(data) : null;
  }

  async del(key: string) {
    await this.client.del(this.key(key));
  }

  async flush() {
    await this.client.flushdb();
  }
}
