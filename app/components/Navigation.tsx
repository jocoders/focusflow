import Link from 'next/link'
import { HomeIcon, PlusIcon, LogInIcon } from 'lucide-react'
import UserEmail from './UserEmail'
import { Suspense } from 'react'
import NavLink from './NavLink'

export default function Navigation() {
  return (
    <aside className="fixed inset-y-0 left-0 w-16 md:w-64 bg-canvas-bg-subtle border-r border-canvas-border flex flex-col py-4 px-2 md:px-4">
      <div className="flex items-center justify-center md:justify-start mb-8 px-2">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-canvas-text-contrast"
        >
          <span className="hidden md:inline">FocusFlow</span>
          <span className="md:hidden">F</span>
        </Link>
      </div>

      <nav className="flex-1 flex flex-col space-y-1">
        <NavLink
          href="/dashboard"
          icon={<HomeIcon size={20} />}
          label="Dashboard"
        />
        <NavLink
          href="/app/tasks/new"
          icon={<PlusIcon size={20} />}
          label="New Task"
        />
      </nav>

      <div className="pt-4 border-t border-canvas-border">
        <Suspense
          fallback={
            <NavLink
              href="/signin"
              icon={<LogInIcon size={20} />}
              label="Sign In"
            />
          }
        >
          <UserEmail />
        </Suspense>
      </div>
    </aside>
  )
}
