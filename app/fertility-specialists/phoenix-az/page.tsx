import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Fertility Specialists in Phoenix, AZ — Find IVF Doctors Near You',
  description:
    'Find a fertility specialist or reproductive endocrinologist in Phoenix, AZ. Arizona has no state IVF mandate — browse Banner Health, HonorHealth, and Scottsdale-area IVF clinics near you.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/fertility-specialists/phoenix-az',
  },
  alternates: {
    canonical: '/fertility-specialists/phoenix-az',
  },
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Arizona require insurance to cover IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "No. Arizona does not have a state IVF insurance mandate. Most Phoenix residents pay for IVF out of pocket unless their employer voluntarily offers fertility benefits. Some large employers headquartered in the Phoenix metro do provide fertility coverage — check your benefits portal or ask HR. Without coverage, a single IVF cycle in Phoenix typically costs $12,000–$18,000 including medications.",
      },
    },
    {
      '@type': 'Question',
      name: 'What are the main hospital systems with fertility programs in Phoenix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Banner Health and HonorHealth are the two largest hospital networks in the Phoenix metro. Both offer fertility-related OB-GYN services, and the Phoenix area has multiple independent SART-member IVF clinics affiliated with or operating near these systems. The East Valley (Scottsdale, Chandler, Gilbert, Mesa) has a strong cluster of reproductive endocrinology practices.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do Tucson patients travel to Phoenix for IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, many southern Arizona patients travel to Phoenix for fertility care. Tucson has limited IVF clinic options compared to the Phoenix metro, and the 1.5-2 hour drive is common for patients who need the broader specialist selection and clinic availability that Phoenix offers. Some Phoenix clinics accommodate long-distance patients with telehealth consultations and compressed monitoring schedules to minimize travel.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I pay for IVF in Phoenix without insurance coverage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Phoenix fertility clinics offer several payment options for self-pay patients: Shared Risk (or multi-cycle) programs that refund a portion of fees if IVF does not result in a live birth; medical financing through lenders like CapexMD or Prosper Healthcare Lending; HSA/FSA accounts that cover qualified fertility expenses; and payment plans offered directly by the clinic. Some clinics also offer mini-IVF protocols at lower cost with fewer medications.",
      },
    },
  ],
}

export default async function PhoenixFertilityPage() {
  const listings = await getListingsByCity('Phoenix', 'AZ', 30)

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
          <span className="text-gray-900 font-medium">Phoenix, AZ</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Find a Fertility Specialist in Phoenix, AZ
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          Phoenix is one of the fastest-growing metros in the US, and its fertility specialist community has expanded to match. Arizona has no state IVF insurance mandate, so most patients pay out of pocket or rely on employer benefits — but Phoenix clinics offer a wide range of pricing models and financing options.
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
            <p className="text-gray-500 mb-4">No listings found for Phoenix, AZ yet.</p>
            <Link href="/submit" className="inline-block px-6 py-2.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors text-sm">
              Add Your Practice →
            </Link>
          </div>
        )}

        {/* Browse more CTA */}
        <div className="text-center mb-10">
          <Link href="/listings?city=Phoenix&state=AZ" className="inline-block px-6 py-2.5 border border-teal-500 text-teal-500 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm">
            View All Phoenix Fertility Specialists →
          </Link>
        </div>

        {/* Cost info section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">
            IVF Costs in Phoenix Without Insurance
          </h2>
          <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
            <p>
              Because Arizona lacks a state IVF mandate, the majority of Phoenix patients are self-pay. Understanding what you&rsquo;re paying for helps you compare clinics accurately:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong>Base IVF cycle (egg retrieval + fresh transfer):</strong> $10,000–$15,000</li>
              <li><strong>Fertility medications:</strong> $3,000–$6,000 per cycle (not typically included in base price)</li>
              <li><strong>Frozen embryo transfer (FET):</strong> $3,000–$5,000 additional</li>
              <li><strong>PGT-A genetic testing:</strong> $3,000–$5,000 per biopsy session + $150–$300 per embryo tested</li>
              <li><strong>Embryo storage:</strong> $500–$1,000 per year</li>
            </ul>
            <p>
              <strong>Shared Risk programs</strong> offered by some Phoenix clinics bundle multiple cycles with a partial refund if treatment is unsuccessful — worth asking about if you anticipate needing more than one cycle.
            </p>
            <p>
              <strong>East Valley options:</strong> Scottsdale, Chandler, Gilbert, and Mesa have active fertility clinics serving the eastern Phoenix metro. Many offer similar pricing to central Phoenix locations.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
            Fertility Care in Phoenix — Common Questions
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
          <h2 className="font-serif text-xl font-bold mb-2">Are You a Fertility Specialist in Phoenix?</h2>
          <p className="text-teal-100 text-sm mb-4">Claim your free listing and connect with Arizona patients actively searching for fertility care.</p>
          <Link href="/submit" className="inline-block bg-white text-teal-600 font-semibold px-6 py-2.5 rounded-xl hover:bg-teal-50 transition-colors text-sm">
            Add Your Free Listing →
          </Link>
        </div>

        {/* Related Links */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4 text-sm">
          <Link href="/guides/ivf-cost-guide" className="text-teal-600 hover:text-teal-800 font-medium">IVF Cost Guide 2026 →</Link>
          <Link href="/fertility-specialists/dallas-tx" className="text-teal-600 hover:text-teal-800 font-medium">Fertility Specialists in Dallas, TX →</Link>
          <Link href="/guides/when-to-see-a-fertility-specialist" className="text-teal-600 hover:text-teal-800 font-medium">When to See a Fertility Specialist →</Link>
        </div>
      </div>
    </>
  )
}
