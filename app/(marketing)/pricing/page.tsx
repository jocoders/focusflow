import React from 'react'
import Link from 'next/link'
import { CheckCircle2, XCircle } from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-canvas-text-contrast">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-canvas-text">
          Choose the plan that&apos;s right for you and your team
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Free Plan */}
        <PricingCard
          title="Free"
          price="$0"
          description="Perfect for individuals starting their productivity journey."
          features={[
            { name: 'Up to 3 projects', included: true },
            { name: 'Smart reminders', included: true },
            { name: 'Progress charts', included: true },
            { name: 'Email support', included: false },
            { name: 'Team collaboration', included: false },
            { name: 'Goal analytics', included: false },
            { name: 'AI-powered suggestions', included: false },
          ]}
          buttonText="Sign Up Free"
          buttonLink="/signup"
        />

        {/* Pro Plan */}
        <PricingCard
          title="Pro"
          price="$10"
          period="/ month"
          description="Designed for professionals who want to track more and collaborate."
          features={[
            { name: 'Unlimited projects', included: true },
            { name: 'Team collaboration', included: true },
            { name: 'Goal analytics', included: true },
            { name: 'AI-powered task suggestions', included: true },
            { name: 'Priority support', included: true },
            { name: 'Advanced integrations', included: false },
            { name: 'API access', included: false },
          ]}
          buttonText="Coming Soon"
          buttonLink="#"
          highlighted
          badge="Popular"
        />

        {/* Enterprise Plan */}
        <PricingCard
          title="Enterprise"
          price="Custom"
          description="For teams who need advanced features and security."
          features={[
            { name: 'Dedicated workspace', included: true },
            { name: 'Admin roles & permissions', included: true },
            { name: 'Priority support', included: true },
            { name: 'API integrations', included: true },
            { name: 'Advanced security', included: true },
            { name: 'Custom deployment', included: true },
            { name: 'SLA guarantee', included: true },
          ]}
          buttonText="Contact Sales"
          buttonLink="mailto:sales@focusflow.com"
        />
      </div>

      <div className="max-w-3xl mx-auto mt-16 text-center bg-canvas-bg rounded-lg p-8 border border-canvas-border">
        <h2 className="text-2xl font-bold mb-4 text-canvas-text-contrast">
          Need a custom solution?
        </h2>
        <p className="text-lg text-canvas-text mb-8">
          Contact our sales team to discuss your specific requirements.
        </p>
        <a
          href="mailto:sales@focusflow.com"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary-solid px-8 py-2 text-sm font-medium text-primary-on-primary shadow transition-colors hover:bg-primary-solid-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-border"
        >
          Contact Sales
        </a>
      </div>
    </div>
  )
}

interface PricingFeature {
  name: string
  included: boolean
}

interface PricingCardProps {
  title: string
  price: string
  period?: string
  description: string
  features: PricingFeature[]
  buttonText: string
  buttonLink: string
  highlighted?: boolean
  badge?: string
}

function PricingCard({
                       title,
                       price,
                       period = 'per month',
                       description,
                       features,
                       buttonText,
                       buttonLink,
                       highlighted = false,
                       badge,
                     }: PricingCardProps) {
  return (
    <div
      className={`rounded-lg p-6 ${
        highlighted
          ? 'bg-primary-bg border-2 border-primary-border shadow-md relative'
          : 'bg-canvas-bg border border-canvas-border shadow-sm'
      }`}
    >
      {badge && (
        <div className="absolute -top-3 -right-3 bg-primary-solid text-primary-on-primary text-xs font-bold px-3 py-1 rounded-full">
          {badge}
        </div>
      )}
      <h3 className="text-xl font-bold mb-2 text-canvas-text-contrast">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold text-canvas-text-contrast">{price}</span>
        {price !== 'Custom' && (
          <span className="text-canvas-text"> {period}</span>
        )}
      </div>
      <p className="text-canvas-text mb-6">{description}</p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            {feature.included ? (
              <CheckCircle2 className="h-5 w-5 text-success-text mr-2 flex-shrink-0" />
            ) : (
              <XCircle className="h-5 w-5 text-canvas-text mr-2 flex-shrink-0" />
            )}
            <span
              className={
                feature.included
                  ? 'text-canvas-text-contrast'
                  : 'text-canvas-text'
              }
            >
              {feature.name}
            </span>
          </li>
        ))}
      </ul>
      <Link
        href={buttonLink}
        className={`w-full inline-flex h-10 items-center justify-center rounded-md px-8 py-2 text-sm font-medium shadow transition-colors ${
          highlighted
            ? 'bg-primary-solid text-primary-on-primary hover:bg-primary-solid-hover'
            : 'bg-canvas-bg-subtle border border-canvas-border hover:bg-canvas-bg-hover text-canvas-text-contrast'
        }`}
      >
        {buttonText}
      </Link>
    </div>
  )
}
