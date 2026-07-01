import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Fertility Specialists in San Francisco, CA — Find IVF Doctors Near You',
  description:
    'Find a fertility specialist or reproductive endocrinologist in San Francisco, CA. Browse REI doctors, IVF clinics, and fertility providers serving the Bay Area — including UCSF and Stanford-affiliated programs.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/fertility-specialists/san-francisco-ca',
  },
  alternates: {
    canonical: '/fertility-specialists/san-francisco-ca',
  },
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does California require insurance to cover IVF in San Francisco?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. California SB 600 (effective 2025) requires most large group health plans issued in California to cover infertility diagnosis and treatment, including IVF. San Francisco employers — including major tech companies like Apple, Google, and Meta — often provide supplemental fertility benefits on top of the state mandate. Check whether your employer plan is fully insured in California or self-insured (ERISA); ERISA plans are exempt from state mandates.",
      },
    },
    {
      '@type': 'Question',
      name: 'What fertility clinics are affiliated with UCSF and Stanford in San Francisco?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'UCSF Health operates one of the top academic fertility programs in the country through its Center for Reproductive Health, offering IVF, egg freezing, donor egg cycles, and fertility preservation for cancer patients. Stanford Health Care\'s reproductive endocrinology program serves the South Bay and Peninsula. Both are SART-member programs with publicly reported IVF success rates.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is egg freezing common in San Francisco?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "San Francisco has one of the highest rates of elective egg freezing in the US, driven by a tech workforce that often delays family building and by employer benefits from companies like Apple and Google that cover egg freezing cycles. Many SF fertility clinics have dedicated egg freezing programs with streamlined timelines for busy professionals.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do San Francisco fertility specialists treat LGBTQ+ patients?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LGBTQ+ family building is mainstream in San Francisco, and virtually all Bay Area fertility clinics have extensive experience with same-sex couples and single-by-choice patients. Services include reciprocal IVF (where one partner provides eggs and the other carries), known and anonymous donor sperm programs, and gestational surrogacy coordination.',
      },
    },
  ],
}

export default async function SanFranciscoFertilityPage() {
  const listings = await getListingsByCity('San Francisco', 'CA', 30)

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
          <span className="text-gray-900 font-medium">San Francisco, CA</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Find a Fertility Specialist in San Francisco, CA
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          San Francisco and the broader Bay Area are home to world-class fertility programs at UCSF and Stanford, alongside boutique IVF clinics serving tech workers, LGBTQ+ families, and patients who want both clinical excellence and a personalized experience.
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
            <p className="text-gray-500 mb-4">No listings found for San Francisco, CA yet.</p>
            <Link href="/submit" className="inline-block px-6 py-2.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors text-sm">
              Add Your Practice →
            </Link>
          </div>
        )}

        {/* Browse more CTA */}
        <div className="text-center mb-10">
          <Link href="/listings?city=San+Francisco&state=CA" className="inline-block px-6 py-2.5 border border-teal-500 text-teal-500 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm">
            View All SF Bay Area Fertility Specialists →
          </Link>
        </div>

        {/* Why SF section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">
            Fertility Care in San Francisco: What Makes the Bay Area Different
          </h2>
          <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
            <p>
              <strong>California IVF mandate (SB 600):</strong> As of 2025, California requires most large group health plans to cover infertility treatment, including IVF. For San Francisco residents working at mid-to-large employers, this means meaningful insurance coverage — though self-insured ERISA plans (common at large tech firms) are exempt and rely instead on voluntary employer benefits.
            </p>
            <p>
              <strong>Tech employer fertility benefits:</strong> Apple, Google, Meta, Salesforce, and dozens of other Bay Area employers offer fertility benefits that can cover egg freezing cycles, IVF cycles, and medication costs — sometimes up to $50,000 in lifetime benefits. This has driven significant patient volume into SF-area clinics.
            </p>
            <p>
              <strong>LGBTQ+ family building:</strong> San Francisco has one of the highest rates of same-sex family formation in the country. Bay Area fertility clinics are experienced with reciprocal IVF, known-donor insemination, gestational surrogacy, and all configurations of family building.
            </p>
            <p>
              <strong>Academic programs:</strong> UCSF and Stanford offer fertility care backed by active research programs — including access to clinical trials, cutting-edge embryology techniques like time-lapse imaging, and subspecialists for complex cases such as fertility preservation for cancer patients.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
            Fertility Care in San Francisco — Common Questions
          </h2>
          <div className="space-y-5">
            {faqSchema.mainEntity.map((item) => (
              <div key={item.name}>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-teal-500 text-white rounded-2xl p-6 text-center">
          <h2 className="font-serif text-xl font-bold mb-2">Are You a Fertility Specialist in San Francisco?</h2>
          <p className="text-teal-100 text-sm mb-4">Claim your free listing and connect with Bay Area patients actively searching for care.</p>
          <Link href="/submit" className="inline-block bg-white text-teal-600 font-semibold px-6 py-2.5 rounded-xl hover:bg-teal-50 transition-colors text-sm">
            Add Your Free Listing →
          </Link>
        </div>

        {/* Related Links */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4 text-sm">
          <Link href="/fertility-specialists/los-angeles-ca" className="text-teal-600 hover:text-teal-800 font-medium">Fertility Specialists in Los Angeles, CA →</Link>
          <Link href="/states/california" className="text-teal-600 hover:text-teal-800 font-medium">All California Fertility Specialists →</Link>
          <Link href="/guides/how-to-choose-a-fertility-specialist" className="text-teal-600 hover:text-teal-800 font-medium">How to Choose a Fertility Specialist →</Link>
        </div>
      </div>
    </>
  )
}
