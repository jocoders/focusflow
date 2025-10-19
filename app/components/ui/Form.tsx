import { cn } from '@/lib/utils'
import React, { forwardRef } from 'react'

// Form
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode
}

export function Form({ className, children, ...props }: FormProps) {
  return (
    <form className={cn('space-y-6', className)} {...props}>
      {children}
    </form>
  )
}

// Form Group
interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function FormGroup({ className, children, ...props }: FormGroupProps) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {children}
    </div>
  )
}

// Form Label
interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

export function FormLabel({ className, children, ...props }: FormLabelProps) {
  return (
    <label
      className={cn(
        'text-sm font-medium text-canvas-text-contrast',
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
}

// Form Input
type FormInputProps = React.InputHTMLAttributes<HTMLInputElement>

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-md border border-canvas-border bg-canvas-bg px-3 py-2 text-sm text-canvas-text-contrast placeholder:text-canvas-text focus:outline-none focus:ring-2 focus:ring-primary-solid focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    )
  }
)
FormInput.displayName = 'FormInput'

// Form Textarea
type FormTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-canvas-border bg-canvas-bg px-3 py-2 text-sm text-canvas-text-contrast placeholder:text-canvas-text focus:outline-none focus:ring-2 focus:ring-primary-solid focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    )
  }
)
FormTextarea.displayName = 'FormTextarea'

// Form Select
interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: Array<{ label: string; value: string }>
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ className, children, options, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-md border border-canvas-border bg-canvas-bg px-3 py-2 text-sm text-canvas-text-contrast focus:outline-none focus:ring-2 focus:ring-primary-solid focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        {options
          ? options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          : children}
      </select>
    )
  }
)
FormSelect.displayName = 'FormSelect'

// Form Error
interface FormErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export function FormError({ className, children, ...props }: FormErrorProps) {
  return (
    <p className={cn('text-xs font-medium text-alert-text', className)} {...props}>
      {children}
    </p>
  )
}

// Form Description
interface FormDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export function FormDescription({
  className,
  children,
  ...props
}: FormDescriptionProps) {
  return (
    <p
      className={cn('text-xs text-canvas-text', className)}
      {...props}
    >
      {children}
    </p>
  )
}
