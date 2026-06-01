import type { Metadata } from 'next'
import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import FilterSidebarWrapper from './FilterSidebarWrapper'
import SearchBar from '@/components/SearchBar'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Browse Fertility Specialists — Find IVF Doctors, REIs & More',
  description:
    'Search all fertility specialists, reproductive endocrinologists, and fertility clinics in our directory. Filter by specialty, location, SART membership, and more.',
}

interface PageProps {
  searchParams: Promise<{
    q?: string
    location?: string
    type?: string
    tier?: string
    sart?: string
    lgbtq?: string
    telehealth?: string
    accepting?: string
    ivf?: string
    page?: string
  }>
}

const PAGE_SIZE = 20
const TABLE = 'fertility_specialist_listings'

async function getListings(params: Awaited<PageProps['searchParams']>): Promise<{
  listings: Listing[]
  total: number
}> {
  const supabase = await createClient()
  const page = Math.max(1, parseInt(params.page ?? '1', 10))
  const offset = (page - 1) * PAGE_SIZE

  let query = supabase
    .from(TABLE)
    .select('*', { count: 'exact' })
    .eq('is_approved', true)
    .eq('is_active', true)

  if (params.q) {
    query = query.textSearch('search_vector', params.q, { type: 'websearch' })
  }

  if (params.type) {
    query = query.eq('provider_type', params.type)
  }

  if (params.tier === 'featured') {
    query = query.in('listing_tier', ['featured', 'clinic'])
  } else if (params.tier === 'verified') {
    query = query.in('listing_tier', ['premium', 'featured', 'clinic'])
  }

  if (params.sart === '1') {
    query = query.eq('sart_member', true)
  }

  if (params.lgbtq === '1') {
    query = query.eq('lgbtq_affirming', true)
  }

  if (params.telehealth === '1') {
    query = query.eq('accepts_telehealth', true)
  }

  if (params.accepting === '1') {
    query = query.eq('accepting_new_patients', true)
  }

  if (params.ivf === '1') {
    query = query.eq('offers_ivf', true)
  }

  if (params.location) {
    const loc = params.location.trim()
    query = query.or(`city.ilike.%${loc}%,state.ilike.%${loc}%,zip.ilike.${loc}%`)
  }

  query = query
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .order('created_at', { ascending: false })
    .range(offset, offset + PAGE_SIZE - 1)

  const { data, count } = await query
  return { listings: (data ?? []) as Listing[], total: count ?? 0 }
}

export default async function ListingsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const { listings, total } = await getListings(params)
  const page = Math.max(1, parseInt(params.page ?? '1', 10))
  const totalPages = Math.ceil(total / PAGE_SIZE)

  function buildPageUrl(p: number) {
    const sp = new URLSearchParams()
    if (params.q) sp.set('q', params.q)
    if (params.location) sp.set('location', params.location)
    if (params.type) sp.set('type', params.type)
    if (params.tier) sp.set('tier', params.tier)
    if (params.sart) sp.set('sart', params.sart)
    if (params.lgbtq) sp.set('lgbtq', params.lgbtq)
    if (params.telehealth) sp.set('telehealth', params.telehealth)
    if (params.accepting) sp.set('accepting', params.accepting)
    if (params.ivf) sp.set('ivf', params.ivf)
    sp.set('page', String(p))
    return `/listings?${sp.toString()}`
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search bar */}
      <div className="mb-6">
        <SearchBar
          defaultQuery={params.q ?? ''}
          defaultLocation={params.location ?? ''}
          size="compact"
        />
      </div>

      <div className="flex gap-8">
        {/* Sidebar — wrapped in Suspense for client component */}
        <Suspense fallback={null}>
          <FilterSidebarWrapper />
        </Suspense>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-800">{total.toLocaleString()}</span>{' '}
              specialist{total !== 1 ? 's' : ''} found
              {params.location && ` near ${params.location}`}
            </p>
          </div>

          {listings.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <p className="text-gray-400 text-lg mb-2">No specialists found</p>
              <p className="text-gray-300 text-sm">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              {page > 1 && (
                <a
                  href={buildPageUrl(page - 1)}
                  className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-cream-50 text-teal-600 font-medium"
                >
                  ← Previous
                </a>
              )}
              <span className="text-sm text-gray-400">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <a
                  href={buildPageUrl(page + 1)}
                  className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-cream-50 text-teal-600 font-medium"
                >
                  Next →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
