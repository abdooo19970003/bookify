import redis from "@/database/redis"
import { Ratelimit, RatelimitConfig } from "@upstash/ratelimit"


const ratelimit_config = {
  redis,
  limiter: Ratelimit.fixedWindow(5, "1 m"),
  analytics: true,
  prefix: "@upstash/ratelimit"

} satisfies RatelimitConfig


const ratelimit = new Ratelimit(ratelimit_config)
export default ratelimit