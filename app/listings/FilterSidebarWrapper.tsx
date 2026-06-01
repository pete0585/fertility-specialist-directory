'use client'

import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import FilterSidebar from '@/components/FilterSidebar'

export default function FilterSidebarWrapper() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4 w-full">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 text-sm bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-teal-600 font-medium shadow-sm"
        >
          <SlidersHorizontal size={16} aria-label="Filters" />
          Filters
        </button>
      </div>

      <FilterSidebar
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      {/* Desktop always visible */}
      <div className="hidden lg:block">
        <FilterSidebar isOpen={true} />
      </div>
    </>
  )
}
