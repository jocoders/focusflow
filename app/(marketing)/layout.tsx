import Link from 'next/link'
import { Timestamp } from '../components/Timestamp'
import Button from '../components/ui/Button'

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-canvas-border bg-canvas-bg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-canvas-text-contrast">
              FocusFlow
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/features"
                className="text-sm font-medium text-canvas-text-contrast hover:text-primary-text"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium text-canvas-text-contrast hover:text-primary-text"
              >
                Pricing
              </Link>
              <Link
                href="/faq"
                className="text-sm font-medium text-canvas-text-contrast hover:text-primary-text"
              >
                FAQ
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-4">
              <Link href="/signin">
                <Button variant="outline">Sign in</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-canvas-border bg-canvas-base">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-canvas-text-contrast">FocusFlow</h3>
              <p className="text-sm text-canvas-text">
                Designed to help you focus on what truly matters.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4 text-canvas-text-contrast">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-sm text-canvas-text hover:text-primary-text"
                  >
                    Overview
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-sm text-canvas-text hover:text-primary-text"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/features"
                    className="text-sm text-canvas-text hover:text-primary-text"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-sm text-canvas-text hover:text-primary-text"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4 text-canvas-text-contrast">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-canvas-text hover:text-primary-text"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/productivity-tips"
                    className="text-sm text-canvas-text hover:text-primary-text"
                  >
                    Productivity Tips
                  </Link>
                </li>
                <li>
                  <Link
                    href="/api-docs"
                    className="text-sm text-canvas-text hover:text-primary-text"
                  >
                    API Docs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/community"
                    className="text-sm text-canvas-text hover:text-primary-text"
                  >
                    Community Forum
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4 text-canvas-text-contrast">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-canvas-text hover:text-primary-text"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-canvas-text hover:text-primary-text"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/security"
                    className="text-sm text-canvas-text hover:text-primary-text"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-canvas-border pt-8 text-center">
            <p className="text-sm text-canvas-text">
              &copy; <Timestamp /> FocusFlow — Designed to help you focus on what truly matters.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
