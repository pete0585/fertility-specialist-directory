'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { PROVIDER_TYPE_LABELS, SPECIALTY_OPTIONS } from '@/lib/types'

const schema = z.object({
  full_name: z.string().min(2, 'Name is required').max(100),
  credentials: z.string().max(100).optional(),
  practice_name: z.string().max(150).optional(),
  provider_type: z.enum([
    'rei', 'obgyn', 'acupuncturist', 'mental_health', 'nutritionist',
    'urologist', 'surrogacy_agency', 'egg_donation_agency', 'clinic', 'other',
  ]),
  bio: z.string().max(1500).optional(),
  phone: z.string().max(20).optional(),
  website: z.string().url('Enter a valid URL (include https://)').max(200).optional().or(z.literal('')),
  booking_url: z.string().url('Enter a valid URL').max(200).optional().or(z.literal('')),
  email: z.string().email('Enter a valid email address'),
  address_line1: z.string().max(150).optional(),
  city: z.string().min(2, 'City is required').max(100),
  state: z.string().min(2, 'State is required').max(50),
  zip: z.string().max(10).optional(),
  specialties: z.array(z.string()).optional(),
  lgbtq_affirming: z.boolean().optional(),
  accepts_telehealth: z.boolean().optional(),
  accepting_new_patients: z.boolean().optional(),
  offers_ivf: z.boolean().optional(),
  offers_iui: z.boolean().optional(),
  offers_egg_freezing: z.boolean().optional(),
  sart_member: z.boolean().optional(),
})

type FormData = z.infer<typeof schema>

export default function SubmitForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      provider_type: 'rei',
      accepting_new_patients: true,
      specialties: [],
    },
  })

  async function onSubmit(data: FormData) {
    setError('')
    try {
      const res = await fetch('/api/listings/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error ?? 'Submission failed')
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">🌿</div>
        <h2 className="text-2xl font-serif font-bold text-teal-700 mb-3">Listing Submitted!</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Thank you. Our team will review your listing and approve it within 1–2 business days.
          You&apos;ll receive a confirmation email at the address you provided.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Personal Info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-serif text-lg font-bold text-gray-900 mb-4">Your Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-coral-500">*</span>
            </label>
            <input
              {...register('full_name')}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Dr. Jane Smith"
            />
            {errors.full_name && (
              <p className="text-xs text-coral-500 mt-1">{errors.full_name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Credentials / Degrees
            </label>
            <input
              {...register('credentials')}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="MD, FACOG, REI"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialist Type <span className="text-coral-500">*</span>
            </label>
            <select
              {...register('provider_type')}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
            >
              {Object.entries(PROVIDER_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Practice / Clinic Name</label>
            <input
              {...register('practice_name')}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="City Fertility Center"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio / About</label>
            <textarea
              {...register('bio')}
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 resize-y"
              placeholder="Share your background, training, and approach to care (150–500 words recommended)..."
            />
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-serif text-lg font-bold text-gray-900 mb-4">Contact & Location</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Email <span className="text-coral-500">*</span>
              <span className="text-gray-400 font-normal text-xs ml-1">(not shown publicly)</span>
            </label>
            <input
              {...register('email')}
              type="email"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="you@yourclinic.com"
            />
            {errors.email && (
              <p className="text-xs text-coral-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              {...register('phone')}
              type="tel"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="(555) 000-0000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              {...register('website')}
              type="url"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="https://yourclinic.com"
            />
            {errors.website && (
              <p className="text-xs text-coral-500 mt-1">{errors.website.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Online Booking URL</label>
            <input
              {...register('booking_url')}
              type="url"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="https://..."
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
            <input
              {...register('address_line1')}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="123 Main St, Suite 400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-coral-500">*</span>
            </label>
            <input
              {...register('city')}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Orlando"
            />
            {errors.city && (
              <p className="text-xs text-coral-500 mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State <span className="text-coral-500">*</span>
            </label>
            <input
              {...register('state')}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Florida"
            />
            {errors.state && (
              <p className="text-xs text-coral-500 mt-1">{errors.state.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Specialties & Features */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-serif text-lg font-bold text-gray-900 mb-4">Specialties & Services</h2>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Treatments Offered</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SPECIALTY_OPTIONS.map((specialty) => (
              <label key={specialty} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={specialty}
                  {...register('specialties')}
                  className="accent-teal-500"
                />
                <span className="text-sm text-gray-600">{specialty}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register('offers_ivf')} className="accent-teal-500" />
            <span className="text-sm text-gray-600">Offers IVF</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register('offers_iui')} className="accent-teal-500" />
            <span className="text-sm text-gray-600">Offers IUI</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register('offers_egg_freezing')} className="accent-teal-500" />
            <span className="text-sm text-gray-600">Egg Freezing</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register('lgbtq_affirming')} className="accent-teal-500" />
            <span className="text-sm text-gray-600">LGBTQ+ Affirming</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register('accepts_telehealth')} className="accent-teal-500" />
            <span className="text-sm text-gray-600">Telehealth Available</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register('accepting_new_patients')} className="accent-teal-500" />
            <span className="text-sm text-gray-600">Accepting New Patients</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" {...register('sart_member')} className="accent-teal-500" />
            <span className="text-sm text-gray-600">SART Member</span>
          </label>
        </div>
      </div>

      {error && (
        <div className="bg-coral-50 border border-coral-200 rounded-lg px-4 py-3 text-sm text-coral-600">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors text-base"
      >
        {isSubmitting ? 'Submitting...' : 'Submit My Listing (Free)'}
      </button>

      <p className="text-center text-xs text-gray-400">
        Free listings are reviewed within 1–2 business days. Upgrade to Premium, Featured, or Clinic
        after your listing is live.
      </p>
    </form>
  )
}
