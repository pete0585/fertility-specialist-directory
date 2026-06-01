import Link from 'next/link'
import { MapPin, Phone, Globe, CheckCircle, Star, Heart } from 'lucide-react'
import type { Listing } from '@/lib/types'
import { PROVIDER_TYPE_LABELS } from '@/lib/types'
import { formatPhone } from '@/lib/utils'

interface ListingCardProps {
  listing: Listing
  featured?: boolean
}

export default function ListingCard({ listing, featured = false }: ListingCardProps) {
  const specialties = listing.specialties ?? []
  const tier = listing.listing_tier

  const tierBadge =
    tier === 'featured' || tier === 'clinic'
      ? { label: 'Top Provider', className: 'bg-gold-50 text-gold-500 border border-gold-200' }
      : tier === 'premium'
      ? { label: 'Verified', className: 'bg-teal-50 text-teal-500 border border-teal-200' }
      : null

  return (
    <Link href={`/listings/${listing.slug}`} className="block group">
      <article
        className={`bg-white rounded-2xl p-5 border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
          featured
            ? 'border-gold-200 shadow-md'
            : 'border-gray-100 shadow-sm'
        }`}
      >
        {featured && (
          <div className="flex items-center gap-1.5 text-xs text-gold-500 font-semibold mb-3">
            <Star size={12} aria-label="Featured" />
            Featured Provider
          </div>
        )}

        <div className="flex items-start gap-4">
          {listing.headshot_url ? (
            <img
              src={listing.headshot_url}
              alt={listing.full_name}
              className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-cream-100"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0 text-teal-400 font-serif font-bold text-lg">
              {listing.full_name.charAt(0)}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-teal-500 transition-colors leading-tight">
                  {listing.full_name}
                  {listing.credentials && (
                    <span className="text-gray-400 font-normal text-sm ml-1">
                      {listing.credentials}
                    </span>
                  )}
                </h3>
                <p className="text-sm text-teal-500 font-medium mt-0.5">
                  {PROVIDER_TYPE_LABELS[listing.provider_type] ?? listing.provider_type}
                </p>
              </div>
              {tierBadge && (
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap ${tierBadge.className}`}
                >
                  {tierBadge.label}
                </span>
              )}
            </div>

            {listing.practice_name && (
              <p className="text-sm text-gray-500 mt-1 truncate">{listing.practice_name}</p>
            )}

            <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-2">
              <MapPin size={13} className="text-teal-400 flex-shrink-0" aria-label="Location" />
              <span>
                {listing.city}, {listing.state}
              </span>
            </div>
          </div>
        </div>

        {specialties.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {specialties.slice(0, 4).map((s) => (
              <span
                key={s}
                className="text-xs bg-cream-100 text-gray-600 px-2 py-0.5 rounded-full"
              >
                {s}
              </span>
            ))}
            {specialties.length > 4 && (
              <span className="text-xs text-gray-400">+{specialties.length - 4} more</span>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-3">
          {listing.sart_member && (
            <div className="flex items-center gap-1 text-xs text-teal-600 font-medium">
              <CheckCircle size={12} aria-label="SART Member" />
              SART Member
            </div>
          )}
          {listing.lgbtq_affirming && (
            <div className="flex items-center gap-1 text-xs text-coral-500 font-medium">
              <Heart size={12} aria-label="LGBTQ+ Affirming" />
              LGBTQ+ Affirming
            </div>
          )}
          {listing.accepting_new_patients && (
            <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
              <CheckCircle size={12} aria-label="Accepting Patients" />
              Accepting Patients
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
          <div className="flex items-center gap-3">
            {listing.phone && (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Phone size={11} aria-label="Phone" />
                {formatPhone(listing.phone)}
              </div>
            )}
            {listing.website && (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Globe size={11} aria-label="Website" />
                Website
              </div>
            )}
          </div>
          <span className="text-xs text-teal-500 font-medium group-hover:underline">
            View Profile →
          </span>
        </div>
      </article>
    </Link>
  )
}
