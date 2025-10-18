import { neon } from '@neondatabase/serverless'
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http'
import * as schema from '@/db/schema'
import {env} from "./env"

const url = env.DATABASE_URL
if (!url) throw new Error('DATABASE_URL is not set')

const sql = neon(url)

export const db = drizzleNeon(sql, {
  schema,
  casing: 'snake_case',
})
