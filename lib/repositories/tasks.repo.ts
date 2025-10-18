// data access layer

import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { tasks  } from '@/db/schema'
import { mockDelay } from '../utils'
import { unstable_cacheTag as cacheTag, unstable_cacheLife as cacheLife } from 'next/cache'


export async function getTasks() {
  'use cache'
  cacheTag('issues')

  try {
    await mockDelay(1000)
    const result = await db.query.tasks.findMany({
      with: {
        user: true,
      },
      orderBy: (issues, { desc }) => [desc(issues.createdAt)],
    })

    //cacheLife('days')

    return result
  } catch (error) {
    console.error('Error fetching issues:', error)
    throw new Error('Failed to fetch issues')
  }
}

export const getTask = async (id: number) => {
  try {
    await mockDelay(1000)
    const result = await db.query.tasks.findFirst({
      where: eq(tasks.id, id),
      with: {
        user: true,
      }
    })

    return result
  } catch (err) {
    console.error('Error getting issue:', err)
    return null
  }
}
