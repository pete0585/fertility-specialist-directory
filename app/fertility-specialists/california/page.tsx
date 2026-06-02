import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { createClient } from '@/lib/supabase/server'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Fertility Specialists in California — Find IVF Doctors & REI Specialists',
  description:
    'Find a fertility specialist in California. Browse 280+ reproductive endocrinologists, IVF clinics, and fertility providers across Los Angeles, San Francisco, San Diego, and all major California cities.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/fertility-specialists/california',
  },
  alternates: {
    canonical: '/fertility-specialists/california',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does California require insurance to cover IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. California's SB 600 (effective 2025) requires most fully insured large group health plans to cover infertility diagnosis and treatment, including IVF. If your employer's plan is issued in California and you work for a large employer, IVF coverage is likely required. Self-insured ERISA plans are exempt — check with your HR department.",
      },
    },
    {
      '@type': 'Question',
      name: 'Which California cities have the most fertility specialists?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los Angeles has the highest concentration of fertility specialists in California, followed by the San Francisco Bay Area (San Francisco, Palo Alto, San Jose, Oakland), San Diego, Sacramento, and Orange County (Irvine, Anaheim). Academic programs at UCLA, UCSF, Stanford, and UC San Diego anchor the state\'s top fertility markets.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does IVF cost in California?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "IVF in California typically costs $15,000–$25,000 per cycle without insurance. Because of California's mandate, many patients with qualifying plans pay significantly less or nothing out of pocket. Medications add $3,000–$6,000.",
      },
    },
    {
      '@type': 'Question',
      name: 'Are there SART-member fertility clinics in California?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "California has more SART-member clinics than any other state. SART membership means the clinic follows standardized protocols and publishes IVF success rates by age group at sartcorsonline.com. Filtering for SART-affiliated providers is a good starting point when comparing California fertility clinics.",
      },
    },
  ],
}

async function getCaliforniaListings(): Promise<Listing[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('fertility_specialist_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('state', 'CA')
    .order('listing_tier', { ascending: false })
    .limit(12)
  return (data ?? []) as Listing[]
}

const CA_CITIES = [
  { name: 'Los Angeles', slug: 'los-angeles-ca' },
  { name: 'San Francisco', slug: 'san-francisco-ca' },
  { name: 'San Diego', slug: 'san-diego-ca' },
  { name: 'Sacramento', slug: 'sacramento-ca' },
  { name: 'Irvine', slug: 'irvine-ca' },
  { name: 'Palo Alto', slug: 'palo-alto-ca' },
]

export default async function CaliforniaHubPage() {
  const listings = await getCaliforniaListings()

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
          <span className="text-gray-900 font-medium">California</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Fertility Specialists in California
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          California has more fertility specialists than any other state — over 280 listed in this directory. California also passed a comprehensive IVF insurance mandate in 2025, meaning many patients have coverage. Browse by city or search all California providers.
        </p>

        {/* City breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CA_CITIES.map(city => (
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
            <Link href="/listings?state=CA" className="text-sm text-teal-500 hover:text-teal-600 font-medium">
              View all California cities →
            </Link>
          </div>
        </div>

        {/* Featured listings */}
        {listings.length > 0 && (
          <div className="mb-10">
            <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Featured California Fertility Specialists</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {listings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        <div className="text-center mb-10">
          <Link href="/listings?state=CA" className="inline-block px-6 py-2.5 border border-teal-500 text-teal-500 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm">
            Browse All California Fertility Specialists →
          </Link>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
            Fertility Care in California — Common Questions
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-gray-800">Does California require insurance to cover IVF?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Yes. California&rsquo;s SB 600 (effective 2025) requires most fully insured large group plans to cover infertility treatment including IVF. Check with your HR department — ERISA self-insured plans are exempt.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Which California cities have the most fertility specialists?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Los Angeles has the highest concentration, followed by the Bay Area (San Francisco, Palo Alto, San Jose), San Diego, Sacramento, and Orange County. Academic programs at UCLA, UCSF, Stanford, and UC San Diego anchor the top markets.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Are there SART-member clinics in California?</h3>
              <p className="text-gray-600 text-sm mt-1">
                California has more SART-member IVF clinics than any other state. SART members publish annual success rate data at sartcorsonline.com. This transparency makes California one of the best states for evaluating and comparing fertility clinics.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-teal-500 text-white rounded-2xl p-6 text-center">
          <h2 className="font-serif text-xl font-bold mb-2">Are You a Fertility Specialist in California?</h2>
          <p className="text-teal-100 text-sm mb-4">Claim your free listing and connect with patients searching for fertility care across the state.</p>
          <Link href="/submit" className="inline-block bg-gold-400 hover:bg-gold-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
            Add Your Free Listing →
          </Link>
        </div>
      </div>
    </>
  )
}
