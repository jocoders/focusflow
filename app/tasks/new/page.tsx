import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import NewTask from '@/app/components/NewTask'

export default async function NewTaskPage() {
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center text-sm text-canvas-text hover:text-canvas-text-contrast mb-6"
      >
        <ArrowLeftIcon size={16} className="mr-1" />
        Back to Dashboard
      </Link>

      <h1 className="text-2xl font-bold mb-6">Create New Task</h1>

      <div className="bg-canvas-bg border border-canvas-border rounded-lg shadow-sm p-6">
        <Suspense fallback={<div>Loading...</div>}>
          <NewTask />
        </Suspense>
      </div>
    </div>
  )
}
