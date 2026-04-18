'use client'

import { useState } from 'react'

export default function EarlyAccess() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with Resend or Formspree
    console.log('Email submitted:', email)
    setSubmitted(true)
  }

  return (
    <section id="early-access" className="min-h-screen flex flex-col items-center justify-center px-6 md:px-[120px]">
      <h2 className="text-4xl md:text-7xl font-[family-name:var(--font-display)] font-bold text-center mb-6">
        BE THE FIRST TO FEEL IT.
      </h2>

      <p className="text-text-secondary text-lg md:text-xl text-center mb-12 max-w-2xl">
        Caestus ships to early access users before general release. Leave your email.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 w-full max-w-2xl">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email address"
            className="flex-1 px-6 py-4 bg-transparent border border-text-primary rounded-[2px] font-[family-name:var(--font-mono)] text-sm focus:outline-none focus:ring-2 focus:ring-text-primary placeholder:text-text-secondary/50"
            required
          />
          <button
            type="submit"
            className="px-8 py-4 bg-text-primary text-background-primary rounded-[2px] font-[family-name:var(--font-mono)] text-sm hover:opacity-90 transition uppercase tracking-wider whitespace-nowrap"
          >
            Request Access →
          </button>
        </form>
      ) : (
        <div className="text-center text-text-secondary text-lg">
          Thanks! We'll be in touch.
        </div>
      )}
    </section>
  )
}
