import { cn } from '@/lib/utils'
import Link from 'next/link'

interface NavLinkProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive?: boolean
}

export default function NavLink({ href, icon, label, isActive }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center px-2 py-2 text-sm font-medium rounded-md group',
        isActive
          ? 'bg-primary-bg text-primary-text'
          : 'text-canvas-text-contrast hover:bg-canvas-bg-hover'
      )}
    >
      <span className="text-canvas-text mr-3">{icon}</span>
      <span className="hidden md:inline">{label}</span>
    </Link>
  )
}
