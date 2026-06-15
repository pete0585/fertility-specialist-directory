import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  MapPin, Phone, Globe, CheckCircle, Heart, Star,
  Clock, Calendar, Award, ExternalLink,
} from 'lucide-react'
import { getListingBySlug, getAllListingSlugs } from '@/lib/data'
import { PROVIDER_TYPE_LABELS } from '@/lib/types'
import { formatPhone } from '@/lib/utils'
import { createCheckoutSession } from './actions'
import { ViewTracker } from '@/components/ViewTracker'
import { createServiceClient } from '@/lib/supabase/server'

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ verified?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const listing = await getListingBySlug(slug)
  if (!listing) return {}

  const title = `${listing.full_name}${listing.credentials ? `, ${listing.credentials}` : ''} — Fertility Specialist in ${listing.city}, ${listing.state}`
  const description = `Find and contact ${listing.full_name}, a ${PROVIDER_TYPE_LABELS[listing.provider_type] ?? 'fertility specialist'} in ${listing.city}, ${listing.state}. ${listing.sart_member ? 'SART Member. ' : ''}${listing.accepting_new_patients ? 'Accepting new patients.' : ''}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
    },
    alternates: {
      canonical: `/listings/${slug}`,
    },
  }
}

export async function generateStaticParams() {
  return []
}
export const dynamicParams = true
export const revalidate = 3600

export default async function ListingDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { verified } = await searchParams

  const listing = await getListingBySlug(slug)
  if (!listing) notFound()

  const isClaimed = listing.listing_tier !== 'unclaimed' && listing.listing_tier != null
  const isPaid = ['premium', 'featured', 'clinic'].includes(listing.listing_tier)
  const isFeatured = ['featured', 'clinic'].includes(listing.listing_tier)

  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
  const supabase = await createServiceClient()
  const { count: viewCount } = await supabase
    .from('listing_views')
    .select('*', { count: 'exact', head: true })
    .eq('directory_slug', 'fertility-specialist')
    .eq('listing_id', String(listing.id))
    .gte('viewed_at', monthStart)
  const monthlyViews = viewCount ?? 0

  const typeLabel = PROVIDER_TYPE_LABELS[listing.provider_type] ?? listing.provider_type

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'Physician'],
    name: listing.full_name,
    ...(listing.credentials && { honorificSuffix: listing.credentials }),
    ...(listing.provider_type === 'rei' && {
      medicalSpecialty: 'ReproductiveEndocrinologyAndInfertility',
    }),
    ...(listing.practice_name && { worksFor: { '@type': 'MedicalClinic', name: listing.practice_name } }),
    address: {
      '@type': 'PostalAddress',
      ...(listing.address_line1 && { streetAddress: listing.address_line1 }),
      addressLocality: listing.city,
      addressRegion: listing.state,
      ...(listing.zip && { postalCode: listing.zip }),
      addressCountry: 'US',
    },
    ...(listing.phone && { telephone: listing.phone }),
    ...(listing.website && { url: listing.website }),
    ...(listing.latitude && listing.longitude && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: listing.latitude,
        longitude: listing.longitude,
      },
    }),
  }

  async function handleUpgrade(listingId: string, tier: string) {
    'use server'
    await createCheckoutSession(listingId, tier as 'premium' | 'featured' | 'clinic')
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ViewTracker listingId={String(listing.id)} directorySlug='fertility-specialist' />

      {/* Upgrade success banner */}
      {verified === 'true' && (
        <div className="bg-teal-50 border-b border-teal-200 px-4 py-3 text-center text-sm text-teal-700 font-medium">
          Your listing has been upgraded! Changes will appear within a few minutes.
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1.5" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-teal-500">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-teal-500">Specialists</Link>
          <span>/</span>
          <span className="text-gray-600">{listing.full_name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-start gap-5">
                {listing.headshot_url ? (
                  <img
                    src={listing.headshot_url}
                    alt={listing.full_name}
                    className="w-20 h-20 rounded-2xl object-cover flex-shrink-0 border-2 border-cream-100"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-teal-50 flex items-center justify-center flex-shrink-0 text-teal-400 font-serif font-bold text-2xl">
                    {listing.full_name.charAt(0)}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <h1 className="text-2xl font-serif font-bold text-gray-900 leading-tight">
                        {listing.full_name}
                        {listing.credentials && (
                          <span className="text-gray-400 font-normal text-lg ml-1.5">
                            {listing.credentials}
                          </span>
                        )}
                      </h1>
                      <p className="text-teal-500 font-medium mt-1">{typeLabel}</p>
                      {listing.practice_name && (
                        <p className="text-gray-500 text-sm mt-0.5">{listing.practice_name}</p>
                      )}
                    </div>
                    {isFeatured && (
                      <span className="flex items-center gap-1 text-xs text-gold-500 bg-gold-50 border border-gold-200 px-2.5 py-1 rounded-full font-semibold whitespace-nowrap">
                        <Star size={11} aria-label="Top Provider" />
                        Top Provider
                      </span>
                    )}
                    {!isFeatured && isPaid && (
                      <span className="flex items-center gap-1 text-xs text-teal-500 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full font-semibold">
                        <CheckCircle size={11} aria-label="Verified" />
                        Verified
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-3">
                    <MapPin size={14} className="text-teal-400" aria-label="Location" />
                    <span>
                      {listing.city}, {listing.state}
                      {listing.zip && ` ${listing.zip}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-gray-50">
                {listing.sart_member && (
                  <span className="flex items-center gap-1.5 text-xs text-teal-600 bg-teal-50 px-3 py-1 rounded-full font-medium border border-teal-100">
                    <Award size={12} aria-label="SART Member" />
                    SART Member
                  </span>
                )}
                {listing.rei_board_certified && (
                  <span className="flex items-center gap-1.5 text-xs text-teal-600 bg-teal-50 px-3 py-1 rounded-full font-medium border border-teal-100">
                    <CheckCircle size={12} aria-label="REI Board Certified" />
                    REI Board Certified
                  </span>
                )}
                {listing.asrm_member && (
                  <span className="flex items-center gap-1.5 text-xs text-teal-600 bg-teal-50 px-3 py-1 rounded-full font-medium border border-teal-100">
                    <CheckCircle size={12} aria-label="ASRM Member" />
                    ASRM Member
                  </span>
                )}
                {listing.lgbtq_affirming && (
                  <span className="flex items-center gap-1.5 text-xs text-coral-500 bg-coral-50 px-3 py-1 rounded-full font-medium border border-coral-100">
                    <Heart size={12} aria-label="LGBTQ+ Affirming" />
                    LGBTQ+ Affirming
                  </span>
                )}
                {listing.accepting_new_patients && (
                  <span className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full font-medium border border-green-100">
                    <CheckCircle size={12} aria-label="Accepting Patients" />
                    Accepting New Patients
                  </span>
                )}
                {listing.accepts_telehealth && (
                  <span className="flex items-center gap-1.5 text-xs text-purple-600 bg-purple-50 px-3 py-1 rounded-full font-medium border border-purple-100">
                    <Globe size={12} aria-label="Telehealth" />
                    Telehealth Available
                  </span>
                )}
              </div>
            </div>

            {/* Stats dashboard for claimed listings */}
            {isClaimed && (
              <div className='rounded-2xl border border-blue-200 bg-blue-50 p-4'>
                <p className='text-xs font-semibold uppercase tracking-wide text-blue-600'>Profile Activity</p>
                <p className='mt-1 text-3xl font-bold text-blue-900'>{monthlyViews}</p>
                <p className='text-sm text-blue-700'>people viewed your profile this month</p>
                {listing.listing_tier === 'free' && (
                  <p className='mt-2 text-xs text-blue-600'>
                    0 could contact you.{' '}
                    <a href={`/claim/${listing.id}?upgrade=true`} className='underline font-medium'>
                      Upgrade to be reachable →
                    </a>
                  </p>
                )}
              </div>
            )}

            {/* Bio */}
            {isClaimed && listing.bio && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-serif font-bold text-gray-900 text-lg mb-3">About</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{listing.bio}</p>
              </div>
            )}

            {/* Treatments */}
            {(listing.offers_ivf || listing.offers_iui || listing.offers_egg_freezing ||
              listing.offers_egg_donation || listing.offers_genetic_testing || listing.male_factor_expertise) && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-serif font-bold text-gray-900 text-lg mb-4">Treatments Offered</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {listing.offers_ivf && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle size={14} className="text-teal-500" aria-label="IVF" />
                      IVF
                    </div>
                  )}
                  {listing.offers_iui && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle size={14} className="text-teal-500" aria-label="IUI" />
                      IUI
                    </div>
                  )}
                  {listing.offers_egg_freezing && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle size={14} className="text-teal-500" aria-label="Egg Freezing" />
                      Egg Freezing
                    </div>
                  )}
                  {listing.offers_egg_donation && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle size={14} className="text-teal-500" aria-label="Egg Donation" />
                      Egg Donation
                    </div>
                  )}
                  {listing.offers_genetic_testing && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle size={14} className="text-teal-500" aria-label="PGT Genetic Testing" />
                      PGT Genetic Testing
                    </div>
                  )}
                  {listing.male_factor_expertise && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle size={14} className="text-teal-500" aria-label="Male Factor" />
                      Male Factor
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Specialties */}
            {(listing.specialties ?? []).length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-serif font-bold text-gray-900 text-lg mb-4">Specialties</h2>
                <div className="flex flex-wrap gap-2">
                  {(listing.specialties ?? []).map((s) => (
                    <span
                      key={s}
                      className="text-sm bg-cream-100 text-gray-700 px-3 py-1.5 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Insurance */}
            {(listing.insurance_accepted ?? []).length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-serif font-bold text-gray-900 text-lg mb-4">Insurance Accepted</h2>
                <div className="flex flex-wrap gap-2">
                  {(listing.insurance_accepted ?? []).map((ins) => (
                    <span
                      key={ins}
                      className="text-sm bg-cream-100 text-gray-700 px-3 py-1.5 rounded-full"
                    >
                      {ins}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* SART disclaimer */}
            {listing.sart_member && (
              <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 text-sm text-teal-700">
                <p>
                  <strong>SART Member:</strong> This clinic is a member of the Society for Assisted
                  Reproductive Technology. For official IVF success rate data, visit{' '}
                  <a
                    href="https://www.sartcorsonline.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-teal-800 inline-flex items-center gap-0.5"
                  >
                    SART.org <ExternalLink size={11} aria-label="External link" />
                  </a>
                  .
                </p>
              </div>
            )}

            {/* Claim prompt for unclaimed listings */}
            {listing.listing_tier === 'unclaimed' && (
              <div className="bg-gold-50 border border-gold-200 rounded-2xl p-6">
                <h3 className="font-serif font-bold text-gray-900 mb-2">Is this your listing?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Claim it for free to add your bio, website, photo, and specialties. One click to
                  get found by patients actively searching for your services.
                </p>
                <Link
                  href={`/claim/${listing.id}`}
                  className="inline-block bg-gold-400 hover:bg-gold-500 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
                >
                  Claim This Listing →
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Contact card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-serif font-bold text-gray-900 mb-4">Contact</h2>
              {isClaimed ? (
                <div className="space-y-3">
                  {listing.phone && (
                    <a
                      href={`tel:${listing.phone}`}
                      className="flex items-center gap-3 text-sm text-gray-700 hover:text-teal-600 group"
                    >
                      <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-teal-100 transition-colors">
                        <Phone size={16} className="text-teal-500" aria-label="Phone" />
                      </div>
                      <span>{formatPhone(listing.phone)}</span>
                    </a>
                  )}
                  {listing.website && (
                    <a
                      href={listing.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-gray-700 hover:text-teal-600 group"
                    >
                      <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-teal-100 transition-colors">
                        <Globe size={16} className="text-teal-500" aria-label="Website" />
                      </div>
                      <span className="truncate">Visit Website</span>
                    </a>
                  )}
                  {listing.booking_url && (
                    <a
                      href={listing.booking_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors mt-2"
                    >
                      Book Appointment
                    </a>
                  )}
                  {!listing.booking_url && !listing.phone && !listing.website && (
                    <p className="text-sm text-gray-400 italic">Contact information not yet added.</p>
                  )}
                </div>
              ) : (
                <div className='rounded-lg border border-gray-200 bg-gray-50 p-4 text-center'>
                  <p className='text-sm text-gray-500'>
                    Phone, website, and bio are only visible after this provider claims their listing.
                  </p>
                  <a
                    href={`/claim/${listing.id}`}
                    className='mt-2 inline-block text-sm font-medium text-blue-600 hover:underline'
                  >
                    Is this you? Claim your free profile →
                  </a>
                </div>
              )}
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-serif font-bold text-gray-900 mb-3">Location</h2>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin size={15} className="text-teal-400 mt-0.5 flex-shrink-0" aria-label="Location" />
                <div>
                  {listing.address_line1 && <p>{listing.address_line1}</p>}
                  <p>
                    {listing.city}, {listing.state}
                    {listing.zip && ` ${listing.zip}`}
                  </p>
                </div>
              </div>
              {listing.latitude && listing.longitude && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${listing.latitude},${listing.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block text-xs text-teal-500 hover:text-teal-600 font-medium"
                >
                  View on Google Maps →
                </a>
              )}
            </div>

            {/* Upgrade CTA for free/unclaimed */}
            {(listing.listing_tier === 'unclaimed' || listing.listing_tier === 'free') && (
              <div className="bg-gradient-to-br from-teal-600 to-teal-500 rounded-2xl p-5 text-white">
                <h3 className="font-serif font-bold text-lg mb-2">Upgrade Your Listing</h3>
                <p className="text-teal-100 text-sm mb-4 leading-relaxed">
                  One new IVF patient is worth $15,000–50,000. A Premium listing pays for
                  itself in the first consultation.
                </p>
                <div className="space-y-2">
                  <form action={handleUpgrade.bind(null, listing.id, 'premium')}>
                    <button
                      type="submit"
                      className="w-full bg-white text-teal-600 font-semibold py-2 rounded-lg text-sm hover:bg-cream-50 transition-colors"
                    >
                      Premium — $299/year
                    </button>
                  </form>
                  <form action={handleUpgrade.bind(null, listing.id, 'featured')}>
                    <button
                      type="submit"
                      className="w-full bg-gold-400 hover:bg-gold-500 text-white font-semibold py-2 rounded-lg text-sm transition-colors"
                    >
                      Featured — $499/year
                    </button>
                  </form>
                  <form action={handleUpgrade.bind(null, listing.id, 'clinic')}>
                    <button
                      type="submit"
                      className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold py-2 rounded-lg text-sm transition-colors"
                    >
                      Clinic — $799/year
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Languages */}
            {(listing.languages_spoken ?? []).length > 0 &&
              !((listing.languages_spoken ?? []).length === 1 && listing.languages_spoken[0] === 'English') && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  <h2 className="font-serif font-bold text-gray-900 mb-3">Languages</h2>
                  <div className="flex flex-wrap gap-2">
                    {(listing.languages_spoken ?? []).map((lang) => (
                      <span key={lang} className="text-xs bg-cream-100 text-gray-600 px-2.5 py-1 rounded-full">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </aside>
        </div>
      </div>
    </>
  )
}
