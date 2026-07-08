import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Fertility Specialists in San Diego, CA — Find IVF Doctors Near You',
  description:
    'Find a fertility specialist or reproductive endocrinologist in San Diego, CA. Browse board-certified REI doctors, IVF clinics, and fertility providers across the San Diego metro.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/fertility-specialists/san-diego-ca',
  },
  alternates: {
    canonical: '/fertility-specialists/san-diego-ca',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does California require insurance to cover IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'California law requires fully insured plans to cover infertility diagnosis. Coverage for IVF itself depends on your specific plan — many large California employer plans voluntarily include IVF coverage. Self-insured ERISA plans are exempt from state mandates. Contact your insurer directly to confirm IVF benefits before planning treatment.',
      },
    },
    {
      '@type': 'Question',
      name: 'What fertility clinics are in San Diego?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'UCSD Health Reproductive Medicine has an established REI program in La Jolla. Independent fertility clinics and REI practices are distributed across the metro — Scripps Health and Sharp HealthCare also provide some fertility services. The San Diego fertility market has grown alongside the city\'s biotech sector, attracting specialists from major academic programs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does IVF cost in San Diego?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IVF in San Diego typically costs $14,000–$22,000 per cycle, slightly higher than the national average due to California\'s cost of living. Medication costs add $3,000–$6,000 per cycle. If your insurance covers IVF, your out-of-pocket costs depend on your specific plan. Many San Diego fertility clinics offer financing programs and multi-cycle discount packages.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find a fertility specialist in San Diego?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use this directory to search fertility specialists in San Diego by location, insurance accepted, and specialty. Consider whether you want a hospital-affiliated academic program like UCSD or a private independent practice — both have advantages depending on your situation and timeline.',
      },
    },
  ],
}

export default async function SanDiegoCaFertilityPage() {
  const listings = await getListingsByCity('San Diego', 'CA', 30)

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
          <Link href="/listings?state=CA" className="hover:text-teal-500 transition-colors">California</Link>
          <ChevronRight className="w-4 h-4" aria-label="" />
          <span className="text-gray-900 font-medium">San Diego, CA</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Find a Fertility Specialist in San Diego, CA
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          California requires most fully-insured plans to cover infertility diagnosis and some treatment. San Diego has a growing fertility clinic market anchored by UCSD Health's Reproductive Medicine division and independent REI practices throughout the metro.
        </p>

        {listings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center mb-10">
            <p className="text-gray-500 mb-4">No listings found for San Diego, CA yet.</p>
            <Link href="/submit" className="inline-block px-6 py-2.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors text-sm">
              Add Your Practice &#x2192;
            </Link>
          </div>
        )}

        <div className="text-center mb-10">
          <Link href="/listings?state=CA" className="inline-block px-6 py-2.5 border border-teal-500 text-teal-500 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm">
            Browse all California fertility specialists &#x2192;
          </Link>
        </div>

        <section className="mt-8 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-6">
            Fertility Specialists Near San Diego
          </h2>
          <div className="flex flex-wrap gap-2">
            {[{ href: '/fertility-specialists/la-jolla-ca', label: 'La Jolla, CA' }, { href: '/fertility-specialists/chula-vista-ca', label: 'Chula Vista, CA' }, { href: '/fertility-specialists/el-cajon-ca', label: 'El Cajon, CA' }, { href: '/fertility-specialists/escondido-ca', label: 'Escondido, CA' }].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium border border-teal-200 rounded-full px-3 py-1.5 hover:bg-teal-50 transition-colors"
              >
                {c.label}
              </Link>
            ))}
            <Link href="/listings?state=CA" className="text-sm text-teal-600 hover:text-teal-700 font-medium border border-teal-200 rounded-full px-3 py-1.5 hover:bg-teal-50 transition-colors">
              All California Providers &#x2192;
            </Link>
          </div>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-4">
            Fertility Care in San Diego: Common Questions
          </h2>
          {faqSchema.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>

        <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Are you a fertility specialist in San Diego?</h2>
          <p className="text-teal-100 text-sm mb-5 max-w-lg mx-auto">
            Add your practice to the directory and reach patients actively searching for REI care in San Diego and California.
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
