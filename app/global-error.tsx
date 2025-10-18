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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">Error</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-8">
              {error.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
