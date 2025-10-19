'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-canvas-text-contrast mb-4">Error</h1>
            <h2 className="text-2xl font-semibold text-canvas-text-contrast mb-4">
              Something went wrong
            </h2>
            <p className="text-canvas-text mb-8">
              {error.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-primary-solid text-primary-on-primary rounded-lg hover:bg-primary-solid-hover"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
