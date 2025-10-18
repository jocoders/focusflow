import React from 'react'

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12 text-white">
      <h2 className="text-2xl font-bold mb-8 text-center text-white">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        <FAQItem
          question="What is FocusFlow?"
          answer="FocusFlow is a lightweight productivity app that helps you organize your daily tasks, set goals, and stay consistent in achieving them."
        />

        <FAQItem
          question="Is FocusFlow free to use?"
          answer="Yes! You can start for free and upgrade to Pro when you need more features or collaboration tools."
        />

        <FAQItem
          question="Can I use FocusFlow with my team?"
          answer="Absolutely. The Pro and Enterprise plans allow you to invite teammates and manage shared projects."
        />

        <FAQItem
          question="How do reminders work?"
          answer="Smart reminders learn from your habits — the more you use FocusFlow, the more accurate they become."
        />

        <FAQItem
          question="Is my data safe?"
          answer="We use end-to-end encryption and secure cloud storage to keep your information protected at all times."
        />
      </div>
    </div>
  )
}

interface FAQItemProps {
  question: string
  answer: string
}

function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2 text-white">{question}</h4>
      <p className="text-gray-400 dark:text-gray-300">{answer}</p>
    </div>
  )
}
