import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, MapPin, Star } from 'lucide-react'
import { getListingsByCity } from '@/lib/data'
import { ListingCard } from '@/components/ListingCard'

export const metadata: Metadata = {
  title: 'Best Fertility Specialists in Houston, TX — Top-Rated IVF Doctors',
  description:
    'Find the best fertility specialists in Houston. Top-rated reproductive endocrinologists in the Texas Medical Center and greater Houston area — sorted by credentials and profile completeness.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/best/fertility-specialists-in-houston-tx',
  },
  alternates: {
    canonical: '/best/fertility-specialists-in-houston-tx',
  },
}

const listSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Fertility Specialists in Houston, TX',
  description: 'Top-rated reproductive endocrinologists and IVF clinics in Houston, Texas',
  url: 'https://fertilityspecialistdirectory.com/best/fertility-specialists-in-houston-tx',
}

export default async function BestFertilitySpecialistsHoustonPage() {
  const listings = await getListingsByCity('Houston', 'TX', 8)

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
          <Link href="/fertility-specialists/houston-tx" className="hover:text-teal-500 transition-colors">Houston Fertility Specialists</Link>
          <ChevronRight className="w-4 h-4" aria-label="" />
          <span className="text-gray-900 font-medium">Best of Houston</span>
        </nav>

        <div className="flex items-center gap-2 text-sm text-teal-600 font-medium mb-3">
          <Star className="w-4 h-4 fill-teal-500 text-teal-500" aria-label="" />
          Featured &amp; Top-Tier Listings
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Best Fertility Specialists in Houston, TX
        </h1>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
          <MapPin className="w-4 h-4" aria-label="" />
          <span>Houston Metro — Texas Medical Center, The Woodlands, Sugar Land, Katy</span>
        </div>

        <p className="text-gray-700 leading-relaxed mb-8 max-w-3xl">
          Houston is home to the Texas Medical Center — the largest medical complex in the world — and one of
          the strongest concentrations of board-certified reproductive endocrinologists in the South. The listings
          below represent the top-tier fertility specialists in the Houston metro, ranked by profile completeness
          and listing tier. Texas has no state fertility insurance mandate, so understanding your out-of-pocket
          costs before choosing a provider is especially important in this market.
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
            in Houston, visit the{' '}
            <Link href="/fertility-specialists/houston-tx" className="text-teal-600 hover:underline">
              full Houston directory page
            </Link>
            .
          </p>
        </div>

        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
          Fertility Care in Houston: What to Know
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {[
            {
              title: 'No State Fertility Mandate',
              body: 'Texas does not require health insurance plans to cover IVF or fertility treatments. Most Houston patients pay out of pocket for IVF — typically $12,000–$18,000 per cycle before medications. Always ask about multi-cycle discounts, financing options, and whether your employer plan has any voluntary fertility coverage.',
            },
            {
              title: 'Texas Medical Center Hub',
              body: "The TMC houses several of Houston's top fertility programs, including those affiliated with Baylor College of Medicine, UTHealth Houston, and Houston Methodist. These academic affiliations mean access to fellowship-trained REIs and clinical research protocols.",
            },
            {
              title: 'Suburban Clinics',
              body: 'Houston\'s sprawl means many patients prefer clinics closer to home. The Woodlands, Sugar Land, Katy, and Pearland all have satellite fertility clinic locations — especially useful during IVF monitoring cycles that require 8–12 morning appointments over two weeks.',
            },
            {
              title: 'Questions to Ask Any Houston Clinic',
              body: "Ask about financing and shared-risk (refund) programs. Ask whether the clinic has in-house PGT-A genetics testing or sends out. Ask who performs your egg retrieval — you personally or the on-call physician. Houston's competitive market means clinics differ significantly on these points.",
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
            href="/fertility-specialists/houston-tx"
            className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm text-center"
          >
            See All Houston Fertility Specialists →
          </Link>
          <Link
            href="/fertility-specialists/texas"
            className="inline-block bg-cream-100 hover:bg-cream-200 text-gray-800 font-semibold px-6 py-3 rounded-xl transition-colors text-sm text-center border border-gray-200"
          >
            Browse Texas Statewide
          </Link>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Other Texas Cities</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Dallas, TX', href: '/fertility-specialists/dallas-tx' },
              { label: 'Austin, TX', href: '/fertility-specialists/austin-tx' },
              { label: 'San Antonio, TX', href: '/fertility-specialists/san-antonio-tx' },
              { label: 'Fort Worth, TX', href: '/fertility-specialists/fort-worth-tx' },
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
