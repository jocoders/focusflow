import { getTask } from '@/lib/repositories/tasks.repo'
import { formatRelativeTime } from '@/lib/utils'
import { Priority, Status } from '@/lib/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Badge from '@/app/components/ui/Badge'
import Button from '@/app/components/ui/Button'
import { ArrowLeftIcon, Edit2Icon } from 'lucide-react'
import DeleteTaskButton from '@/app/components/DeleteTaskButton'

export default async function TaskPage({ params, }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const task = await getTask(parseInt(id))

  if (!task) {
    notFound()
  }

  const { title, description, status, priority, createdAt, updatedAt, user } =
    task

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'backlog':
        return 'Backlog'
      case 'todo':
        return 'Todo'
      case 'in_progress':
        return 'In Progress'
      case 'done':
        return 'Done'
      default:
        return status
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'Low'
      case 'medium':
        return 'Medium'
      case 'high':
        return 'High'
      default:
        return priority
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-canvas-text hover:text-canvas-text-contrast mb-4"
        >
          <ArrowLeftIcon size={16} className="mr-1" />
          Back to Tasks
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          <div className="flex items-center space-x-2">
            <Link href={`/tasks/${id}/edit`}>
              <Button variant="outline" size="sm">
                <span className="flex items-center">
                  <Edit2Icon size={16} className="mr-1" />
                  Edit
                </span>
              </Button>
            </Link>
            <DeleteTaskButton id={parseInt(id)} />
          </div>
        </div>
      </div>

      <div className="bg-canvas-bg border border-canvas-border rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-wrap gap-3 mb-6">
          <Badge status={status as Status}>{getStatusLabel(status)}</Badge>
          <Badge priority={priority as Priority}>
            {getPriorityLabel(priority)}
          </Badge>
          <div className="text-sm text-canvas-text">
            Created {formatRelativeTime(new Date(createdAt))}
          </div>
          {updatedAt !== createdAt && (
            <div className="text-sm text-canvas-text">
              Updated {formatRelativeTime(new Date(updatedAt))}
            </div>
          )}
        </div>

        {description ? (
          <div className="prose max-w-none">
            <p className="whitespace-pre-line">{description}</p>
          </div>
        ) : (
          <p className="text-canvas-text italic">No description provided.</p>
        )}
      </div>

      <div className="bg-canvas-bg border border-canvas-border rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-2">Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-canvas-text mb-1">
              Assigned to
            </p>
            <p>{user.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-canvas-text mb-1">Status</p>
            <Badge status={status as Status}>{getStatusLabel(status)}</Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-canvas-text mb-1">Priority</p>
            <Badge priority={priority as Priority}>
              {getPriorityLabel(priority)}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-canvas-text mb-1">Created</p>
            <p>{formatRelativeTime(new Date(createdAt))}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
