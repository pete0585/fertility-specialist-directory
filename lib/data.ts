import { createClient, createAdminClient } from '@/lib/supabase/server'
import type { Listing } from '@/lib/types'

const TABLE = 'fertility_specialist_listings'

export async function getFeaturedListings(limit = 6): Promise<Listing[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .in('listing_tier', ['featured', 'clinic'])
    .order('listing_tier', { ascending: false })
    .limit(limit)
  return (data ?? []) as Listing[]
}

export async function getRecentListings(limit = 8): Promise<Listing[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit)
  return (data ?? []) as Listing[]
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('slug', slug)
    .single()
  return data as Listing | null
}

export async function getListingById(id: string): Promise<Listing | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .single()
  return data as Listing | null
}

export async function getTotalListingCount(): Promise<number> {
  const supabase = await createClient()
  const { count } = await supabase
    .from(TABLE)
    .select('*', { count: 'exact', head: true })
    .eq('is_approved', true)
    .eq('is_active', true)
  return count ?? 0
}

export async function getListingsByCity(city: string, state: string, limit = 20): Promise<Listing[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .ilike('city', city)
    .ilike('state', state)
    .order('listing_tier', { ascending: false })
    .limit(limit)
  return (data ?? []) as Listing[]
}

export async function getListingsByType(providerType: string, limit = 20): Promise<Listing[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from(TABLE)
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)
    .eq('provider_type', providerType)
    .order('listing_tier', { ascending: false })
    .limit(limit)
  return (data ?? []) as Listing[]
}

export async function getAllListingSlugs(): Promise<string[]> {
  // Uses admin client (no cookies) — safe to call from generateStaticParams
  const supabase = createAdminClient()
  const { data } = await supabase
    .from(TABLE)
    .select('slug')
    .eq('is_approved', true)
    .eq('is_active', true)
  return (data ?? []).map((r: { slug: string }) => r.slug)
}
