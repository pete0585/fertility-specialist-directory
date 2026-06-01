import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Heart, Users, Star } from 'lucide-react'
import SearchBar from '@/components/SearchBar'
import ListingCard from '@/components/ListingCard'
import { getFeaturedListings, getRecentListings, getTotalListingCount } from '@/lib/data'
import { PROVIDER_TYPE_LABELS, type ProviderType } from '@/lib/types'

export const metadata: Metadata = {
  title:
    'Fertility Specialist Directory — Find IVF Doctors & Reproductive Endocrinologists Near You',
  description:
    'Find a fertility specialist who truly understands your journey. Search 1,000+ board-certified REIs, IVF doctors, and fertility clinics by location, specialty, and more.',
}

const CATEGORIES: { slug: string; label: string; providerType: ProviderType; icon: string; description: string }[] = [
  {
    slug: 'reproductive-endocrinologists',
    label: 'Reproductive Endocrinologists',
    providerType: 'rei',
    icon: '🔬',
    description: 'Board-certified REI subspecialists for IVF and complex fertility cases',
  },
  {
    slug: 'fertility-clinics',
    label: 'Fertility Clinics',
    providerType: 'clinic',
    icon: '🏥',
    description: 'Accredited fertility centers and IVF labs across the US',
  },
  {
    slug: 'fertility-acupuncturists',
    label: 'Fertility Acupuncturists',
    providerType: 'acupuncturist',
    icon: '🌿',
    description: 'Integrative practitioners specializing in fertility support',
  },
  {
    slug: 'fertility-counselors',
    label: 'Fertility Counselors',
    providerType: 'mental_health',
    icon: '💛',
    description: 'Mental health support through fertility treatments and loss',
  },
  {
    slug: 'lgbtq-fertility',
    label: 'LGBTQ+ Fertility',
    providerType: 'rei',
    icon: '🏳️‍🌈',
    description: 'Specialists with deep experience serving LGBTQ+ families',
  },
  {
    slug: 'surrogacy-agencies',
    label: 'Surrogacy & Egg Donation',
    providerType: 'surrogacy_agency',
    icon: '🤝',
    description: 'Agencies supporting third-party reproduction journeys',
  },
]

export default async function HomePage() {
  const [featured, recent, totalCount] = await Promise.all([
    getFeaturedListings(6),
    getRecentListings(8),
    getTotalListingCount(),
  ])

  const displayCount = totalCount > 0 ? totalCount.toLocaleString() : '1,000+'

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-600 via-teal-500 to-teal-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-teal-100 text-sm font-semibold uppercase tracking-widest mb-4">
              {displayCount}+ Verified Specialists
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              Find a fertility doctor who{' '}
              <span className="text-gold-300">actually gets it</span>
            </h1>
            <p className="text-teal-50 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              The only directory built around individual fertility specialists — not just clinic
              brands. Reproductive endocrinologists, IVF doctors, and fertility-adjacent providers,
              all in one place.
            </p>
            <SearchBar size="hero" />
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-teal-100">
              <span className="flex items-center gap-1.5">
                <CheckCircle size={15} aria-label="Free to search" />
                Free to search
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={15} aria-label="No membership required" />
                No membership required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={15} aria-label="SART member badges" />
                SART member badges
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-white border-b border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-serif font-bold text-teal-600">{displayCount}+</div>
              <div className="text-xs text-gray-500 mt-0.5">Fertility Specialists</div>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold text-teal-600">50</div>
              <div className="text-xs text-gray-500 mt-0.5">States Covered</div>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold text-teal-600">10</div>
              <div className="text-xs text-gray-500 mt-0.5">Specialty Types</div>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold text-teal-600">Free</div>
              <div className="text-xs text-gray-500 mt-0.5">To Search & Find</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-3">
            Browse by Specialty
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Whether you need an REI for IVF, an acupuncturist for support, or a counselor for the
            emotional journey — find the right specialist for where you are.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className="font-semibold text-gray-900 group-hover:text-teal-500 transition-colors mb-1">
                {cat.label}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{cat.description}</p>
              <span className="text-xs text-teal-500 font-medium mt-3 block group-hover:underline">
                Browse specialists →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      {featured.length > 0 && (
        <section className="bg-cream-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-1">
                  Top Providers
                </h2>
                <p className="text-gray-500 text-sm">Verified and featured fertility specialists</p>
              </div>
              <Link
                href="/listings?tier=featured"
                className="text-sm text-teal-500 hover:text-teal-600 font-medium hidden sm:block"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((listing) => (
                <ListingCard key={listing.id} listing={listing} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Listings */}
      {recent.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-1">
                Recently Added
              </h2>
              <p className="text-gray-500 text-sm">New listings from across the country</p>
            </div>
            <Link
              href="/listings"
              className="text-sm text-teal-500 hover:text-teal-600 font-medium hidden sm:block"
            >
              Browse all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {recent.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      )}

      {/* Why Trust */}
      <section className="bg-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div>
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={24} className="text-gold-300" aria-label="Verified" />
              </div>
              <h3 className="font-serif font-bold text-lg mb-2">NPI-Verified Credentials</h3>
              <p className="text-teal-100 text-sm leading-relaxed">
                Every practitioner is cross-referenced against the National Provider Identifier
                registry. Verified badges mean we&apos;ve confirmed their credentials.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={24} className="text-gold-300" aria-label="SART member" />
              </div>
              <h3 className="font-serif font-bold text-lg mb-2">SART Member Recognition</h3>
              <p className="text-teal-100 text-sm leading-relaxed">
                Society for Assisted Reproductive Technology membership is the gold standard for
                IVF clinic quality. We display it prominently.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={24} className="text-gold-300" aria-label="Patient centered" />
              </div>
              <h3 className="font-serif font-bold text-lg mb-2">Built for Patients</h3>
              <p className="text-teal-100 text-sm leading-relaxed">
                Always free to search. No membership needed. We exist to make finding your
                fertility specialist as easy as possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA for Practitioners */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-3xl border border-cream-200 shadow-sm p-10">
          <Users size={36} className="text-teal-400 mx-auto mb-4" aria-label="Practitioners" />
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-3">
            Are you a fertility specialist?
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed">
            Claim your free listing or add your practice to the directory. One new patient covers
            your annual Premium subscription in the first consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/submit"
              className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Add My Practice (Free)
            </Link>
            <Link
              href="/listings"
              className="bg-white hover:bg-cream-100 text-teal-500 border border-teal-200 font-semibold px-8 py-3 rounded-xl transition-colors"
            >
              Find My Listing
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-400">
            <span>Free listing</span>
            <span>•</span>
            <span>Premium from $299/year</span>
            <span>•</span>
            <span>One patient pays for years of exposure</span>
          </div>
        </div>
      </section>
    </div>
  )
}
