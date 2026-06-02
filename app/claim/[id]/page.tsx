'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { CheckCircle, Mail, ArrowRight } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ verified?: string; error?: string }>
}

export default function ClaimPage({ params, searchParams }: PageProps) {
  const { id } = use(params)
  const { verified, error: errorParam } = use(searchParams)

  const [step, setStep] = useState<'email' | 'sent' | 'upgrade'>(
    verified === 'true' ? 'upgrade' : 'email'
  )
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(errorParam ?? '')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ listingId: id, email: email.trim() }),
      })
      const body = await res.json()
      if (!res.ok) throw new Error(body.error ?? 'Something went wrong')
      setStep('sent')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send claim email')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'upgrade') {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="bg-white rounded-3xl border border-teal-200 shadow-lg p-10">
          <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={32} className="text-teal-500" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">
            Listing Claimed!
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Your listing is now claimed. Upgrade to Premium or Featured to add your bio,
            headshot, website, and treatment specialties — and get found by patients
            actively searching for your services.
          </p>

          <div className="space-y-3 mb-6">
            <a
              href={`/api/checkout?listing_id=${id}&tier=premium`}
              className="block w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Upgrade to Premium — $499/year
            </a>
            <a
              href={`/api/checkout?listing_id=${id}&tier=featured`}
              className="block w-full bg-gold-400 hover:bg-gold-500 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Upgrade to Featured — $999/year
            </a>
          </div>

          <Link
            href={`/listings/${id}`}
            className="text-sm text-teal-500 hover:text-teal-600 font-medium"
          >
            View my listing →
          </Link>
        </div>
      </div>
    )
  }

  if (step === 'sent') {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-10">
          <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <Mail size={32} className="text-teal-500" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 mb-3">
            Check Your Email
          </h1>
          <p className="text-gray-500 leading-relaxed">
            We sent a verification link to <strong className="text-gray-700">{email}</strong>.
            Click the link in that email to complete your claim. The link expires in 72 hours.
          </p>
          <p className="text-xs text-gray-400 mt-5">
            Can&apos;t find it? Check your spam folder or{' '}
            <button
              onClick={() => setStep('email')}
              className="text-teal-500 underline hover:text-teal-600"
            >
              try again
            </button>
            .
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-16">
      <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8">
        <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">
          Claim Your Listing
        </h1>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          Enter your professional email to verify and claim this listing. We&apos;ll send you a
          secure link — no password needed.
        </p>

        {error && (
          <div className="bg-coral-50 border border-coral-200 rounded-lg px-4 py-3 text-sm text-coral-600 mb-4">
            {error === 'invalid-or-expired-token'
              ? 'This verification link has expired or is invalid. Please request a new one.'
              : error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Professional Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@yourclinic.com"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {loading ? 'Sending...' : 'Send Verification Link'}
            {!loading && <ArrowRight size={16} aria-label="Send" />}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-5">
          By claiming this listing you confirm you are the listed practitioner or an authorized
          representative of their practice.
        </p>
      </div>
    </div>
  )
}
