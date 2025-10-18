import Link from 'next/link'
import { Timestamp } from '../components/Timestamp'
import Button from '../components/ui/Button'

export default async function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Focus made <br className="hidden sm:block" />
              <span className="text-purple-600 dark:text-purple-400">
                simple
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              Streamline your workflow, track goals, and stay productive — all in one place.
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-base text-gray-500 dark:text-gray-400">
              A modern productivity platform that helps you plan, track, and achieve your goals effortlessly.
            </p>
            <div className="mt-10">
              <Link href="/signup">
                <Button size="lg">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-dark-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              © <Timestamp /> FocusFlow — Designed to help you focus on what truly matters.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
