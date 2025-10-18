// lib/env.ts
import { z } from 'zod'

export const env = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 chars"),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
}).parse(process.env)
