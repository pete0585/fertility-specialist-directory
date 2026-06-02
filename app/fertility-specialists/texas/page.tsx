import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { createClient } from '@/lib/supabase/server'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Fertility Specialists in Texas — Find IVF Doctors & REI Specialists',
  description:
    'Find a fertility specialist in Texas. Browse 150+ reproductive endocrinologists, IVF clinics, and fertility providers across Houston, Dallas, Austin, San Antonio, and all major Texas cities.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/fertility-specialists/texas',
  },
  alternates: {
    canonical: '/fertility-specialists/texas',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Texas require insurance to cover IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Texas does not have a fertility insurance mandate. Most Texas patients pay for IVF out of pocket or through employer-sponsored fertility benefits. The Dallas and Houston metro areas have many large employers in energy, tech, and healthcare that voluntarily offer fertility coverage through Progyny, Carrot, or Maven Clinic.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which Texas cities have the most fertility specialists?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Houston and Dallas have the largest concentrations of fertility specialists in Texas. Houston\'s Texas Medical Center is the largest medical complex in the world. Austin is growing rapidly as a fertility market. San Antonio has strong fertility care anchored by UT Health San Antonio.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does IVF cost in Texas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IVF in Texas typically costs $12,000–$18,000 per cycle, making it more affordable than coastal markets. Medications add $3,000–$6,000. Many Texas clinics offer multi-cycle packages and financing through CapexMD or Prosper Healthcare Lending.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there SART-member fertility clinics in Texas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Houston, Dallas, Austin, and San Antonio all have SART-member clinics that publish IVF success rate data. SART membership is a key quality indicator — members follow standardized lab protocols and report outcomes transparently.',
      },
    },
  ],
}

async function getTexasListings(): Promise<Listing[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('fertility_specialist_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('state', 'TX')
    .order('listing_tier', { ascending: false })
    .limit(12)
  return (data ?? []) as Listing[]
}

const TX_CITIES = [
  { name: 'Houston', slug: 'houston-tx' },
  { name: 'Dallas', slug: 'dallas-tx' },
  { name: 'Austin', slug: 'austin-tx' },
  { name: 'San Antonio', slug: 'san-antonio-tx' },
  { name: 'Fort Worth', slug: 'fort-worth-tx' },
  { name: 'Plano', slug: 'plano-tx' },
]

export default async function TexasHubPage() {
  const listings = await getTexasListings()

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
          <span className="text-gray-900 font-medium">Texas</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Fertility Specialists in Texas
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          Texas has over 150 fertility specialists listed in this directory, spanning Houston, Dallas, Austin, San Antonio, and the growing suburbs across the state. Browse by city or search all Texas providers.
        </p>

        {/* City breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Browse by City</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TX_CITIES.map(city => (
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
            <Link href="/listings?state=TX" className="text-sm text-teal-500 hover:text-teal-600 font-medium">
              View all Texas cities →
            </Link>
          </div>
        </div>

        {listings.length > 0 && (
          <div className="mb-10">
            <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Featured Texas Fertility Specialists</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {listings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        <div className="text-center mb-10">
          <Link href="/listings?state=TX" className="inline-block px-6 py-2.5 border border-teal-500 text-teal-500 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm">
            Browse All Texas Fertility Specialists →
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
            Fertility Care in Texas — Common Questions
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-gray-800">Does Texas require insurance to cover IVF?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Texas has no fertility insurance mandate. Most patients pay out of pocket or through employer benefits. Large energy, tech, and healthcare employers in Houston and Dallas often offer voluntary fertility benefits — check with HR.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Which Texas cities have the most fertility specialists?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Houston and Dallas have the largest concentrations. Houston&rsquo;s Texas Medical Center anchors the state&rsquo;s biggest fertility market. Austin is the fastest-growing fertility market in Texas. San Antonio has strong coverage anchored by UT Health.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">How much does IVF cost in Texas?</h3>
              <p className="text-gray-600 text-sm mt-1">
                IVF in Texas typically costs $12,000–$18,000 per cycle, plus $3,000–$6,000 for medications. Texas is more affordable than coastal markets, and many clinics offer financing and multi-cycle packages.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-teal-500 text-white rounded-2xl p-6 text-center">
          <h2 className="font-serif text-xl font-bold mb-2">Are You a Fertility Specialist in Texas?</h2>
          <p className="text-teal-100 text-sm mb-4">Claim your free listing and connect with patients searching for fertility care across the Lone Star State.</p>
          <Link href="/submit" className="inline-block bg-gold-400 hover:bg-gold-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
            Add Your Free Listing →
          </Link>
        </div>
      </div>
    </>
  )
}
