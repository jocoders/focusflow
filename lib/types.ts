import { Task } from '@/db/schema'

export type Status = 'backlog' | 'todo' | 'in_progress' | 'done'
export type Priority = 'low' | 'medium' | 'high'

export type TaskWithUser = Task & {
  user: {
    id: string
    email: string
  }
}
