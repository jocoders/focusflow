'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/app/components/ui/Button'
import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormError,
} from '@/app/components/ui/Form'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { signUp, type ActionResponse } from '@/app/actions/auth'


const initState: ActionResponse = {
  success: false,
  message: '',
  error: undefined
}

export default function SignUpPage() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData) => {
    try {
      const result = await signUp(formData)

      // Handle successful submission
      if (result.success) {
        toast.success('Account created successfully')
        router.push('/dashboard')
      }

      return result
    } catch (err) {
      return {
        success: false,
        message: (err as Error).message || 'An error occurred',
        errors: undefined,
      }
    }
  }, initState)


  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-background">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-canvas-text-contrast">
          FocusFlow
        </h1>
        <h2 className="mt-2 text-center text-2xl font-bold text-canvas-text-contrast">
          Create a new account
        </h2>
      </div>



      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Form action={formAction} className="space-y-6">
          {state?.message && !state.success && (
            <FormError>{state.message}</FormError>
          )}

          <FormGroup>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInput
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isPending}
              aria-describedby="email-error"
              className={state?.errors?.email ? 'border-alert-border' : ''}
            />
            {state?.errors?.email && (
              <p id="email-error" className="text-sm text-alert-text">
                {state.errors.email[0]}
              </p>
            )}
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              disabled={isPending}
              aria-describedby="password-error"
              className={state?.errors?.password ? 'border-alert-border' : ''}
            />
            {state?.errors?.password && (
              <p id="password-error" className="text-sm text-alert-text">
                {state.errors.password[0]}
              </p>
            )}
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <FormInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              disabled={isPending}
              aria-describedby="confirmPassword-error"
              className={state?.errors?.confirmPassword ? 'border-alert-border' : ''}
            />
            {state?.errors?.confirmPassword && (
              <p id="confirmPassword-error" className="text-sm text-alert-text">
                {state.errors.confirmPassword[0]}
              </p>
            )}
          </FormGroup>

          <div>
            <Button type="submit" className="w-full" isLoading={isPending}>
              Sign up
            </Button>
          </div>
        </Form>
        <div className="bg-canvas-bg py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-canvas-border">
          <div className="mt-6 text-center">
            <p className="text-sm text-canvas-text">
              Already have an account?{' '}
              <Link
                href="/signin"
                className="font-medium text-canvas-text-contrast hover:text-primary-text"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
