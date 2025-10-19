import Link from 'next/link'
import Button from './components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-canvas-text-contrast mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-canvas-text-contrast mb-4">
          Page Not Found
        </h2>
        <p className="text-canvas-text mb-8">
          The page you are looking for does not exist.
        </p>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  )
}
