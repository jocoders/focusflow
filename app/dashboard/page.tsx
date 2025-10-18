import { getTasks } from '@/lib/repositories/tasks.repo'
import Link from 'next/link'
import Button from '../components/ui/Button'
import { PlusIcon } from 'lucide-react'
import Badge from '../components/ui/Badge'
import { formatRelativeTime } from '@/lib/utils'
import { Priority, Status } from '@/lib/types'
import { TASK_STATUS, TASK_PRIORITY } from '@/db/schema'

export default async function DashboardPage() {
  const tasks = await getTasks()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <Link href="/app/tasks/new">
          <Button>
            <span className="flex items-center">
              <PlusIcon size={18} className="mr-2" />
              New Task
            </span>
          </Button>
        </Link>
      </div>

      {tasks?.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-dark-border-default bg-white dark:bg-dark-high shadow-sm">
          {/* Header row */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-dark-elevated border-b border-gray-200 dark:border-dark-border-default">
            <div className="col-span-5">Title</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Priority</div>
            <div className="col-span-3">Created</div>
          </div>

          {/* Task rows */}
          <div className="divide-y divide-gray-200 dark:divide-dark-border-default">
            {tasks.map((issue) => (
              <Link
                key={issue.id}
                href={`/tasks/${issue.id}`}
                className="block hover:bg-gray-50 dark:hover:bg-dark-elevated transition-colors"
              >
                <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                  <div className="col-span-5 font-medium truncate">
                    {issue.title}
                  </div>
                  <div className="col-span-2">
                    <Badge status={issue.status as Status}>
                      {TASK_STATUS[issue.status as Status].label}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <Badge priority={issue.priority as Priority}>
                      {TASK_PRIORITY[issue.priority as Priority].label}
                    </Badge>
                  </div>
                  <div className="col-span-3 text-sm text-gray-500 dark:text-gray-400">
                    {formatRelativeTime(new Date(issue.createdAt))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center border border-gray-200 dark:border-dark-border-default rounded-lg bg-white dark:bg-dark-high p-8">
          <h3 className="text-lg font-medium mb-2">No tasks found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Get started by creating your first task.
          </p>
          <Link href="/app/tasks/new">
            <Button>
              <span className="flex items-center">
                <PlusIcon size={18} className="mr-2" />
                Create Task
              </span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
