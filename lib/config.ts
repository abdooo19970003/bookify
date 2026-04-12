const config = {
  imagekit: {
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
  },
  api: {
    endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || "",
    prodEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT || "",
  },
  databaseUrl: process.env.DATABASE_URL || "",
  authSecret: process.env.BETTER_AUTH_SECRET || "",
  upstash: {
    databaseUrl: process.env.UPSTASH_REDIS_REST_URL || "",
    token: process.env.UPSTASH_REDIS_REST_TOKEN || ""
  }
};

export default config;
