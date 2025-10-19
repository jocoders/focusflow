import React from 'react'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-canvas-text-contrast">Features</h1>
        <p className="text-xl text-canvas-text">
          Discover how FocusFlow can help you manage your projects more
          efficiently.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <FeatureCard
          title="Task Management"
          description="Create, organize, and prioritize your tasks in a distraction-free interface."
        />
        <FeatureCard
          title="Goal Tracking"
          description="Set measurable goals and visualize your progress with smart insights."
        />
        <FeatureCard
          title="Focus Mode"
          description="Stay in flow with timers and daily focus summaries."
        />
        <FeatureCard
          title="Team Collaboration"
          description="Share projects, assign tasks, and collaborate in real time."
        />
        <FeatureCard
          title="Smart Reminders"
          description="Never miss a deadline with intelligent reminders that adapt to your schedule."
        />
        <FeatureCard
          title="Cloud Sync"
          description="Access your data securely from any device — your progress stays with you."
        />
      </div>
    </div>
  )
}

function FeatureCard({
                       title,
                       description,
                     }: {
  title: string
  description: string
}) {
  return (
    <div className="bg-canvas-bg p-6 rounded-lg shadow-sm border border-canvas-border">
      <h3 className="text-xl font-semibold mb-2 text-canvas-text-contrast">{title}</h3>
      <p className="text-canvas-text">{description}</p>
    </div>
  )
}

interface PlanCardProps {
  title: string
  price: string
  description: string
  features: string[]
  buttonText: string
  buttonLink: string
  highlighted?: boolean
}

function PlanCard({
                    title,
                    price,
                    description,
                    features,
                    buttonText,
                    buttonLink,
                    highlighted = false,
                  }: PlanCardProps) {
  return (
    <div
      className={`rounded-lg p-6 ${
        highlighted
          ? 'bg-primary-bg border-2 border-primary-border shadow-md'
          : 'bg-canvas-bg border border-canvas-border shadow-sm'
      }`}
    >
      <h3 className="text-xl font-bold mb-2 text-canvas-text-contrast">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold text-canvas-text-contrast">{price}</span>
        {price !== 'Custom' && <span className="text-canvas-text">/month</span>}
      </div>
      <p className="text-canvas-text mb-6">{description}</p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-canvas-text">
            <CheckCircle2 className="h-5 w-5 text-success-text mr-2 flex-shrink-0" />
            <span>{feature}</span>
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
