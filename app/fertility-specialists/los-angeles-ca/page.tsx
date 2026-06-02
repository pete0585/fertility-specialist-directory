import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Fertility Specialists in Los Angeles, CA — Find IVF Doctors Near You',
  description:
    'Find a fertility specialist or reproductive endocrinologist in Los Angeles, CA. Browse REI doctors, IVF clinics, and fertility-adjacent providers in the LA metro area.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/fertility-specialists/los-angeles-ca',
  },
  alternates: {
    canonical: '/fertility-specialists/los-angeles-ca',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many fertility specialists are in Los Angeles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los Angeles has one of the highest concentrations of reproductive endocrinologists in the US. The LA metro area is home to dozens of SART-member IVF clinics and board-certified REI specialists across neighborhoods like Westwood, Beverly Hills, Santa Monica, and Pasadena.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the average cost of IVF in Los Angeles?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A single IVF cycle in Los Angeles typically costs $15,000–$25,000 out of pocket, depending on the clinic and any additional procedures (PGT-A genetic testing, frozen embryo transfer). Some California health plans include fertility coverage under state law — ask your insurer whether IVF is covered before paying cash.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does California require insurance to cover IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "California's fertility insurance law (SB 600, effective 2025) requires large group health plans issued in California to cover infertility diagnosis and treatment, including IVF. Check whether your employer's plan is fully insured in California or self-insured (ERISA) — ERISA plans are exempt from state mandates.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find a fertility specialist who accepts my insurance in LA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the filter on our listings page to browse fertility specialists by insurance accepted. You can also call the clinic directly and ask for their billing department — many LA fertility clinics have dedicated financial counselors who can verify your benefits before your first appointment.',
      },
    },
  ],
}

export default async function LosAngelesFertilityPage() {
  const listings = await getListingsByCity('Los Angeles', 'CA', 30)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-teal-500 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" aria-label="" />
          <Link href="/listings" className="hover:text-teal-500 transition-colors">Fertility Specialists</Link>
          <ChevronRight className="w-4 h-4" aria-label="" />
          <span className="text-gray-900 font-medium">Los Angeles, CA</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Find a Fertility Specialist in Los Angeles, CA
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          Los Angeles has one of the largest concentrations of board-certified reproductive endocrinologists in the country. Browse {listings.length > 0 ? listings.length : 'dozens of'} fertility specialists, IVF clinics, and fertility-adjacent providers across the LA metro.
        </p>

        {/* Listings */}
        {listings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center mb-10">
            <p className="text-gray-500 mb-4">No listings found for Los Angeles, CA yet.</p>
            <Link href="/submit" className="inline-block px-6 py-2.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors text-sm">
              Add Your Practice →
            </Link>
          </div>
        )}

        {/* Browse more CTA */}
        <div className="text-center mb-10">
          <Link href="/listings?city=Los+Angeles&state=CA" className="inline-block px-6 py-2.5 border border-teal-500 text-teal-500 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm">
            View All LA Fertility Specialists →
          </Link>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
            Fertility Care in Los Angeles — Common Questions
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-gray-800">How many fertility specialists are in Los Angeles?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Los Angeles has one of the highest concentrations of reproductive endocrinologists in the US. The LA metro area is home to dozens of SART-member IVF clinics and board-certified REI specialists across neighborhoods like Westwood, Beverly Hills, Santa Monica, and Pasadena.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">What does IVF cost in Los Angeles?</h3>
              <p className="text-gray-600 text-sm mt-1">
                A single IVF cycle in LA typically runs $15,000–$25,000 out of pocket, depending on the clinic and additional procedures like PGT-A genetic testing. California law (SB 600) requires large group health plans issued in California to cover infertility treatment — check with your insurer before paying cash.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">How do I find a fertility specialist who accepts my insurance in LA?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Use the filter on our listings page to browse by insurance accepted. Many LA fertility clinics have financial counselors who can verify your benefits before your first appointment.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">What neighborhoods in LA have the most fertility clinics?</h3>
              <p className="text-gray-600 text-sm mt-1">
                The highest concentration of LA fertility specialists is in Westwood (near UCLA Medical Center), Beverly Hills, Santa Monica, and Pasadena. The South Bay and San Fernando Valley also have strong coverage.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-teal-500 text-white rounded-2xl p-6 text-center">
          <h2 className="font-serif text-xl font-bold mb-2">Are You a Fertility Specialist in Los Angeles?</h2>
          <p className="text-teal-100 text-sm mb-4">Claim your free listing and connect with patients actively searching for care in Los Angeles.</p>
          <Link href="/submit" className="inline-block bg-gold-400 hover:bg-gold-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
            Add Your Free Listing →
          </Link>
        </div>
      </div>
    </>
  )
}
