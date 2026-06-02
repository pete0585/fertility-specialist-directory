import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Fertility Specialists in Philadelphia, PA — Find IVF Doctors Near You',
  description:
    'Find a fertility specialist or reproductive endocrinologist in Philadelphia, PA. Browse REI doctors, IVF clinics, and fertility providers in Philadelphia and the surrounding suburbs.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/fertility-specialists/philadelphia-pa',
  },
  alternates: {
    canonical: '/fertility-specialists/philadelphia-pa',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What fertility clinics are in Philadelphia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Philadelphia is a major academic medical hub. Major fertility programs include Penn Medicine (HUP), Jefferson Health (Sidney Kimmel Medical College), and Temple University Hospital's REI division. Independent fertility practices also operate in Center City, King of Prussia, and Cherry Hill, NJ.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does Pennsylvania require insurance to cover IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pennsylvania does not have a fertility insurance mandate. Patients in Philly typically pay out of pocket or through employer benefits. Many large Philadelphia-area employers (pharma, healthcare, finance) voluntarily offer fertility coverage — check with your HR department.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does IVF cost in Philadelphia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IVF in Philadelphia typically costs $12,000–$20,000 per cycle, with medications adding $3,000–$6,000. Prices are generally lower than in New York City but comparable to other mid-Atlantic markets.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there fertility specialists in the Philadelphia suburbs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Many Philadelphia area fertility specialists have satellite offices in King of Prussia, Bryn Mawr, Cherry Hill (NJ), and Wilmington (DE). If you live outside Center City, searching nearby suburb pages can help you find closer providers.',
      },
    },
  ],
}

export default async function PhiladelphiaFertilityPage() {
  const listings = await getListingsByCity('Philadelphia', 'PA', 30)

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
          <span className="text-gray-900 font-medium">Philadelphia, PA</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Find a Fertility Specialist in Philadelphia, PA
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          Philadelphia is home to major academic fertility programs at Penn Medicine, Jefferson Health, and Temple University. Browse reproductive endocrinologists and fertility clinics in Philly and the surrounding Main Line suburbs.
        </p>

        {listings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center mb-10">
            <p className="text-gray-500 mb-4">No listings found for Philadelphia, PA yet.</p>
            <Link href="/submit" className="inline-block px-6 py-2.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors text-sm">
              Add Your Practice →
            </Link>
          </div>
        )}

        <div className="text-center mb-10">
          <Link href="/listings?city=Philadelphia&state=PA" className="inline-block px-6 py-2.5 border border-teal-500 text-teal-500 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm">
            View All Philadelphia Fertility Specialists →
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
            Fertility Care in Philadelphia — Common Questions
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-gray-800">Which academic hospitals have fertility programs in Philadelphia?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Penn Medicine (HUP), Jefferson Health, and Temple University Hospital all have established REI programs with board-certified specialists. Academic programs often provide access to clinical trials and newer protocols.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Does Pennsylvania require fertility insurance coverage?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Pennsylvania has no fertility insurance mandate. Most patients pay out of pocket or through employer benefits. Large pharma, healthcare, and financial services employers in the Philadelphia area often provide voluntary fertility benefits.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Are there fertility specialists outside Center City?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Yes. Many Philadelphia area fertility specialists operate satellite offices in King of Prussia, Bryn Mawr, Cherry Hill (NJ), and Wilmington (DE) for patients in the suburbs and tri-state area.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-teal-500 text-white rounded-2xl p-6 text-center">
          <h2 className="font-serif text-xl font-bold mb-2">Are You a Fertility Specialist in Philadelphia?</h2>
          <p className="text-teal-100 text-sm mb-4">Claim your free listing and connect with patients searching for fertility care in Philly and the Main Line.</p>
          <Link href="/submit" className="inline-block bg-gold-400 hover:bg-gold-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
            Add Your Free Listing →
          </Link>
        </div>
      </div>
    </>
  )
}
