import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Fertility Specialists in Portland, OR — Find IVF Doctors Near You',
  description:
    'Find a fertility specialist or reproductive endocrinologist in Portland, OR. Browse board-certified REI doctors and IVF clinics across the Portland metro and surrounding Pacific Northwest region.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/fertility-specialists/portland-or',
  },
  alternates: {
    canonical: '/fertility-specialists/portland-or',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Oregon require insurance to cover IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Oregon\'s fertility insurance mandate requires fully-insured plans to cover infertility diagnosis and some fertility treatment. The mandate has been expanded to include IVF coverage for qualifying plans. Self-insured ERISA plans are exempt. If you\'re on an Oregon-regulated plan, your IVF coverage may be more comprehensive than you expect — confirm with your insurer before planning treatment.',
      },
    },
    {
      '@type': 'Question',
      name: 'What fertility clinics are in Portland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'OHSU Fertility is the academic program at Oregon Health & Science University, with subspecialty expertise in complex cases, LGBTQ+ family building, and fertility preservation. Independent practices include Oregon Reproductive Medicine and several regional REI practices. The Portland and Beaverton/Hillsboro corridor has a cluster of fertility specialists serving Multnomah, Washington, and Clackamas counties.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does IVF cost in Portland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IVF in Portland typically costs $12,000–$20,000 per cycle. Because Oregon\'s insurance mandate covers many Portland residents, out-of-pocket costs can be significantly lower for those on qualifying plans. Medication costs add $3,000–$6,000 per cycle. Portland\'s cost of care is generally lower than San Francisco or Seattle, making it a destination for Pacific Northwest patients seeking treatment.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find a fertility specialist in Portland?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use this directory to search Portland REI specialists by insurance, specialty, and location. If you need complex care — recurrent pregnancy loss, difficult diagnoses, or fertility preservation — OHSU Fertility is the regional academic referral center. For straightforward IUI or IVF cycles, independent practices often have more scheduling flexibility.',
      },
    },
  ],
}

export default async function PortlandOrFertilityPage() {
  const listings = await getListingsByCity('Portland', 'OR', 30)

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
          <Link href="/listings?state=OR" className="hover:text-teal-500 transition-colors">Oregon</Link>
          <ChevronRight className="w-4 h-4" aria-label="" />
          <span className="text-gray-900 font-medium">Portland, OR</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Find a Fertility Specialist in Portland, OR
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          Oregon requires fully-insured plans to cover infertility diagnosis and certain fertility treatments, making it one of the stronger fertility insurance mandate states. Portland's OHSU (Oregon Health & Science University) has a nationally recognized reproductive endocrinology program, supplemented by strong independent REI practices across the metro.
        </p>

        {listings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center mb-10">
            <p className="text-gray-500 mb-4">No listings found for Portland, OR yet.</p>
            <Link href="/submit" className="inline-block px-6 py-2.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors text-sm">
              Add Your Practice &#x2192;
            </Link>
          </div>
        )}

        <div className="text-center mb-10">
          <Link href="/listings?state=OR" className="inline-block px-6 py-2.5 border border-teal-500 text-teal-500 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm">
            Browse all Oregon fertility specialists &#x2192;
          </Link>
        </div>

        <section className="mt-8 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-6">
            Fertility Specialists Near Portland
          </h2>
          <div className="flex flex-wrap gap-2">
            {[{ href: '/fertility-specialists/beaverton-or', label: 'Beaverton, OR' }, { href: '/fertility-specialists/lake-oswego-or', label: 'Lake Oswego, OR' }, { href: '/fertility-specialists/hillsboro-or', label: 'Hillsboro, OR' }, { href: '/fertility-specialists/vancouver-wa-or', label: 'Vancouver, WA, OR' }].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium border border-teal-200 rounded-full px-3 py-1.5 hover:bg-teal-50 transition-colors"
              >
                {c.label}
              </Link>
            ))}
            <Link href="/listings?state=OR" className="text-sm text-teal-600 hover:text-teal-700 font-medium border border-teal-200 rounded-full px-3 py-1.5 hover:bg-teal-50 transition-colors">
              All Oregon Providers &#x2192;
            </Link>
          </div>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-4">
            Fertility Care in Portland: Common Questions
          </h2>
          {faqSchema.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>

        <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Are you a fertility specialist in Portland?</h2>
          <p className="text-teal-100 text-sm mb-5 max-w-lg mx-auto">
            Add your practice to the directory and reach patients actively searching for REI care in Portland and Oregon.
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
