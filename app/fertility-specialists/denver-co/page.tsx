import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Fertility Specialists in Denver, CO — Find IVF Doctors Near You',
  description:
    'Find a fertility specialist or reproductive endocrinologist in Denver, CO. Colorado requires insurance to cover 3 IVF cycles — browse REI doctors and IVF clinics near Denver, UCHealth, and Centura Health.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/fertility-specialists/denver-co',
  },
  alternates: {
    canonical: '/fertility-specialists/denver-co',
  },
}

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Colorado require insurance to cover IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Colorado SB22-128 (effective for policies issued or renewed after January 1, 2023) requires health insurance plans to cover 3 IVF cycles per lifetime for covered individuals. The mandate applies to fully insured plans regulated by Colorado — self-insured ERISA employer plans are exempt. Denver residents should check their plan documents or call HR to confirm whether their plan is state-regulated.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does altitude affect IVF outcomes in Denver?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "No. Denver's high altitude (5,280 feet) does not affect IVF laboratory outcomes or embryo development. IVF laboratories maintain tightly controlled environments — temperature, CO2 levels, oxygen levels, and humidity are all regulated independently of the external atmosphere. Multiple SART-member clinics operate successfully at Denver altitude with success rates comparable to national benchmarks.",
      },
    },
    {
      '@type': 'Question',
      name: 'What are the main hospital-affiliated fertility programs in Denver?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'UCHealth operates Colorado Center for Reproductive Medicine (CCRM), one of the most recognized IVF programs in the country, headquartered in Lone Tree just south of Denver. Centura Health has fertility services through its network of Colorado hospitals. The University of Colorado has a reproductive endocrinology division through its academic medical center.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find a fertility specialist in the Denver metro area?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Denver's fertility specialist community has grown significantly as Colorado's population has expanded. Use our directory to filter by location, insurance accepted, and specialty. The Denver metro — including Aurora, Englewood, Lone Tree, Lakewood, and Boulder — has multiple SART-member IVF programs within a short drive.",
      },
    },
  ],
}

export default async function DenverFertilityPage() {
  const listings = await getListingsByCity('Denver', 'CO', 30)

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
          <span className="text-gray-900 font-medium">Denver, CO</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Find a Fertility Specialist in Denver, CO
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          Denver is home to some of the country&rsquo;s leading fertility programs, including Colorado Center for Reproductive Medicine (CCRM). Colorado&rsquo;s IVF insurance mandate means most state-regulated health plans must cover 3 cycles — making Denver one of the more accessible markets for fertility treatment.
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
            <p className="text-gray-500 mb-4">No listings found for Denver, CO yet.</p>
            <Link href="/submit" className="inline-block px-6 py-2.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors text-sm">
              Add Your Practice →
            </Link>
          </div>
        )}

        {/* Browse more CTA */}
        <div className="text-center mb-10">
          <Link href="/listings?city=Denver&state=CO" className="inline-block px-6 py-2.5 border border-teal-500 text-teal-500 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm">
            View All Denver Fertility Specialists →
          </Link>
        </div>

        {/* Colorado IVF mandate info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">
            Colorado&rsquo;s IVF Insurance Mandate: What Denver Patients Need to Know
          </h2>
          <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
            <p>
              <strong>SB22-128 coverage:</strong> Colorado requires fully insured health plans to cover 3 complete IVF cycles (egg retrieval + embryo transfer) per covered individual. The mandate also covers diagnostic testing and certain fertility preservation services for medically indicated cases.
            </p>
            <p>
              <strong>Who is covered:</strong> The mandate applies to health insurance policies issued or renewed after January 1, 2023, regulated under Colorado state law. Self-insured employer plans (ERISA) are exempt — large employers who self-fund their health benefits are not required to comply.
            </p>
            <p>
              <strong>What to ask your HR team:</strong> Request your Summary Plan Description (SPD) and ask specifically whether your plan is &ldquo;fully insured in Colorado&rdquo; or &ldquo;self-insured under ERISA.&rdquo; This one question determines whether Colorado&rsquo;s IVF mandate applies to you.
            </p>
            <p>
              <strong>CCRM and national reputation:</strong> Colorado Center for Reproductive Medicine, based in Lone Tree south of Denver, is considered one of the top IVF programs nationally by success rate. The Denver metro&rsquo;s reputation in reproductive medicine draws patients from surrounding states with less favorable insurance landscapes.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
            Fertility Care in Denver — Common Questions
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
          <h2 className="font-serif text-xl font-bold mb-2">Are You a Fertility Specialist in Denver?</h2>
          <p className="text-teal-100 text-sm mb-4">Claim your free listing and connect with Colorado patients actively searching for care.</p>
          <Link href="/submit" className="inline-block bg-white text-teal-600 font-semibold px-6 py-2.5 rounded-xl hover:bg-teal-50 transition-colors text-sm">
            Add Your Free Listing →
          </Link>
        </div>

        {/* Related Links */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4 text-sm">
          <Link href="/fertility-specialists/phoenix-az" className="text-teal-600 hover:text-teal-800 font-medium">Fertility Specialists in Phoenix, AZ →</Link>
          <Link href="/fertility-specialists/seattle-wa" className="text-teal-600 hover:text-teal-800 font-medium">Fertility Specialists in Seattle, WA →</Link>
          <Link href="/guides/ivf-cost-guide" className="text-teal-600 hover:text-teal-800 font-medium">IVF Cost Guide 2026 →</Link>
        </div>
      </div>
    </>
  )
}
