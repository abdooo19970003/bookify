import config from "@/lib/config"
import { Redis } from "@upstash/redis"

// config
const redis = new Redis({
  url: config.upstash.databaseUrl!,
  token: config.upstash.token!,
})

// export 
export default redis