import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, MapPin, Star } from 'lucide-react'
import { getListingsByCity } from '@/lib/data'
import { ListingCard } from '@/components/ListingCard'

export const metadata: Metadata = {
  title: 'Best Fertility Specialists in Los Angeles, CA — Top-Rated IVF Doctors',
  description:
    'Find the best fertility specialists in Los Angeles. Browse top-rated reproductive endocrinologists in Westwood, Beverly Hills, and the greater LA area — sorted by tier, credentials, and completeness.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/best/fertility-specialists-in-los-angeles-ca',
  },
  alternates: {
    canonical: '/best/fertility-specialists-in-los-angeles-ca',
  },
}

const listSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Fertility Specialists in Los Angeles, CA',
  description: 'Top-rated reproductive endocrinologists and IVF clinics in Los Angeles',
  url: 'https://fertilityspecialistdirectory.com/best/fertility-specialists-in-los-angeles-ca',
}

export default async function BestFertilitySpecialistsLAPage() {
  const listings = await getListingsByCity('Los Angeles', 'CA', 8)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6 flex-wrap" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-teal-500 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" aria-label="" />
          <Link href="/fertility-specialists/los-angeles-ca" className="hover:text-teal-500 transition-colors">Los Angeles Fertility Specialists</Link>
          <ChevronRight className="w-4 h-4" aria-label="" />
          <span className="text-gray-900 font-medium">Best of LA</span>
        </nav>

        <div className="flex items-center gap-2 text-sm text-teal-600 font-medium mb-3">
          <Star className="w-4 h-4 fill-teal-500 text-teal-500" aria-label="" />
          Featured &amp; Top-Tier Listings
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Best Fertility Specialists in Los Angeles, CA
        </h1>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
          <MapPin className="w-4 h-4" aria-label="" />
          <span>Los Angeles County — including Westwood, Beverly Hills, Santa Monica, Pasadena</span>
        </div>

        <p className="text-gray-700 leading-relaxed mb-8 max-w-3xl">
          Los Angeles has one of the largest concentrations of reproductive endocrinologists in the United States.
          The listings below represent the highest-tier fertility specialists in the Los Angeles area — board-certified
          REIs, established fertility clinics, and providers with complete, verified profiles. California&rsquo;s SB 600
          mandate (effective 2025) requires most large employer health plans to cover IVF, making LA an especially
          strong market for fertility care access.
        </p>

        {listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} featured={listing.listing_tier === 'featured'} />
            ))}
          </div>
        ) : (
          <div className="bg-cream-100 rounded-2xl p-8 text-center mb-10">
            <p className="text-gray-600">Full listing data is loading. Check back shortly.</p>
          </div>
        )}

        <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 mb-10">
          <h2 className="font-semibold text-gray-800 mb-2">About This List</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            These listings are sorted by profile completeness and tier — featured and clinic-tier providers appear first.
            Inclusion reflects profile status, not a paid ranking or editorial endorsement. To see all fertility specialists
            in Los Angeles, visit the{' '}
            <Link href="/fertility-specialists/los-angeles-ca" className="text-teal-600 hover:underline">
              full Los Angeles directory page
            </Link>
            .
          </p>
        </div>

        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
          Fertility Care in Los Angeles: What to Know
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {[
            {
              title: 'Insurance Coverage',
              body: "California's SB 600 fertility mandate (effective January 2025) requires most group health plans with 100+ employees to cover IVF — including egg retrieval, embryo transfer, and medications. Verify your specific plan benefits before your first appointment.",
            },
            {
              title: 'Where Clinics Are Concentrated',
              body: 'The heaviest concentration of REIs and fertility clinics is in Westwood (near UCLA), Beverly Hills, and Santa Monica. A second cluster exists in the San Fernando Valley (Encino, Tarzana) and in Pasadena for the SGV.',
            },
            {
              title: 'Academic Programs',
              body: "UCLA's Division of Reproductive Endocrinology and Infertility is one of the top academic REI programs in the country. USC Fertility and Cedars-Sinai are also prominent — high-volume programs with research pipelines and fellowship training.",
            },
            {
              title: 'Self-Referrals',
              body: "You don't need a referral from your OB-GYN to see a fertility specialist in California. Most LA-area REI practices accept self-referrals. If your insurance requires a referral, your OB-GYN can typically generate one within a few days.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-800 text-sm mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <Link
            href="/fertility-specialists/los-angeles-ca"
            className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm text-center"
          >
            See All LA Fertility Specialists →
          </Link>
          <Link
            href="/fertility-specialists/california"
            className="inline-block bg-cream-100 hover:bg-cream-200 text-gray-800 font-semibold px-6 py-3 rounded-xl transition-colors text-sm text-center border border-gray-200"
          >
            Browse California Statewide
          </Link>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Other Cities in California</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'San Francisco', href: '/fertility-specialists/san-francisco-ca' },
              { label: 'San Diego', href: '/fertility-specialists/san-diego-ca' },
              { label: 'Sacramento', href: '/fertility-specialists/sacramento-ca' },
              { label: 'Irvine / Orange County', href: '/fertility-specialists/irvine-ca' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-teal-600 hover:text-teal-700 border border-teal-200 rounded-lg px-3 py-1.5 hover:bg-teal-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
