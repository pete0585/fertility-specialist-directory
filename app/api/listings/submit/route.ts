import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { z } from 'zod'
import { buildListingSlug } from '@/lib/utils'

const schema = z.object({
  full_name: z.string().min(2).max(100),
  credentials: z.string().max(100).optional(),
  practice_name: z.string().max(150).optional(),
  provider_type: z.enum([
    'rei', 'obgyn', 'acupuncturist', 'mental_health', 'nutritionist',
    'urologist', 'surrogacy_agency', 'egg_donation_agency', 'clinic', 'other',
  ]),
  bio: z.string().max(1500).optional(),
  phone: z.string().max(20).optional(),
  website: z.string().url().max(200).optional().or(z.literal('')),
  booking_url: z.string().url().max(200).optional().or(z.literal('')),
  email: z.string().email(),
  address_line1: z.string().max(150).optional(),
  city: z.string().min(2).max(100),
  state: z.string().min(2).max(50),
  zip: z.string().max(10).optional(),
  specialties: z.array(z.string()).optional(),
  lgbtq_affirming: z.boolean().optional(),
  accepts_telehealth: z.boolean().optional(),
  accepting_new_patients: z.boolean().optional(),
  offers_ivf: z.boolean().optional(),
  offers_iui: z.boolean().optional(),
  offers_egg_freezing: z.boolean().optional(),
  sart_member: z.boolean().optional(),
})

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 422 }
    )
  }

  const data = parsed.data
  const supabase = await createServiceClient()

  const baseSlug = buildListingSlug(data.full_name, data.city, data.state)

  // Ensure unique slug
  let slug = baseSlug
  let attempts = 0
  while (attempts < 10) {
    const { data: existing } = await supabase
      .from('fertility_specialist_listings')
      .select('id')
      .eq('slug', slug)
      .single()
    if (!existing) break
    attempts++
    slug = `${baseSlug}-${attempts}`
  }

  const { error } = await supabase.from('fertility_specialist_listings').insert({
    slug,
    full_name: data.full_name,
    credentials: data.credentials ?? null,
    practice_name: data.practice_name ?? null,
    provider_type: data.provider_type,
    bio: data.bio ?? null,
    phone: data.phone ?? null,
    website: data.website || null,
    booking_url: data.booking_url || null,
    email: data.email,
    address_line1: data.address_line1 ?? null,
    city: data.city,
    state: data.state,
    zip: data.zip ?? null,
    specialties: data.specialties ?? [],
    insurance_accepted: [],
    languages_spoken: ['English'],
    lgbtq_affirming: data.lgbtq_affirming ?? false,
    accepts_telehealth: data.accepts_telehealth ?? false,
    accepting_new_patients: data.accepting_new_patients ?? true,
    offers_ivf: data.offers_ivf ?? false,
    offers_iui: data.offers_iui ?? false,
    offers_egg_freezing: data.offers_egg_freezing ?? false,
    sart_member: data.sart_member ?? false,
    listing_tier: 'unclaimed',
    is_verified: false,
    is_active: true,
    is_approved: false, // admin review required
    source: 'self_submitted',
  })

  if (error) {
    console.error('Failed to insert listing:', error)
    return NextResponse.json({ error: 'Failed to save listing' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
