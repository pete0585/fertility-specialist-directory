import type { Metadata } from 'next'
import { createServiceClient } from '@/lib/supabase/server'
import AdminTable from '@/components/AdminTable'
import type { Listing } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Admin — Fertility Specialist Directory',
}

export default async function AdminPage() {
  const supabase = await createServiceClient()

  const { data: pending } = await supabase
    .from('fertility_specialist_listings')
    .select('*')
    .eq('is_approved', false)
    .order('created_at', { ascending: false })
    .limit(100)

  const { data: recent } = await supabase
    .from('fertility_specialist_listings')
    .select('*')
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
    .limit(20)

  const { count: totalCount } = await supabase
    .from('fertility_specialist_listings')
    .select('*', { count: 'exact', head: true })

  const { count: claimedCount } = await supabase
    .from('fertility_specialist_listings')
    .select('*', { count: 'exact', head: true })
    .not('claimed_at', 'is', null)

  const { count: paidCount } = await supabase
    .from('fertility_specialist_listings')
    .select('*', { count: 'exact', head: true })
    .in('listing_tier', ['premium', 'featured', 'clinic'])

  return (
    <div className="space-y-8">
      <h1 className="font-serif text-3xl font-bold text-gray-900">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Listings', value: totalCount ?? 0 },
          { label: 'Claimed', value: claimedCount ?? 0 },
          { label: 'Paying', value: paidCount ?? 0 },
          { label: 'Pending Review', value: pending?.length ?? 0 },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
            <div className="text-3xl font-bold text-teal-600">{stat.value}</div>
            <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Pending approval */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-serif font-bold text-xl text-gray-900 mb-5">
          Pending Approval ({pending?.length ?? 0})
        </h2>
        <AdminTable listings={(pending ?? []) as Listing[]} />
      </div>

      {/* Recently approved */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-serif font-bold text-xl text-gray-900 mb-5">
          Recently Approved
        </h2>
        <AdminTable listings={(recent ?? []) as Listing[]} />
      </div>
    </div>
  )
}
