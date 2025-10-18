// data access layer

import { db } from '@/lib/db'
import { sessions } from '@/db/schema'
import { and, eq, lt } from 'drizzle-orm'

export async function createSessionRow(d: {
  id: string; userId: string; tokenHash: string;
  userAgent?: string; ip?: string; expiresAt: Date
}) {
  await db.insert(sessions).values(d)
  return d.id
}

export async function getValidSessionByTokenHash(tokenHash: string) {
  const [row] = await db.select().from(sessions).where(
    and(eq(sessions.tokenHash, tokenHash), eq(sessions.revoked, false))
  )
  return row ?? null
}

export async function revokeSessionById(id: string) {
  await db.update(sessions).set({ revoked: true }).where(eq(sessions.id, id))
}

export async function revokeAllUserSessions(userId: string) {
  await db.update(sessions).set({ revoked: true }).where(eq(sessions.userId, userId))
}

export async function deleteExpiredSessions(now = new Date()) {
  await db.delete(sessions).where(lt(sessions.expiresAt, now))
}
