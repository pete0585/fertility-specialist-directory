'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, Mail, ArrowRight } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

interface PageProps {
  params: { id: string }
  searchParams: { verified?: string; error?: string }
}

export default function ClaimPage({ params, searchParams }: PageProps) {
  const { id } = params
  const { verified, error: errorParam } = searchParams

  const [step, setStep] = useState<'email' | 'sent' | 'upgrade'>(
    verified === 'true' ? 'upgrade' : 'email'
  )
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(errorParam ?? '')
  const [monthlyViews, setMonthlyViews] = useState(0)

  useEffect(() => {
    if (step !== 'upgrade') return
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
    supabase
      .from('listing_views')
      .select('*', { count: 'exact', head: true })
      .eq('directory_slug', 'fertility-specialist')
      .eq('listing_id', id)
      .gte('viewed_at', monthStart)
      .then(({ count }) => setMonthlyViews(count ?? 0))
  }, [step, id])

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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white rounded-3xl border border-teal-200 shadow-lg p-10">
          <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={32} className="text-teal-500" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3 text-center">
            Listing Claimed!
          </h1>

          <div className='text-center mb-6'>
            <div className='text-5xl font-bold text-gray-900'>{monthlyViews}</div>
            <div className='text-gray-500 mt-1'>people viewed your profile this month</div>
            <div className='mt-3 text-red-600 font-semibold'>
              0 could contact you — your phone and website are hidden
            </div>
          </div>

          <div className='space-y-3 mb-6 text-left'>
            {[
              ['Your phone number visible to searchers', 'They can call you directly from your listing'],
              ['Your website linked', 'Drive traffic to your practice site'],
              ['Your full bio displayed', 'Build trust before they reach out'],
              ['Verified badge', 'Stand out from unclaimed profiles'],
            ].map(([title, sub]) => (
              <div key={title} className='flex items-start gap-3'>
                <span className='text-green-500 text-lg leading-tight'>✓</span>
                <div>
                  <div className='font-medium text-gray-900'>{title}</div>
                  <div className='text-sm text-gray-500'>{sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 mb-6">
            <a
              href={`/api/checkout?listing_id=${id}&tier=premium`}
              className="block w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl transition-colors text-center"
            >
              Upgrade to Premium — $499/year
            </a>
            <a
              href={`/api/checkout?listing_id=${id}&tier=featured`}
              className="block w-full bg-gold-400 hover:bg-gold-500 text-white font-semibold py-3 rounded-xl transition-colors text-center"
            >
              Upgrade to Featured — $999/year
            </a>
          </div>

          <Link
            href={`/listings/${id}`}
            className="block text-sm text-teal-500 hover:text-teal-600 font-medium text-center"
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

