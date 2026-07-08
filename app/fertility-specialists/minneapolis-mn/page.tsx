import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Fertility Specialists in Minneapolis, MN — Find IVF Doctors Near You',
  description:
    'Find a fertility specialist or reproductive endocrinologist in Minneapolis, MN. Browse board-certified REI doctors and IVF clinics across the Twin Cities metro.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/fertility-specialists/minneapolis-mn',
  },
  alternates: {
    canonical: '/fertility-specialists/minneapolis-mn',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does Minnesota require insurance to cover IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Minnesota does not currently mandate IVF coverage. Fertility treatment coverage depends on your specific insurance plan. Many Minnesota employers offer fertility benefits voluntarily — Blue Cross Blue Shield of Minnesota, HealthPartners, and Medica plans may include some fertility coverage. Review your plan documents or call your insurer\'s member services line to understand what\'s covered.',
      },
    },
    {
      '@type': 'Question',
      name: 'What fertility clinics are in Minneapolis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Minneapolis has established fertility programs at M Health Fairview (University of Minnesota) and Reproductive Medicine & Infertility Associates (RMIA), one of the Twin Cities\' long-standing independent practices. HealthPartners and Park Nicollet have reproductive health services. Rochester-based Mayo Clinic is 85 miles away and sees complex cases from across the region.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does IVF cost in Minneapolis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IVF in Minneapolis typically costs $12,000–$18,000 per cycle, similar to national averages. Minnesota\'s cost of living is more moderate than coastal metros, and some Twin Cities fertility practices offer package pricing for multiple cycles. Medication adds $3,000–$6,000 per cycle. If you\'re covered under an employer plan, verify benefits before committing to a treatment plan.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find a fertility specialist in Minneapolis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Search this directory for REI specialists in the Twin Cities. If you have a complex diagnosis or have not succeeded with initial treatments, M Health Fairview\'s academic program has subspecialty expertise. For straightforward IUI or first-cycle IVF, independent REI practices often have shorter wait times and more personalized care.',
      },
    },
  ],
}

export default async function MinneapolisMnFertilityPage() {
  const listings = await getListingsByCity('Minneapolis', 'MN', 30)

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
          <Link href="/listings?state=MN" className="hover:text-teal-500 transition-colors">Minnesota</Link>
          <ChevronRight className="w-4 h-4" aria-label="" />
          <span className="text-gray-900 font-medium">Minneapolis, MN</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Find a Fertility Specialist in Minneapolis, MN
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          Minnesota does not mandate comprehensive IVF coverage, but the Twin Cities is home to nationally recognized fertility programs at the University of Minnesota (M Health Fairview) and Mayo Clinic's infertility services 85 miles south in Rochester. HealthPartners and Allina Health also provide reproductive health services across the metro.
        </p>

        {listings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center mb-10">
            <p className="text-gray-500 mb-4">No listings found for Minneapolis, MN yet.</p>
            <Link href="/submit" className="inline-block px-6 py-2.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors text-sm">
              Add Your Practice &#x2192;
            </Link>
          </div>
        )}

        <div className="text-center mb-10">
          <Link href="/listings?state=MN" className="inline-block px-6 py-2.5 border border-teal-500 text-teal-500 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm">
            Browse all Minnesota fertility specialists &#x2192;
          </Link>
        </div>

        <section className="mt-8 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-6">
            Fertility Specialists Near Minneapolis
          </h2>
          <div className="flex flex-wrap gap-2">
            {[{ href: '/fertility-specialists/saint-paul-mn', label: 'Saint Paul, MN' }, { href: '/fertility-specialists/edina-mn', label: 'Edina, MN' }, { href: '/fertility-specialists/minnetonka-mn', label: 'Minnetonka, MN' }, { href: '/fertility-specialists/plymouth-mn', label: 'Plymouth, MN' }].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="text-sm text-teal-600 hover:text-teal-700 font-medium border border-teal-200 rounded-full px-3 py-1.5 hover:bg-teal-50 transition-colors"
              >
                {c.label}
              </Link>
            ))}
            <Link href="/listings?state=MN" className="text-sm text-teal-600 hover:text-teal-700 font-medium border border-teal-200 rounded-full px-3 py-1.5 hover:bg-teal-50 transition-colors">
              All Minnesota Providers &#x2192;
            </Link>
          </div>
        </section>

        <section className="space-y-4 mb-12">
          <h2 className="font-serif text-2xl font-semibold text-gray-800 mb-4">
            Fertility Care in Minneapolis: Common Questions
          </h2>
          {faqSchema.mainEntity.map((faq) => (
            <div key={faq.name} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-serif font-semibold text-gray-800 mb-2">{faq.name}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.acceptedAnswer.text}</p>
            </div>
          ))}
        </section>

        <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Are you a fertility specialist in Minneapolis?</h2>
          <p className="text-teal-100 text-sm mb-5 max-w-lg mx-auto">
            Add your practice to the directory and reach patients actively searching for REI care in Minneapolis and Minnesota.
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
