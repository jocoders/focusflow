import { cookies } from 'next/headers'
import * as jose from 'jose'
import { cache } from 'react'
import { nanoid } from 'nanoid'
import { env } from '@/lib/env'
import crypto from 'crypto'

import {
  createSessionRow,
  getValidSessionByTokenHash,
  revokeSessionById,
  revokeAllUserSessions,
} from '@/lib/repositories/sessions.repo'

interface JWTPayload { userId: string; [k: string]: unknown }

// Secret key for JWT signing (in a real app, use an environment variable)
const JWT_SECRET = new TextEncoder().encode(
  env.JWT_SECRET || 'your-secret-key-min-32-chars-long!!!'
)

// JWT expiration time
const JWT_EXPIRATION = '7d' // 7 days

// Token refresh threshold (refresh if less than this time left)
const REFRESH_THRESHOLD = 24 * 60 * 60 // 24 hours in seconds

const SECRET = new TextEncoder().encode(env.JWT_SECRET || 'your-secret-key-min-32-chars-long!!!')
const EXPIRES_DAYS = 7
const sha256 = (s: string) => crypto.createHash('sha256').update(s).digest('hex')


// Generate a JWT token
export async function generateJWT(payload: JWTPayload) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET)
}

// Verify a JWT token
export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET)
    return payload as JWTPayload
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

// Check if token needs refresh
export async function shouldRefreshToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET, {
      clockTolerance: 15, // 15 seconds tolerance for clock skew
    })

    // Get expiration time
    const exp = payload.exp as number
    const now = Math.floor(Date.now() / 1000)

    // If token expires within the threshold, refresh it
    return exp - now < REFRESH_THRESHOLD
  } catch {
    // If verification fails, token is invalid or expired
    return false
  }
}

// Create a session using JWT
export async function createSession(userId: string, ctx?: { ua?: string; ip?: string }) {
  const id = nanoid()
  const token = await new jose.SignJWT({ sid: id, userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${EXPIRES_DAYS}d`)
    .sign(SECRET)

  await createSessionRow({
    id,
    userId,
    tokenHash: sha256(token),
    userAgent: ctx?.ua,
    ip: ctx?.ip,
    expiresAt: new Date(Date.now() + EXPIRES_DAYS * 24 * 60 * 60 * 1000),
  })

  const jar = await cookies()
  jar.set({
    name: 'auth_token',
    value: token,
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    maxAge: EXPIRES_DAYS * 24 * 60 * 60,
    path: '/',
    sameSite: 'lax',
  })
  return true
}

// Get current session from JWT
export const getSession = cache(async () => {
  const jar = await cookies()
  const token = jar.get('auth_token')?.value
  if (!token) return null

  try {
    const { payload } = await jose.jwtVerify(token, SECRET)
    const row = await getValidSessionByTokenHash(sha256(token))
    if (!row || row.revoked) return null
    return { userId: (payload as any).userId as string, sessionId: row.id }
  } catch {
    return null
  }
})

// Delete session by clearing the JWT cookie
export async function deleteSession() {
  const jar = await cookies()
  const token = jar.get('auth_token')?.value
  if (token) {
    try {
      const { payload } = await jose.jwtVerify(token, SECRET)
      await revokeSessionById((payload as any).sid as string)
    } catch { /* ignore */ }
  }
  jar.delete('auth_token')
}


export async function logoutAllDevices(userId: string) {
  await revokeAllUserSessions(userId)
  const jar = await cookies()
  jar.delete('auth_token')
}
