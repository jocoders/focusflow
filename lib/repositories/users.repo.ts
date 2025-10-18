// data access layer

import { cache } from 'react'
import { db } from '@/lib/db'
import { getSession } from '@/lib/services/session.service'
import { eq } from 'drizzle-orm'
import { users } from '@/db/schema'
import { mockDelay } from '../utils'

export const getCurrentUser = cache(async () => {
  const session = await getSession()
  if (!session) return null

  try {
    await mockDelay(1000)
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId))

    return result[0] || null
  } catch (error) {
    console.error('Error getting user by ID:', error)
    return null
  }
})

export const getUserByEmail = async (email: string) => {
  try {
    const result = await db.select().from(users).where(eq(users.email, email))
    return result[0] || null
  } catch (error) {
    console.error('Error getting user by email:', error)
    return null
  }
}

