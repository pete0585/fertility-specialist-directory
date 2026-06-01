'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin } from 'lucide-react'

interface SearchBarProps {
  defaultQuery?: string
  defaultLocation?: string
  size?: 'hero' | 'compact'
}

export default function SearchBar({
  defaultQuery = '',
  defaultLocation = '',
  size = 'compact',
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultQuery)
  const [location, setLocation] = useState(defaultLocation)
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (location.trim()) params.set('location', location.trim())
    router.push(`/listings?${params.toString()}`)
  }

  if (size === 'hero') {
    return (
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl mx-auto"
        role="search"
      >
        <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-2xl shadow-xl p-2">
          <div className="flex-1 flex items-center gap-2 px-3">
            <Search size={18} className="text-teal-400 flex-shrink-0" aria-label="Search icon" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Specialty, name, or condition (e.g. IVF, PCOS)"
              className="flex-1 py-3 text-gray-800 placeholder-gray-400 bg-transparent outline-none text-base"
            />
          </div>
          <div className="flex items-center gap-2 px-3 border-t sm:border-t-0 sm:border-l border-gray-100">
            <MapPin size={18} className="text-teal-400 flex-shrink-0" aria-label="Location icon" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, state, or ZIP"
              className="flex-1 py-3 text-gray-800 placeholder-gray-400 bg-transparent outline-none text-base min-w-0 w-full sm:w-44"
            />
          </div>
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
          >
            Search
          </button>
        </div>
      </form>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2 w-full"
      role="search"
    >
      <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 focus-within:ring-2 focus-within:ring-teal-400">
        <Search size={16} className="text-gray-400 flex-shrink-0" aria-label="Search icon" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Specialty or name"
          className="flex-1 py-2.5 text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none"
        />
      </div>
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 focus-within:ring-2 focus-within:ring-teal-400">
        <MapPin size={16} className="text-gray-400 flex-shrink-0" aria-label="Location icon" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City or ZIP"
          className="py-2.5 text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none w-36"
        />
      </div>
      <button
        type="submit"
        className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm whitespace-nowrap"
      >
        Search
      </button>
    </form>
  )
}
