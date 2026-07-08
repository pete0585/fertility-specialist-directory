import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Fertility Specialists in Charlotte, NC — Find IVF Doctors Near You',
  description:
    'Find a fertility specialist or reproductive endocrinologist in Charlotte, NC. Browse board-certified REI doctors and IVF clinics across the Charlotte metro and surrounding Carolinas region.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/fertility-specialists/charlotte-nc',
  },
  alternates: {
    canonical: '/fertility-specialists/charlotte-nc',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does North Carolina require insurance to cover IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. North Carolina does not mandate insurance coverage for IVF. Coverage for Charlotte residents depends entirely on your employer\'s health plan. Large Charlotte employers in banking (Bank of America, Wells Fargo headquarters) and healthcare often include fertility benefits. Check your employee benefits portal or HR team before assuming cash pay is your only option.',
      },
    },
    {
      '@type': 'Question',
      name: 'What fertility clinics are in Charlotte?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Charlotte has established REI practices including Carolina Fertility Institute and regional branches of national fertility networks. Atrium Health (formerly Carolinas HealthCare) provides reproductive medicine services through the Levine Cancer Institute\'s women\'s health programs. The south Charlotte and Ballantyne corridor has seen several new fertility clinic openings.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does IVF cost in Charlotte?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IVF in Charlotte typically costs $12,000–$18,000 per cycle, roughly in line with national averages. Medication adds $3,000–$6,000 per cycle. Charlotte\'s cost of living relative to coastal markets means fertility care here is somewhat more affordable than New York or California. Many Charlotte clinics offer multi-cycle packages and financing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find a fertility specialist in Charlotte?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use this directory to search Charlotte fertility specialists by specialty, insurance, and location. Consider whether your employer offers fertility benefits — many of Charlotte\'s major financial and healthcare employers do. If you\'re cash-pay, ask each clinic about package pricing and the likelihood of success given your diagnosis before committing to a treatment plan.',
      },
    },
  ],
}

export default async function CharlotteNcFertilityPage() {
  const listings = await getListingsByCity('Charlotte', 'NC', 30)

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
          <Link href="/listings?state=NC" className="hover:text-teal-500 transition-colors">North Carolina</Link>
          <ChevronRight className="w-4 h-4" aria-label="" />
          <span className="text-gray-900 font-medium">Charlotte, NC</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Find a Fertility Specialist in Charlotte, NC
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          North Carolina does not mandate fertility insurance coverage, but Charlotte's rapidly growing professional population has attracted national fertility clinic networks and experienced REI specialists. Atrium Health and Novant Health both have women's health programs in the metro.
        </p>

        {listings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center mb-10">
            <p className="text-gray-500 mb-4">No listings found for Charlotte, NC yet.</p>
            <Link href="/submit" className="inline-block px-6 py-2.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors text-sm">
              Add Your Practice &#x2192;
            </Link>
          </div>
        )}

        <div className="text-center mb-10">
          <Link href="/listings?state=NC" className="inline-block px-6 py-2.5 border border-teal-500 text-teal-500 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm">
            Browse all North Carolina fertility specialists &#x2192;
          </Link>
        </div>

        <section className="mt-8 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-6">
            Fertility Specialists Near Charlotte
          </h2>
          <div className="flex flex-wrap gap-2">
            {[{ href: '/fertility-specialists/ballantyne-nc', label: 'Ballantyne, NC' }, { href: '/fertility-specialists/concord-nc', label: 'Concord, NC' }, { href: '/fertility-specialists/gastonia-nc', label: 'Gastonia, NC' }, { href: '/fertility-specialists/rock-hill-sc-nc', label: 'Rock Hill, SC, NC' }].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium border border-teal-200 rounded-full px-3 py-1.5 hover:bg-teal-50 transition-colors"
              >
                {c.label}
              </Link>
            ))}
            <Link href="/listings?state=NC" className="text-sm text-teal-600 hover:text-teal-700 font-medium border border-teal-200 rounded-full px-3 py-1.5 hover:bg-teal-50 transition-colors">
              All North Carolina Providers &#x2192;
            </Link>
          </div>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-4">
            Fertility Care in Charlotte: Common Questions
          </h2>
          {faqSchema.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>

        <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Are you a fertility specialist in Charlotte?</h2>
          <p className="text-teal-100 text-sm mb-5 max-w-lg mx-auto">
            Add your practice to the directory and reach patients actively searching for REI care in Charlotte and North Carolina.
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
