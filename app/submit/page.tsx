import type { Metadata } from 'next'
import SubmitForm from '@/components/SubmitForm'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Add Your Fertility Practice — Free Listing',
  description:
    'Add your fertility practice to our directory for free. Claim or create your listing as a reproductive endocrinologist, fertility clinic, acupuncturist, or fertility counselor.',
}

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['Basic listing in directory', 'City & specialty visible', 'Phone number displayed', '"Claim this listing" CTA'],
    cta: 'Start here',
    featured: false,
  },
  {
    name: 'Premium',
    price: '$299',
    period: '/year',
    features: [
      'Everything in Free',
      'Verified badge',
      'Bio & headshot',
      'Website & booking link',
      'Specialties & treatment filters',
      'Insurance accepted',
      'Priority placement above free listings',
    ],
    cta: 'Submit & upgrade later',
    featured: true,
  },
  {
    name: 'Featured',
    price: '$499',
    period: '/year',
    features: [
      'Everything in Premium',
      'Top Provider badge',
      'Featured on city landing pages',
      'Featured in category pages',
      'Priority in map view',
      'LGBTQ+ & other specialty badges',
    ],
    cta: 'Submit & upgrade later',
    featured: false,
  },
]

export default function SubmitPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-3">
          List Your Fertility Practice
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
          Free to submit. One new IVF patient covers your annual Premium cost in the first
          consultation.
        </p>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-2xl border p-5 ${
              plan.featured
                ? 'border-teal-300 bg-teal-50 shadow-md'
                : 'border-gray-100 bg-white shadow-sm'
            }`}
          >
            {plan.featured && (
              <div className="text-xs text-teal-600 font-bold uppercase tracking-wider mb-2">
                Most Popular
              </div>
            )}
            <div className="font-serif font-bold text-gray-900 text-xl">{plan.name}</div>
            <div className="mt-1 mb-4">
              <span className="text-3xl font-bold text-teal-600">{plan.price}</span>
              <span className="text-gray-400 text-sm">{plan.period}</span>
            </div>
            <ul className="space-y-2 mb-4">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle size={14} className="text-teal-500 mt-0.5 flex-shrink-0" aria-label="Included" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <SubmitForm />
    </div>
  )
}
