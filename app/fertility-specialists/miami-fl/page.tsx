import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Fertility Specialists in Miami, FL — Find IVF Doctors Near You',
  description:
    'Find a fertility specialist or reproductive endocrinologist in Miami, FL. Browse REI doctors, IVF clinics, and LGBTQ+-affirming fertility providers in Miami-Dade and Broward counties.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/fertility-specialists/miami-fl',
  },
  alternates: {
    canonical: '/fertility-specialists/miami-fl',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What fertility clinics are in Miami?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Miami has a robust fertility care market including programs at the University of Miami Health System (UHealth), Jackson Memorial Hospital, and independent fertility practices throughout Coral Gables, Brickell, Aventura, and Weston. Miami is also a destination for international patients seeking fertility care.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Florida require insurance to cover IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Florida does not mandate IVF coverage. Most Miami patients pay out of pocket or through employer benefits. Larger Miami employers in finance, healthcare, and international business sometimes offer fertility benefits — check with your HR department.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there LGBTQ+-affirming fertility specialists in Miami?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Miami has a large LGBTQ+ community and many fertility specialists who are experienced and affirming with same-sex couples and transgender patients. Use our 'LGBTQ+ Affirming' filter to find providers who specifically list inclusive care.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does IVF cost in Miami?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IVF in Miami typically costs $12,000–$20,000 per cycle, with medications adding $3,000–$6,000. Miami costs are similar to other large Florida markets. Many Miami clinics also serve international patients and offer financing options.',
      },
    },
  ],
}

export default async function MiamiFertilityPage() {
  const listings = await getListingsByCity('Miami', 'FL', 30)

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
          <span className="text-gray-900 font-medium">Miami, FL</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Find a Fertility Specialist in Miami, FL
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          Miami is South Florida&rsquo;s fertility care hub and a destination for both domestic and international patients. Browse reproductive endocrinologists, IVF clinics, and LGBTQ+-affirming fertility providers across Miami-Dade and Broward counties.
        </p>

        {listings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center mb-10">
            <p className="text-gray-500 mb-4">No listings found for Miami, FL yet.</p>
            <Link href="/submit" className="inline-block px-6 py-2.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors text-sm">
              Add Your Practice →
            </Link>
          </div>
        )}

        <div className="text-center mb-10">
          <Link href="/listings?city=Miami&state=FL" className="inline-block px-6 py-2.5 border border-teal-500 text-teal-500 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm">
            View All Miami Fertility Specialists →
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
            Fertility Care in Miami — Common Questions
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-gray-800">Which hospitals have fertility programs in Miami?</h3>
              <p className="text-gray-600 text-sm mt-1">
                UHealth (University of Miami) and Jackson Memorial Hospital both have established REI programs. Independent practices in Coral Gables, Aventura, and Weston serve a broad South Florida patient base.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Are there LGBTQ+-affirming fertility specialists in Miami?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Yes. Miami has a large LGBTQ+ community and many fertility specialists with experience serving same-sex couples and transgender patients. Filter our listings by &ldquo;LGBTQ+ Affirming&rdquo; to find inclusive providers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Does Florida require insurance to cover IVF?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Florida has no IVF insurance mandate. Most Miami patients pay out of pocket or through employer benefits. Many larger Miami employers in finance and healthcare offer fertility coverage.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-teal-500 text-white rounded-2xl p-6 text-center">
          <h2 className="font-serif text-xl font-bold mb-2">Are You a Fertility Specialist in Miami?</h2>
          <p className="text-teal-100 text-sm mb-4">Claim your free listing and reach patients searching for fertility care across South Florida.</p>
          <Link href="/submit" className="inline-block bg-gold-400 hover:bg-gold-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
            Add Your Free Listing →
          </Link>
        </div>
      </div>
    </>
  )
}
