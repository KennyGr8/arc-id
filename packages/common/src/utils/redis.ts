import Redis from "ioredis";
import { config } from "../configs";

export let redis: Redis;

export async function connectRedis() {
  redis = new Redis(config.CACHE.URL);

  redis.on("connect", () => console.log("🧠 Redis connected"));
  redis.on("error", (err) => console.error("❌ Redis error:", err));
}
