import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, MapPin, Star } from 'lucide-react'
import { getListingsByCity } from '@/lib/data'
import ListingCard from '@/components/ListingCard'

export const metadata: Metadata = {
  title: 'Best Fertility Specialists in New York, NY — Top-Rated IVF Doctors',
  description:
    'Find the best fertility specialists in New York City. Top-rated reproductive endocrinologists on the Upper East Side, Midtown, and across the five boroughs — sorted by tier and credentials.',
  openGraph: {
    url: 'https://fertilityspecialistdirectory.com/best/fertility-specialists-in-new-york-ny',
  },
  alternates: {
    canonical: '/best/fertility-specialists-in-new-york-ny',
  },
}

const listSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Best Fertility Specialists in New York, NY',
  description: 'Top-rated reproductive endocrinologists and IVF clinics in New York City',
  url: 'https://fertilityspecialistdirectory.com/best/fertility-specialists-in-new-york-ny',
}

export default async function BestFertilitySpecialistsNYCPage() {
  const listings = await getListingsByCity('New York', 'NY', 8)

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
          <Link href="/fertility-specialists/new-york-ny" className="hover:text-teal-500 transition-colors">New York Fertility Specialists</Link>
          <ChevronRight className="w-4 h-4" aria-label="" />
          <span className="text-gray-900 font-medium">Best of NYC</span>
        </nav>

        <div className="flex items-center gap-2 text-sm text-teal-600 font-medium mb-3">
          <Star className="w-4 h-4 fill-teal-500 text-teal-500" aria-label="" />
          Featured &amp; Top-Tier Listings
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Best Fertility Specialists in New York City
        </h1>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
          <MapPin className="w-4 h-4" aria-label="" />
          <span>Manhattan, Brooklyn, Queens, the Bronx, and Long Island</span>
        </div>

        <p className="text-gray-700 leading-relaxed mb-8 max-w-3xl">
          New York City has one of the highest densities of board-certified reproductive endocrinologists in the country.
          The listings below represent the top-tier fertility specialists and clinics in the New York metro — providers
          with complete, verified profiles and the highest listing tiers in our directory. New York&rsquo;s fertility
          insurance law requires plans covering 25 or more employees to include IVF coverage, giving NYC patients
          access to treatment that would cost $15,000–$25,000 out of pocket in other states.
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
            in New York City, visit the{' '}
            <Link href="/fertility-specialists/new-york-ny" className="text-teal-600 hover:underline">
              full NYC directory page
            </Link>
            .
          </p>
        </div>

        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
          Fertility Care in New York: What to Know
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {[
            {
              title: 'NY Fertility Insurance Law',
              body: 'New York requires health plans covering 25 or more employees to cover IVF, including egg retrieval, embryo transfer, and certain medications. This is one of the most comprehensive fertility mandates in the country. Always verify your specific plan — self-insured employer plans are exempt.',
            },
            {
              title: 'Where Clinics Are Concentrated',
              body: 'The Upper East Side (East 70s–80s near Weill Cornell and NYU Langone) is the densest corridor for fertility specialists in the city. Midtown and the Upper West Side also have high concentrations. Brooklyn and Queens have growing practices as well.',
            },
            {
              title: 'Major Academic Programs',
              body: 'Weill Cornell Medicine, NYU Langone Fertility, Columbia University Fertility Center, and Mount Sinai are the major academic fertility programs in NYC. These programs train REI fellows and run clinical research — and also see general patients.',
            },
            {
              title: 'LGBTQ+ Fertility Care',
              body: 'New York City is one of the strongest markets for LGBTQ+ fertility care, with many practices specializing in reciprocal IVF, donor sperm cycles, and surrogacy coordination. Use the LGBTQ+-affirming filter on the main listings page to narrow your search.',
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
            href="/fertility-specialists/new-york-ny"
            className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm text-center"
          >
            See All NYC Fertility Specialists →
          </Link>
          <Link
            href="/listings"
            className="inline-block bg-cream-100 hover:bg-cream-200 text-gray-800 font-semibold px-6 py-3 rounded-xl transition-colors text-sm text-center border border-gray-200"
          >
            Browse All Specialists Nationwide
          </Link>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Other Cities to Explore</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Philadelphia, PA', href: '/fertility-specialists/philadelphia-pa' },
              { label: 'Boston, MA', href: '/fertility-specialists/boston-ma' },
              { label: 'Washington, DC', href: '/fertility-specialists/washington-dc' },
              { label: 'Chicago, IL', href: '/fertility-specialists/chicago-il' },
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
