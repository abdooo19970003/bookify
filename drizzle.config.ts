import config from "./lib/config";
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./database/schema.ts",
  out: "./database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: config.databaseUrl,
  },
  casing: "snake_case",
  strict: true,

})