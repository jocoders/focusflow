import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { tasks } from '@/db/schema'

export const GET = async (req: NextRequest) => {
  try {
    const tasks = await db.query.tasks.findMany()
    return NextResponse.json({ data: { tasks } })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'nah' }, { status: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const [newTask] = await db.insert(tasks).values(await req.json()).returning()
    return NextResponse.json({ data: newTask })

  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'nah' }, { status: 500 })
  }
}
