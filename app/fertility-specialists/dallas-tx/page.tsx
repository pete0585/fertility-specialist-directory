import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Fertility Specialists in Dallas, TX — Find IVF Doctors Near You',
  description:
    'Find a fertility specialist or reproductive endocrinologist in Dallas, TX. Browse REI doctors, IVF clinics, and fertility providers across Dallas and the DFW metroplex.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/fertility-specialists/dallas-tx',
  },
  alternates: {
    canonical: '/fertility-specialists/dallas-tx',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What fertility clinics are in Dallas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dallas has a well-developed fertility care network including academic programs at UT Southwestern Medical Center and Baylor University Medical Center, plus independent fertility practices throughout Uptown, Plano, Frisco, and Southlake. The DFW metroplex is one of the fastest-growing fertility markets in the country.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does IVF cost in Dallas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IVF in Dallas typically costs $12,000–$18,000 per cycle, comparable to Houston and generally more affordable than coastal markets. Medications add $3,000–$6,000. Texas has no IVF insurance mandate, so most Dallas patients pay out of pocket or through employer-sponsored fertility benefits.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there fertility specialists in the DFW suburbs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Plano, Frisco, Allen, McKinney, and Southlake all have established fertility practices. Many Dallas REI specialists run satellite offices in the northern suburbs to serve the rapidly growing Collin County population.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does employer insurance in Dallas cover IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Texas has no fertility insurance mandate, but the DFW area's large employer base (tech, finance, telecom) means many companies voluntarily offer fertility benefits through platforms like Progyny or Carrot Fertility. Check with your HR department before assuming you're paying cash.",
      },
    },
  ],
}

export default async function DallasFertilityPage() {
  const listings = await getListingsByCity('Dallas', 'TX', 30)

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
          <span className="text-gray-900 font-medium">Dallas, TX</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Find a Fertility Specialist in Dallas, TX
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          The DFW metroplex is one of the fastest-growing fertility markets in the US. Browse reproductive endocrinologists and IVF clinics across Dallas, Plano, Frisco, and the surrounding suburbs.
        </p>

        {listings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center mb-10">
            <p className="text-gray-500 mb-4">No listings found for Dallas, TX yet.</p>
            <Link href="/submit" className="inline-block px-6 py-2.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors text-sm">
              Add Your Practice →
            </Link>
          </div>
        )}

        <div className="text-center mb-10">
          <Link href="/listings?city=Dallas&state=TX" className="inline-block px-6 py-2.5 border border-teal-500 text-teal-500 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm">
            View All Dallas Fertility Specialists →
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
            Fertility Care in Dallas — Common Questions
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-gray-800">Which academic hospitals have fertility programs in Dallas?</h3>
              <p className="text-gray-600 text-sm mt-1">
                UT Southwestern Medical Center and Baylor University Medical Center both have established REI programs. UT Southwestern is a particularly strong choice for complex cases given its research focus and fellowship-trained specialists.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Are there fertility specialists in the DFW suburbs?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Yes. Plano, Frisco, Allen, McKinney, and Southlake all have established fertility practices. Many Dallas REI specialists operate satellite offices in northern Collin County suburbs.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Does employer insurance cover IVF in Dallas?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Texas has no IVF insurance mandate, but the DFW area&rsquo;s large tech, finance, and telecom employer base means many companies offer voluntary fertility benefits. Ask your HR department before assuming out-of-pocket costs.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-teal-500 text-white rounded-2xl p-6 text-center">
          <h2 className="font-serif text-xl font-bold mb-2">Are You a Fertility Specialist in Dallas?</h2>
          <p className="text-teal-100 text-sm mb-4">Claim your free listing and reach patients actively searching for IVF and fertility care across the DFW metroplex.</p>
          <Link href="/submit" className="inline-block bg-gold-400 hover:bg-gold-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
            Add Your Free Listing →
          </Link>
        </div>
      </div>
    </>
  )
}
