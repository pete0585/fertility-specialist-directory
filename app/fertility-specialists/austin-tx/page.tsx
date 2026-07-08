import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Fertility Specialists in Austin, TX — Find IVF Doctors Near You',
  description:
    'Find a fertility specialist or reproductive endocrinologist in Austin, TX. Browse board-certified REI doctors and IVF clinics across the Austin metro and surrounding suburbs.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/fertility-specialists/austin-tx',
  },
  alternates: {
    canonical: '/fertility-specialists/austin-tx',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Texas require insurance to cover IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Texas does not mandate insurance coverage for IVF or fertility treatments. Most Austin fertility treatment is cash-pay or covered by employer-offered fertility benefits (common among Austin\'s tech employers). If you work for a large tech company in Austin, check your HR benefits — many tech employers offer $15,000–$50,000+ in lifetime fertility coverage regardless of state law.',
      },
    },
    {
      '@type': 'Question',
      name: 'What fertility clinics are in Austin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Austin has several well-established fertility clinics including UT Health Austin (University of Texas at Austin\'s clinical affiliate) and a number of independent REI practices and national chains that have expanded into the metro. The Domain, South Congress, and Round Rock areas have concentrations of fertility practices serving the greater metro.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does IVF cost in Austin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IVF in Austin typically runs $12,000–$18,000 per cycle. Because Texas has no insurance mandate, Austin has a more competitive cash-pay fertility market than states with mandates, and some clinics offer more transparent package pricing. Medication costs add $3,000–$6,000. Tech company employees should check for employer fertility benefits before assuming they\'ll pay out of pocket.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find a fertility specialist in Austin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Search this directory by specialty and location. If you work for a major Austin employer (Apple, Dell, Oracle, Tesla), check your fertility benefits first — many cover IVF through Carrot or Progyny benefit platforms, which come with vetted clinic networks. If you\'re cash-pay, compare clinic pricing and cycle packages across Austin practices.',
      },
    },
  ],
}

export default async function AustinTxFertilityPage() {
  const listings = await getListingsByCity('Austin', 'TX', 30)

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
          <Link href="/listings?state=TX" className="hover:text-teal-500 transition-colors">Texas</Link>
          <ChevronRight className="w-4 h-4" aria-label="" />
          <span className="text-gray-900 font-medium">Austin, TX</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Find a Fertility Specialist in Austin, TX
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          Texas does not mandate fertility insurance coverage, making Austin one of the larger cash-pay fertility markets in the country. The city's tech-heavy, high-income population has driven strong demand for private fertility clinics — several regional and national chains have opened Austin locations.
        </p>

        {listings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center mb-10">
            <p className="text-gray-500 mb-4">No listings found for Austin, TX yet.</p>
            <Link href="/submit" className="inline-block px-6 py-2.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors text-sm">
              Add Your Practice &#x2192;
            </Link>
          </div>
        )}

        <div className="text-center mb-10">
          <Link href="/listings?state=TX" className="inline-block px-6 py-2.5 border border-teal-500 text-teal-500 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm">
            Browse all Texas fertility specialists &#x2192;
          </Link>
        </div>

        <section className="mt-8 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-6">
            Fertility Specialists Near Austin
          </h2>
          <div className="flex flex-wrap gap-2">
            {[{ href: '/fertility-specialists/round-rock-tx', label: 'Round Rock, TX' }, { href: '/fertility-specialists/cedar-park-tx', label: 'Cedar Park, TX' }, { href: '/fertility-specialists/georgetown-tx', label: 'Georgetown, TX' }, { href: '/fertility-specialists/pflugerville-tx', label: 'Pflugerville, TX' }].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium border border-teal-200 rounded-full px-3 py-1.5 hover:bg-teal-50 transition-colors"
              >
                {c.label}
              </Link>
            ))}
            <Link href="/listings?state=TX" className="text-sm text-teal-600 hover:text-teal-700 font-medium border border-teal-200 rounded-full px-3 py-1.5 hover:bg-teal-50 transition-colors">
              All Texas Providers &#x2192;
            </Link>
          </div>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-4">
            Fertility Care in Austin: Common Questions
          </h2>
          {faqSchema.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>

        <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Are you a fertility specialist in Austin?</h2>
          <p className="text-teal-100 text-sm mb-5 max-w-lg mx-auto">
            Add your practice to the directory and reach patients actively searching for REI care in Austin and Texas.
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 bg-white text-teal-600 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-teal-50 transition-colors"
          >
            Add Your Practice &#x2192;
          </Link>
        </div>
      </div>
    </>
  )
}
