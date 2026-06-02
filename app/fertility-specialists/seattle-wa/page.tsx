import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ListingCard from '@/components/ListingCard'
import { getListingsByCity } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Fertility Specialists in Seattle, WA — Find IVF Doctors Near You',
  description:
    'Find a fertility specialist or reproductive endocrinologist in Seattle, WA. Browse REI doctors, IVF clinics, and fertility providers across Seattle, Bellevue, and the greater Puget Sound area.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/fertility-specialists/seattle-wa',
  },
  alternates: {
    canonical: '/fertility-specialists/seattle-wa',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What fertility clinics are in Seattle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Seattle has strong fertility programs at the University of Washington Medical Center and Swedish Medical Center. Pacific NW Fertility, Overlake Reproductive Health, and other independent practices serve patients throughout the Seattle metro, Bellevue, and the Eastside tech corridor.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Washington State require insurance to cover IVF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Washington State passed a fertility insurance mandate effective 2023 requiring most employers with 50+ employees to cover fertility treatment including IVF. If your employer's plan is fully insured in Washington and your company has 50+ employees, IVF coverage is likely required.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much does IVF cost in Seattle?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Seattle IVF costs typically range from $15,000–$22,000 per cycle, on par with other large West Coast markets. Washington's new insurance mandate means many Seattle tech and healthcare workers may have IVF covered. Medications add $3,000–$6,000.",
      },
    },
    {
      '@type': 'Question',
      name: 'Are there fertility specialists on the Eastside near Bellevue and Redmond?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. The Bellevue/Redmond/Kirkland Eastside tech corridor has strong demand for fertility care given the high concentration of Amazon, Microsoft, and tech sector employees. Several Seattle-based fertility practices have Eastside satellite offices to serve this patient population.",
      },
    },
  ],
}

export default async function SeattleFertilityPage() {
  const listings = await getListingsByCity('Seattle', 'WA', 30)

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
          <span className="text-gray-900 font-medium">Seattle, WA</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Find a Fertility Specialist in Seattle, WA
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-2xl">
          Seattle is the Pacific Northwest&rsquo;s fertility care hub, serving a large and growing population of tech professionals, healthcare workers, and families. Washington State also recently enacted a fertility insurance mandate that may cover your treatment.
        </p>

        {listings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {listings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center mb-10">
            <p className="text-gray-500 mb-4">No listings found for Seattle, WA yet.</p>
            <Link href="/submit" className="inline-block px-6 py-2.5 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors text-sm">
              Add Your Practice →
            </Link>
          </div>
        )}

        <div className="text-center mb-10">
          <Link href="/listings?city=Seattle&state=WA" className="inline-block px-6 py-2.5 border border-teal-500 text-teal-500 font-semibold rounded-xl hover:bg-teal-50 transition-colors text-sm">
            View All Seattle Fertility Specialists →
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
            Fertility Care in Seattle — Common Questions
          </h2>
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-gray-800">Does Washington State require IVF insurance coverage?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Yes. Washington State&rsquo;s fertility insurance mandate (effective 2023) requires most fully insured employers with 50+ employees to cover fertility treatment including IVF. Many Amazon, Microsoft, and other tech employer plans include IVF coverage.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Which Seattle hospitals have fertility programs?</h3>
              <p className="text-gray-600 text-sm mt-1">
                UW Medical Center and Swedish Medical Center both have REI programs. Pacific NW Fertility and Overlake Reproductive Health are leading independent practices serving the Seattle metro and Eastside.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Are there fertility specialists near Bellevue and Redmond?</h3>
              <p className="text-gray-600 text-sm mt-1">
                Yes. Several Seattle fertility practices have Eastside offices near Amazon and Microsoft campuses, serving the high demand from tech sector employees in Bellevue, Redmond, and Kirkland.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-teal-500 text-white rounded-2xl p-6 text-center">
          <h2 className="font-serif text-xl font-bold mb-2">Are You a Fertility Specialist in Seattle?</h2>
          <p className="text-teal-100 text-sm mb-4">Claim your free listing and reach patients searching for fertility care across the Puget Sound region.</p>
          <Link href="/submit" className="inline-block bg-gold-400 hover:bg-gold-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm">
            Add Your Free Listing →
          </Link>
        </div>
      </div>
    </>
  )
}
