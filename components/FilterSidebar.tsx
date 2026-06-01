'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Filter, X } from 'lucide-react'
import { PROVIDER_TYPE_LABELS, type ProviderType } from '@/lib/types'

const PROVIDER_TYPES = Object.entries(PROVIDER_TYPE_LABELS) as [ProviderType, string][]

interface FilterSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function FilterSidebar({ isOpen = true, onClose }: FilterSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete('page')
      router.push(`/listings?${params.toString()}`)
    },
    [router, searchParams]
  )

  const currentType = searchParams.get('type') ?? ''
  const currentTier = searchParams.get('tier') ?? ''
  const currentSart = searchParams.get('sart') ?? ''
  const currentLgbtq = searchParams.get('lgbtq') ?? ''
  const currentTelehealth = searchParams.get('telehealth') ?? ''
  const currentAccepting = searchParams.get('accepting') ?? ''
  const currentIvf = searchParams.get('ivf') ?? ''

  function clearAll() {
    const params = new URLSearchParams(searchParams.toString())
    ;['type', 'tier', 'sart', 'lgbtq', 'telehealth', 'accepting', 'ivf'].forEach((k) =>
      params.delete(k)
    )
    router.push(`/listings?${params.toString()}`)
  }

  const hasFilters = [currentType, currentTier, currentSart, currentLgbtq, currentTelehealth, currentAccepting, currentIvf].some(Boolean)

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-teal-600 font-semibold">
          <Filter size={16} aria-label="Filter" />
          Filters
        </div>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-coral-500 hover:text-coral-600 font-medium"
          >
            Clear all
          </button>
        )}
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} aria-label="Close filters" />
          </button>
        )}
      </div>

      {/* Provider Type */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Specialist Type</h3>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              value=""
              checked={!currentType}
              onChange={() => setParam('type', null)}
              className="accent-teal-500"
            />
            <span className="text-sm text-gray-600">All Types</span>
          </label>
          {PROVIDER_TYPES.map(([value, label]) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value={value}
                checked={currentType === value}
                onChange={() => setParam('type', value)}
                className="accent-teal-500"
              />
              <span className="text-sm text-gray-600">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Listing Tier */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Listing Status</h3>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tier"
              value=""
              checked={!currentTier}
              onChange={() => setParam('tier', null)}
              className="accent-teal-500"
            />
            <span className="text-sm text-gray-600">All</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tier"
              value="verified"
              checked={currentTier === 'verified'}
              onChange={() => setParam('tier', 'verified')}
              className="accent-teal-500"
            />
            <span className="text-sm text-gray-600">Verified only</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tier"
              value="featured"
              checked={currentTier === 'featured'}
              onChange={() => setParam('tier', 'featured')}
              className="accent-teal-500"
            />
            <span className="text-sm text-gray-600">Top Providers only</span>
          </label>
        </div>
      </div>

      {/* Treatments Offered */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Treatments</h3>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={currentIvf === '1'}
              onChange={() => setParam('ivf', currentIvf === '1' ? null : '1')}
              className="accent-teal-500"
            />
            <span className="text-sm text-gray-600">Offers IVF</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={currentTelehealth === '1'}
              onChange={() => setParam('telehealth', currentTelehealth === '1' ? null : '1')}
              className="accent-teal-500"
            />
            <span className="text-sm text-gray-600">Telehealth Available</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={currentAccepting === '1'}
              onChange={() => setParam('accepting', currentAccepting === '1' ? null : '1')}
              className="accent-teal-500"
            />
            <span className="text-sm text-gray-600">Accepting New Patients</span>
          </label>
        </div>
      </div>

      {/* Identity */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Practice</h3>
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={currentSart === '1'}
              onChange={() => setParam('sart', currentSart === '1' ? null : '1')}
              className="accent-teal-500"
            />
            <span className="text-sm text-gray-600">SART Member</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={currentLgbtq === '1'}
              onChange={() => setParam('lgbtq', currentLgbtq === '1' ? null : '1')}
              className="accent-teal-500"
            />
            <span className="text-sm text-gray-600">LGBTQ+ Affirming</span>
          </label>
        </div>
      </div>
    </div>
  )

  if (!isOpen) return null

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm sticky top-24">
          {content}
        </div>
      </aside>

      {/* Mobile drawer */}
      <div className="lg:hidden fixed inset-0 z-50 flex">
        <div className="fixed inset-0 bg-black/40" onClick={onClose} />
        <div className="relative ml-auto w-72 bg-white h-full overflow-y-auto p-6 shadow-xl">
          {content}
        </div>
      </div>
    </>
  )
}
