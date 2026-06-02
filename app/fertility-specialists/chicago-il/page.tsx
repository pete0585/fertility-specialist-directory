import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Fertility Specialists in Chicago, IL — Find IVF Doctors Near You',
  description:
    'Find a fertility specialist or reproductive endocrinologist in Chicago, IL. Browse board-certified REI doctors, IVF clinics, and fertility providers across the Chicago metro.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/fertility-specialists/chicago-il',
  },
  alternates: {
    canonical: '/fertility-specialists/chicago-il',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Illinois require insurance to cover IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Illinois has one of the strongest fertility insurance mandates in the US. Illinois law requires fully insured plans for employers with 25+ employees to cover IVF, IUI, egg freezing, and other ART treatments. Self-insured (ERISA) plans are exempt, but many large Illinois employers voluntarily include fertility benefits.',
      },
    },
    {
      '@type': 'Question',
      name: 'What fertility clinics are in Chicago?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Chicago has major academic fertility programs at Northwestern Medicine (REIA), University of Chicago Medicine, and Rush University Medical Center, as well as independent REI practices throughout the North Shore suburbs, Oak Park, Naperville, and Schaumburg.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does IVF cost in Chicago?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "IVF in Chicago typically costs $12,000–$20,000 per cycle. Because Illinois mandates fertility insurance coverage for qualifying plans, many patients pay little or nothing out of pocket. Check with your insurer before assuming you'll pay cash — your benefits may cover most of the cost.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find a fertility specialist near Chicago?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use this directory to browse fertility specialists in Chicago by specialty, insurance, and location. If you need care in the suburbs, search nearby cities like Evanston, Naperville, Schaumburg, or Oak Brook — many Chicago fertility specialists have satellite offices in the suburbs.',
      },
    },
  ],
}

export default async function ChicagoFertilityPage() {
  const listings = await getListingsByCity('Chicago', 'IL', 30)

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
          <span className="text-gray-900 font-medium">Chicago, IL</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Find a Fertility Specialist in Chicago, IL
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          Illinois has one of the strongest fertility insurance mandates in the country. Browse reproductive endocrinologists, IVF clinics, and fertility providers across Chicago and the surrounding suburbs.
        </p>

        {listings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center mb-10">
            <p className="text-gray-500 mb-4">No listings found for Chicago, IL yet.</p>
            <Link href="/submit" className="inline-block px-6 py-2.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors text-sm">
              Add Your Practice →
            </Link>
          </div>
        )}

        <div className="text-center mb-10">
          <Link href="/listings?city=Chicago&state=IL" className="inline-block px-6 py-2.5 border border-teal-500 text-teal-500 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm">
            View All Chicago Fertility Specialists →
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
            Fertility Care in Chicago — Common Questions
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-gray-800">Does Illinois require insurance to cover IVF?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Yes. Illinois has one of the strongest fertility insurance mandates in the US, requiring most fully insured plans (25+ employee companies) to cover IVF, IUI, and egg freezing. ERISA self-insured plans are exempt, but many large Illinois employers voluntarily include fertility benefits.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Which academic hospitals have fertility programs in Chicago?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Northwestern Medicine (REIA/Fertility and Reproductive Medicine), University of Chicago Medicine, and Rush University Medical Center all have established academic fertility programs with board-certified REI specialists.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">How much does IVF cost in Chicago?</h3>
              <p className="text-gray-600 text-sm mt-1">
                IVF in Chicago typically costs $12,000–$20,000 per cycle. Because of Illinois&rsquo; mandate, many patients with qualifying insurance pay little out of pocket. Verify your benefits before assuming cash pay.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-teal-500 text-white rounded-2xl p-6 text-center">
          <h2 className="font-serif text-xl font-bold mb-2">Are You a Fertility Specialist in Chicago?</h2>
          <p className="text-teal-100 text-sm mb-4">Claim your free listing and reach patients searching for fertility care across Chicago and the suburbs.</p>
          <Link href="/submit" className="inline-block bg-gold-400 hover:bg-gold-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
            Add Your Free Listing →
          </Link>
        </div>
      </div>
    </>
  )
}
