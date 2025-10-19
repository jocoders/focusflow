import { cn } from '@/lib/utils'
import React from 'react'

type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'success'
  | 'warning'
  | 'danger'
type StatusType = 'backlog' | 'todo' | 'in_progress' | 'done'
type PriorityType = 'low' | 'medium' | 'high'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  status?: StatusType
  priority?: PriorityType
}

export default function Badge({
  className,
  variant = 'default',
  children,
  status,
  priority,
  ...props
}: BadgeProps) {
  // Get variant based on status or priority if provided
  const getBadgeVariant = (): BadgeVariant => {
    if (status) {
      switch (status) {
        case 'backlog':
          return 'secondary'
        case 'todo':
          return 'default'
        case 'in_progress':
          return 'warning'
        case 'done':
          return 'success'
        default:
          return 'default'
      }
    }

    if (priority) {
      switch (priority) {
        case 'low':
          return 'secondary'
        case 'medium':
          return 'default'
        case 'high':
          return 'danger'
        default:
          return 'default'
      }
    }

    return variant
  }

  const variantStyles = {
    default:
      'bg-primary-bg text-primary-text',
    secondary: 'bg-canvas-bg-subtle text-canvas-text-contrast',
    outline:
      'border border-canvas-border text-canvas-text-contrast',
    success:
      'bg-success-bg text-success-text',
    warning:
      'bg-warning-bg text-warning-text',
    danger: 'bg-alert-bg text-alert-text',
  }

  const badgeVariant = getBadgeVariant()

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full',
        variantStyles[badgeVariant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
