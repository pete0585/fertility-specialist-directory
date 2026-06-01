'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, ExternalLink } from 'lucide-react'
import type { Listing } from '@/lib/types'
import { PROVIDER_TYPE_LABELS } from '@/lib/types'

interface AdminTableProps {
  listings: Listing[]
}

export default function AdminTable({ listings: initial }: AdminTableProps) {
  const [listings, setListings] = useState(initial)
  const [loading, setLoading] = useState<string | null>(null)

  async function updateStatus(id: string, action: 'approve' | 'reject') {
    setLoading(id)
    try {
      const res = await fetch(`/api/admin/listings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      })
      if (res.ok) {
        setListings((prev) =>
          prev.map((l) =>
            l.id === id
              ? { ...l, is_approved: action === 'approve', is_active: action === 'approve' }
              : l
          )
        )
      }
    } finally {
      setLoading(null)
    }
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        No listings pending review.
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left text-xs uppercase tracking-wider text-gray-400">
            <th className="pb-3 pr-4 font-medium">Name</th>
            <th className="pb-3 pr-4 font-medium">Type</th>
            <th className="pb-3 pr-4 font-medium">Location</th>
            <th className="pb-3 pr-4 font-medium">Tier</th>
            <th className="pb-3 pr-4 font-medium">Source</th>
            <th className="pb-3 pr-4 font-medium">Status</th>
            <th className="pb-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {listings.map((listing) => (
            <tr key={listing.id} className="hover:bg-cream-50">
              <td className="py-3 pr-4">
                <div className="font-medium text-gray-900 truncate max-w-[180px]">
                  {listing.full_name}
                </div>
                {listing.practice_name && (
                  <div className="text-xs text-gray-400 truncate max-w-[180px]">
                    {listing.practice_name}
                  </div>
                )}
                {listing.email && (
                  <div className="text-xs text-teal-500 truncate max-w-[180px]">
                    {listing.email}
                  </div>
                )}
              </td>
              <td className="py-3 pr-4 text-gray-600 whitespace-nowrap">
                {PROVIDER_TYPE_LABELS[listing.provider_type] ?? listing.provider_type}
              </td>
              <td className="py-3 pr-4 text-gray-600 whitespace-nowrap">
                {listing.city}, {listing.state}
              </td>
              <td className="py-3 pr-4">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    listing.listing_tier === 'featured' || listing.listing_tier === 'clinic'
                      ? 'bg-gold-50 text-gold-500'
                      : listing.listing_tier === 'premium'
                      ? 'bg-teal-50 text-teal-500'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {listing.listing_tier}
                </span>
              </td>
              <td className="py-3 pr-4 text-gray-400 text-xs">{listing.source}</td>
              <td className="py-3 pr-4">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    listing.is_approved
                      ? 'bg-green-50 text-green-600'
                      : 'bg-yellow-50 text-yellow-600'
                  }`}
                >
                  {listing.is_approved ? 'Approved' : 'Pending'}
                </span>
              </td>
              <td className="py-3">
                <div className="flex items-center gap-2">
                  {!listing.is_approved && (
                    <button
                      onClick={() => updateStatus(listing.id, 'approve')}
                      disabled={loading === listing.id}
                      className="text-green-600 hover:text-green-700 disabled:opacity-50"
                      title="Approve"
                    >
                      <CheckCircle size={18} aria-label="Approve listing" />
                    </button>
                  )}
                  {listing.is_approved && (
                    <button
                      onClick={() => updateStatus(listing.id, 'reject')}
                      disabled={loading === listing.id}
                      className="text-coral-500 hover:text-coral-600 disabled:opacity-50"
                      title="Reject"
                    >
                      <XCircle size={18} aria-label="Reject listing" />
                    </button>
                  )}
                  {listing.website && (
                    <a
                      href={listing.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-teal-500"
                    >
                      <ExternalLink size={16} aria-label="Visit website" />
                    </a>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
