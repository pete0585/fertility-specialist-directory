import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Fertility Specialists in Houston, TX — Find IVF Doctors Near You',
  description:
    'Find a fertility specialist or reproductive endocrinologist in Houston, TX. Browse board-certified REI doctors, IVF clinics, and fertility providers in the Houston metro area.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/fertility-specialists/houston-tx',
  },
  alternates: {
    canonical: '/fertility-specialists/houston-tx',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many fertility specialists are in Houston?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Houston has a large and growing fertility community centered around the Texas Medical Center, the largest medical complex in the world. The Houston metro includes board-certified reproductive endocrinologists, fertility clinics, and fertility-adjacent providers across the Heights, Galleria, Sugar Land, and The Woodlands areas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Texas have fertility insurance mandates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Texas does not require insurance to cover IVF. Most fertility care in Texas is paid out of pocket or through employer-sponsored fertility benefits. Some large Texas employers (particularly in energy and tech) offer fertility benefits through platforms like Progyny or Carrot Fertility — check with your HR department.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the cost of IVF in Houston?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IVF costs in Houston typically range from $12,000–$18,000 per cycle, with medications adding $3,000–$6,000. Houston tends to be less expensive than coastal markets. Many Houston clinics offer multi-cycle packages or financing through CapexMD or Prosper Healthcare Lending.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there SART-member fertility clinics in Houston?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Houston has multiple SART-member clinics that report IVF success rate data publicly. SART membership is a quality signal — members follow standardized lab protocols and publish outcomes by age group. You can view SART success rates at sartcorsonline.com.',
      },
    },
  ],
}

export default async function HoustonFertilityPage() {
  const listings = await getListingsByCity('Houston', 'TX', 30)

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
          <span className="text-gray-900 font-medium">Houston, TX</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Find a Fertility Specialist in Houston, TX
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          Houston is home to a major fertility care hub centered on the Texas Medical Center. Browse reproductive endocrinologists, IVF clinics, and fertility-adjacent providers across the greater Houston area.
        </p>

        {listings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center mb-10">
            <p className="text-gray-500 mb-4">No listings found for Houston, TX yet.</p>
            <Link href="/submit" className="inline-block px-6 py-2.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors text-sm">
              Add Your Practice →
            </Link>
          </div>
        )}

        <div className="text-center mb-10">
          <Link href="/listings?city=Houston&state=TX" className="inline-block px-6 py-2.5 border border-teal-500 text-teal-500 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm">
            View All Houston Fertility Specialists →
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
            Fertility Care in Houston — Common Questions
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-gray-800">Does Texas require insurance to cover IVF?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Texas has no IVF insurance mandate. Most fertility care is paid out of pocket or through employer-sponsored benefits. Large Houston employers in energy and tech sectors often offer fertility benefits through Progyny or Carrot — check with HR.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">What does IVF cost in Houston?</h3>
              <p className="text-gray-600 text-sm mt-1">
                IVF in Houston typically ranges from $12,000–$18,000 per cycle, plus $3,000–$6,000 for medications. Many Houston clinics offer multi-cycle packages and financing through CapexMD or Prosper Healthcare Lending.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Are there SART-member fertility clinics in Houston?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Yes. Houston has multiple SART-member clinics that publish IVF success rates publicly. SART membership means standardized lab protocols and transparent outcomes by age group. View success rates at sartcorsonline.com.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Where are fertility clinics located in Houston?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Most Houston fertility specialists are concentrated around the Texas Medical Center (Medical Center/Museum District), the Galleria/Uptown area, Sugar Land, and The Woodlands in the north suburbs.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-teal-500 text-white rounded-2xl p-6 text-center">
          <h2 className="font-serif text-xl font-bold mb-2">Are You a Fertility Specialist in Houston?</h2>
          <p className="text-teal-100 text-sm mb-4">Claim your free listing and connect with patients searching for fertility care in the Houston metro.</p>
          <Link href="/submit" className="inline-block bg-gold-400 hover:bg-gold-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
            Add Your Free Listing →
          </Link>
        </div>
      </div>
    </>
  )
}
