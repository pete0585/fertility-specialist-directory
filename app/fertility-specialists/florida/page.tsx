import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { createClient } from '@/lib/supabase/server'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Fertility Specialists in Florida — Find IVF Doctors & REI Specialists',
  description:
    'Find a fertility specialist in Florida. Browse 130+ reproductive endocrinologists, IVF clinics, and fertility providers across Miami, Tampa, Orlando, Jacksonville, and all major Florida cities.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/fertility-specialists/florida',
  },
  alternates: {
    canonical: '/fertility-specialists/florida',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Florida require insurance to cover IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Florida does not have a fertility insurance mandate. Most Florida patients pay for IVF out of pocket or through employer-provided fertility benefits. Large employers in finance, healthcare, and tourism sometimes offer fertility coverage — check with your HR department.",
      },
    },
    {
      '@type': 'Question',
      name: 'Which Florida cities have the most fertility specialists?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Miami and Boca Raton (South Florida) have the highest concentration of fertility specialists in the state. Tampa and Orlando are growing markets with strong academic programs at USF Health and UCF College of Medicine. Jacksonville and Gainesville have established fertility practices anchored by UF Health.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does IVF cost in Florida?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IVF in Florida typically costs $12,000–$20,000 per cycle, with medications adding $3,000–$6,000. Miami tends to be at the higher end of this range. Many Florida clinics offer financing through CapexMD or Prosper Healthcare Lending.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there fertility specialists in Central and North Florida?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Orlando, Tampa, Jacksonville, and Gainesville all have established fertility practices. The I-4 corridor (Orlando to Tampa) is one of the fastest-growing fertility markets in Florida, driven by Central Florida's rapid population growth.",
      },
    },
  ],
}

async function getFloridaListings(): Promise<Listing[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('fertility_specialist_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('state', 'FL')
    .order('listing_tier', { ascending: false })
    .limit(12)
  return (data ?? []) as Listing[]
}

const FL_CITIES = [
  { name: 'Miami', slug: 'miami-fl' },
  { name: 'Tampa', slug: 'tampa-fl' },
  { name: 'Orlando', slug: 'orlando-fl' },
  { name: 'Jacksonville', slug: 'jacksonville-fl' },
  { name: 'Fort Lauderdale', slug: 'fort-lauderdale-fl' },
  { name: 'Boca Raton', slug: 'boca-raton-fl' },
]

export default async function FloridaHubPage() {
  const listings = await getFloridaListings()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-teal-500 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" aria-label="" />
          <Link href="/listings" className="hover:text-teal-500 transition-colors">Fertility Specialists</Link>
          <ChevronRight className="w-4 h-4" aria-label="" />
          <span className="text-gray-900 font-medium">Florida</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Fertility Specialists in Florida
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          Florida has over 130 fertility specialists listed in this directory. South Florida leads in clinic density, with Miami, Boca Raton, and Fort Lauderdale as the primary hubs. Central Florida and Tampa are growing rapidly. Browse by city or search all Florida providers.
        </p>

        {/* City breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {FL_CITIES.map(city => (
              <Link
                key={city.slug}
                href={`/fertility-specialists/${city.slug}`}
                className="flex items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-teal-200 hover:bg-teal-50 transition-all text-sm font-medium text-gray-700 hover:text-teal-600"
              >
                <span>{city.name}</span>
                <ChevronRight className="w-3 h-3 ml-auto text-gray-400" aria-label="" />
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/listings?state=FL" className="text-sm text-teal-500 hover:text-teal-600 font-medium">
              View all Florida cities →
            </Link>
          </div>
        </div>

        {listings.length > 0 && (
          <div className="mb-10">
            <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Featured Florida Fertility Specialists</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {listings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        <div className="text-center mb-10">
          <Link href="/listings?state=FL" className="inline-block px-6 py-2.5 border border-teal-500 text-teal-500 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm">
            Browse All Florida Fertility Specialists →
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
            Fertility Care in Florida — Common Questions
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-gray-800">Does Florida require insurance to cover IVF?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Florida has no fertility insurance mandate. Most patients pay out of pocket or through employer benefits. Some large Florida employers in finance and healthcare offer voluntary fertility coverage — check with your HR department.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Which Florida cities have the most fertility specialists?</h3>
              <p className="text-gray-600 text-sm mt-1">
                South Florida (Miami, Boca Raton, Fort Lauderdale) has the highest concentration. Tampa and Orlando are growing markets. Jacksonville and Gainesville have established practices anchored by academic medical centers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">How much does IVF cost in Florida?</h3>
              <p className="text-gray-600 text-sm mt-1">
                IVF in Florida typically costs $12,000–$20,000 per cycle plus medications. Many Florida clinics offer financing options. Miami tends toward the higher end of that range.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-teal-500 text-white rounded-2xl p-6 text-center">
          <h2 className="font-serif text-xl font-bold mb-2">Are You a Fertility Specialist in Florida?</h2>
          <p className="text-teal-100 text-sm mb-4">Claim your free listing and connect with patients searching for fertility care across the Sunshine State.</p>
          <Link href="/submit" className="inline-block bg-gold-400 hover:bg-gold-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
            Add Your Free Listing →
          </Link>
        </div>
      </div>
    </>
  )
}
