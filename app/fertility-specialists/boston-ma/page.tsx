import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Fertility Specialists in Boston, MA — Find IVF Doctors Near You',
  description:
    'Find a fertility specialist or reproductive endocrinologist in Boston, MA. Browse REI doctors at Harvard, BU, and Tufts medical centers plus independent fertility clinics in the Greater Boston area.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/fertility-specialists/boston-ma',
  },
  alternates: {
    canonical: '/fertility-specialists/boston-ma',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What fertility clinics are in Boston?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Boston is one of the world's leading medical research hubs with exceptional fertility programs. Major programs include Brigham and Women's Hospital (Harvard), Massachusetts General Hospital (Harvard), Beth Israel Deaconess Medical Center, and Boston IVF, which is among the largest private fertility practices in the US.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does Massachusetts require insurance to cover IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Massachusetts has one of the most comprehensive fertility insurance mandates in the US. The state requires most employers to cover IVF, IUI, egg freezing, and other ART treatments. If you're employed in Massachusetts, there's a strong chance IVF is covered under your plan.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does IVF cost in Boston?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Because of Massachusetts' insurance mandate, many Boston patients pay little or nothing for IVF out of pocket. Cash-pay costs run $15,000–$25,000 per cycle. If you're unsure whether your plan covers IVF, call your insurer or ask the clinic's billing team.",
      },
    },
    {
      '@type': 'Question',
      name: 'Are there fertility specialists outside of downtown Boston?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Boston IVF and other large practices have satellite locations in Waltham, Newton, Quincy, and throughout the Greater Boston area. Harvard-affiliated practices also see patients at suburban locations for monitoring appointments during IVF cycles.",
      },
    },
  ],
}

export default async function BostonFertilityPage() {
  const listings = await getListingsByCity('Boston', 'MA', 30)

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
          <span className="text-gray-900 font-medium">Boston, MA</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Find a Fertility Specialist in Boston, MA
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          Boston is one of the world&rsquo;s top medical research cities, home to Harvard, BU, and Tufts fertility programs. Massachusetts also has one of the strongest IVF insurance mandates in the US, meaning most patients here have coverage.
        </p>

        {listings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center mb-10">
            <p className="text-gray-500 mb-4">No listings found for Boston, MA yet.</p>
            <Link href="/submit" className="inline-block px-6 py-2.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors text-sm">
              Add Your Practice →
            </Link>
          </div>
        )}

        <div className="text-center mb-10">
          <Link href="/listings?city=Boston&state=MA" className="inline-block px-6 py-2.5 border border-teal-500 text-teal-500 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm">
            View All Boston Fertility Specialists →
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
            Fertility Care in Boston — Common Questions
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-gray-800">Does Massachusetts require insurance to cover IVF?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Yes. Massachusetts has one of the most comprehensive fertility insurance mandates in the US — most employer plans cover IVF, IUI, and egg freezing. If you are employed in Massachusetts, there is a strong chance IVF is covered under your plan.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Which Boston hospitals have top fertility programs?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Brigham and Women&rsquo;s Hospital (Harvard), Massachusetts General Hospital (Harvard), and Beth Israel Deaconess Medical Center all have world-class academic REI programs. Boston IVF is one of the largest private fertility practices in the US with multiple Greater Boston locations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Are there fertility clinics outside of downtown Boston?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Yes. Boston IVF and other practices have satellite offices in Waltham, Newton, Quincy, and the North Shore. Many patients do monitoring appointments at suburban locations to reduce commute during IVF cycles.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-teal-500 text-white rounded-2xl p-6 text-center">
          <h2 className="font-serif text-xl font-bold mb-2">Are You a Fertility Specialist in Boston?</h2>
          <p className="text-teal-100 text-sm mb-4">Claim your free listing and connect with patients searching for fertility care across Greater Boston.</p>
          <Link href="/submit" className="inline-block bg-gold-400 hover:bg-gold-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
            Add Your Free Listing →
          </Link>
        </div>
      </div>
    </>
  )
}
