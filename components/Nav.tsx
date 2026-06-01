'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-cream-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold text-teal-500 leading-tight">
              Fertility<span className="text-gold-400">Specialist</span>
            </span>
            <span className="hidden sm:block text-xs text-gray-400 font-sans uppercase tracking-wide">
              Directory
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/listings"
              className="text-sm text-gray-600 hover:text-teal-500 transition-colors font-medium"
            >
              Find a Specialist
            </Link>
            <Link
              href="/categories/reproductive-endocrinologists"
              className="text-sm text-gray-600 hover:text-teal-500 transition-colors font-medium"
            >
              REI Specialists
            </Link>
            <Link
              href="/categories/fertility-clinics"
              className="text-sm text-gray-600 hover:text-teal-500 transition-colors font-medium"
            >
              Fertility Clinics
            </Link>
            <Link
              href="/submit"
              className="text-sm bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors font-medium"
            >
              Add Your Practice
            </Link>
          </div>

          <button
            className="md:hidden text-gray-500 hover:text-teal-500"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-cream-200 bg-white">
          <div className="px-4 py-3 space-y-3">
            <Link
              href="/listings"
              className="block text-sm text-gray-700 hover:text-teal-500 font-medium"
              onClick={() => setOpen(false)}
            >
              Find a Specialist
            </Link>
            <Link
              href="/categories/reproductive-endocrinologists"
              className="block text-sm text-gray-700 hover:text-teal-500 font-medium"
              onClick={() => setOpen(false)}
            >
              REI Specialists
            </Link>
            <Link
              href="/categories/fertility-clinics"
              className="block text-sm text-gray-700 hover:text-teal-500 font-medium"
              onClick={() => setOpen(false)}
            >
              Fertility Clinics
            </Link>
            <Link
              href="/submit"
              className="block text-sm bg-teal-500 text-white px-4 py-2 rounded-lg text-center font-medium"
              onClick={() => setOpen(false)}
            >
              Add Your Practice
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
