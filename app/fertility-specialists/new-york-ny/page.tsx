import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Fertility Specialists in New York, NY — Find IVF Doctors Near You',
  description:
    'Find a fertility specialist or reproductive endocrinologist in New York City. Browse REI doctors, IVF clinics, and LGBTQ+-affirming fertility providers in Manhattan, Brooklyn, and the boroughs.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/fertility-specialists/new-york-ny',
  },
  alternates: {
    canonical: '/fertility-specialists/new-york-ny',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many fertility specialists are in New York City?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'New York City has one of the densest concentrations of reproductive endocrinologists in the world. Major fertility clinics operate across Manhattan, with additional locations in Brooklyn, Queens, and the Bronx. Many NYC fertility specialists also see patients in New Jersey and Connecticut.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does New York require insurance to cover IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "New York State requires most employers with 25+ employees to cover IVF, including egg freezing (effective 2020). If your employer's plan is issued in New York and your employer has 25+ employees, IVF is likely covered. Self-insured (ERISA) plans are exempt from the mandate — check with HR.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is the average wait time to see a fertility specialist in NYC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wait times at top NYC fertility clinics can range from 2–8 weeks for a new patient consultation. If you have a diagnosis or are over 35, ask to be added to a cancellation list — many practices can see urgent cases sooner.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there LGBTQ+-affirming fertility specialists in New York?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "New York City has a large and established LGBTQ+-affirming fertility community. Many NYC REI specialists regularly work with same-sex couples and individuals on reciprocal IVF, donor sperm, and surrogacy. Filter our listings by 'LGBTQ+ Affirming' to find inclusive providers.",
      },
    },
  ],
}

export default async function NewYorkFertilityPage() {
  const listings = await getListingsByCity('New York', 'NY', 30)

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
          <span className="text-gray-900 font-medium">New York, NY</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Find a Fertility Specialist in New York City
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          New York City has one of the highest concentrations of reproductive endocrinologists in the country. Browse fertility specialists, IVF clinics, and LGBTQ+-affirming providers across Manhattan, Brooklyn, and the greater NYC metro.
        </p>

        {listings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center mb-10">
            <p className="text-gray-500 mb-4">No listings found for New York, NY yet.</p>
            <Link href="/submit" className="inline-block px-6 py-2.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors text-sm">
              Add Your Practice →
            </Link>
          </div>
        )}

        <div className="text-center mb-10">
          <Link href="/listings?city=New+York&state=NY" className="inline-block px-6 py-2.5 border border-teal-500 text-teal-500 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm">
            View All NYC Fertility Specialists →
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
            Fertility Care in New York City — Common Questions
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-gray-800">Does New York require insurance to cover IVF?</h3>
              <p className="text-gray-600 text-sm mt-1">
                New York State requires most employers with 25+ employees to cover IVF and egg freezing (effective 2020). If your plan is issued in New York and your employer has 25+ employees, IVF is likely covered. Self-insured ERISA plans are exempt.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">What is the wait time to see a fertility specialist in NYC?</h3>
              <p className="text-gray-600 text-sm mt-1">
                New patient consultations at top NYC fertility clinics range from 2–8 weeks. If you are over 35 or have a known diagnosis, ask to be added to a cancellation list — urgent cases are often accommodated sooner.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Are there LGBTQ+-affirming fertility specialists in NYC?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Yes. New York City has one of the most established LGBTQ+-affirming fertility communities in the US. Many REI specialists regularly work with same-sex couples on reciprocal IVF, donor sperm, and surrogacy coordination.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Where in NYC are fertility clinics concentrated?</h3>
              <p className="text-gray-600 text-sm mt-1">
                The highest concentration is in Midtown and Upper East Side Manhattan, near major academic medical centers. Brooklyn Heights, Forest Hills (Queens), and the Upper West Side also have established fertility practices.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-teal-500 text-white rounded-2xl p-6 text-center">
          <h2 className="font-serif text-xl font-bold mb-2">Are You a Fertility Specialist in New York City?</h2>
          <p className="text-teal-100 text-sm mb-4">Claim your free listing and connect with patients actively searching for fertility care in NYC.</p>
          <Link href="/submit" className="inline-block bg-gold-400 hover:bg-gold-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
            Add Your Free Listing →
          </Link>
        </div>
      </div>
    </>
  )
}
