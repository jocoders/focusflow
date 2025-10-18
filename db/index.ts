// import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http'
// import { drizzle as drizzlePostgres } from 'drizzle-orm/node-postgres'
// import { neon } from '@neondatabase/serverless'
//
// import * as schema from './schema'
//
// export const db = process.env.VERCEL
//   ? drizzleNeon({
//       client: neon(process.env.DATABASE_URL!),
//       schema,
//       casing: 'snake_case',
//     })
//   : drizzlePostgres(process.env.DATABASE_URL!, { schema, casing: 'snake_case' })

import { neon } from '@neondatabase/serverless'
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http'
import * as schema from './schema'

const url = process.env.DATABASE_URL
if (!url) throw new Error('DATABASE_URL is not set')

const sql = neon(url)

export const db = drizzleNeon(sql, {
  schema,
  casing: 'snake_case',
})
