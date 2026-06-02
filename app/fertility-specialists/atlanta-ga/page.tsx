import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Fertility Specialists in Atlanta, GA — Find IVF Doctors Near You',
  description:
    'Find a fertility specialist or reproductive endocrinologist in Atlanta, GA. Browse REI doctors, IVF clinics, and fertility providers across Atlanta and the metro area.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/fertility-specialists/atlanta-ga',
  },
  alternates: {
    canonical: '/fertility-specialists/atlanta-ga',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What fertility clinics are in Atlanta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Atlanta has a strong fertility care market including academic programs at Emory University Hospital and Morehouse School of Medicine, as well as independent fertility practices in Buckhead, Midtown, Sandy Springs, Alpharetta, and the Perimeter area.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Georgia require insurance to cover IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Georgia does not have a fertility insurance mandate. Most Atlanta patients pay out of pocket or through employer-sponsored benefits. Atlanta is home to many large employers (Delta, Coca-Cola, Home Depot, Aflac) that offer comprehensive health benefits, and some include fertility coverage.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does IVF cost in Atlanta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IVF in Atlanta typically costs $12,000–$18,000 per cycle, with medications adding $3,000–$6,000. Atlanta tends to be more affordable than coastal markets. Many clinics offer multi-cycle packages and financing through CapexMD or Prosper Healthcare Lending.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there fertility specialists in Atlanta suburbs like Alpharetta or Sandy Springs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Sandy Springs, Alpharetta, Marietta, and Duluth all have established fertility practices. Many Atlanta area REI specialists operate multiple office locations to serve patients throughout the metro and north Georgia suburbs.',
      },
    },
  ],
}

export default async function AtlantaFertilityPage() {
  const listings = await getListingsByCity('Atlanta', 'GA', 30)

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
          <span className="text-gray-900 font-medium">Atlanta, GA</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Find a Fertility Specialist in Atlanta, GA
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          Atlanta is the fertility care hub of the Southeast. Browse reproductive endocrinologists, IVF clinics, and fertility providers across Atlanta, Sandy Springs, Alpharetta, and the surrounding metro area.
        </p>

        {listings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center mb-10">
            <p className="text-gray-500 mb-4">No listings found for Atlanta, GA yet.</p>
            <Link href="/submit" className="inline-block px-6 py-2.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors text-sm">
              Add Your Practice →
            </Link>
          </div>
        )}

        <div className="text-center mb-10">
          <Link href="/listings?city=Atlanta&state=GA" className="inline-block px-6 py-2.5 border border-teal-500 text-teal-500 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm">
            View All Atlanta Fertility Specialists →
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
            Fertility Care in Atlanta — Common Questions
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-gray-800">Which hospitals have fertility programs in Atlanta?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Emory University Hospital and Morehouse School of Medicine both have REI programs. Independent fertility practices in Buckhead, Midtown, Sandy Springs, and Alpharetta serve the broader metro population.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Does Georgia require insurance to cover fertility treatment?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Georgia has no fertility insurance mandate. Most Atlanta patients pay out of pocket. Large Atlanta employers (Delta, Coca-Cola, Home Depot) often include fertility benefits — check with your HR department.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Are there fertility specialists in Atlanta&rsquo;s north suburbs?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Yes. Sandy Springs, Alpharetta, Marietta, and Duluth all have established fertility practices. Many Atlanta REI specialists have multiple office locations throughout the metro.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-teal-500 text-white rounded-2xl p-6 text-center">
          <h2 className="font-serif text-xl font-bold mb-2">Are You a Fertility Specialist in Atlanta?</h2>
          <p className="text-teal-100 text-sm mb-4">Claim your free listing and connect with patients searching for fertility care across the Atlanta metro.</p>
          <Link href="/submit" className="inline-block bg-gold-400 hover:bg-gold-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
            Add Your Free Listing →
          </Link>
        </div>
      </div>
    </>
  )
}
