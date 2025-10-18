import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import {eq} from 'drizzle-orm'
import {tasks} from '@/db/schema'

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await params
    const task = await db.query.tasks.findFirst({
      where: eq(tasks.id, parseInt(id))
    })

    return NextResponse.json({ data: task})
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'nah' }, { status: 500 })
  }
}
