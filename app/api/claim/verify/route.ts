import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fertilityspecialistdirectory.com'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  const listingId = searchParams.get('listing_id')

  if (!token || !listingId) {
    return NextResponse.redirect(`${SITE_URL}/claim/${listingId ?? ''}?error=invalid-or-expired-token`)
  }

  const supabase = await createServiceClient()

  const { data: claim } = await supabase
    .from('fertility_specialist_claims')
    .select('*')
    .eq('token', token)
    .eq('listing_id', listingId)
    .eq('verified', false)
    .gt('expires_at', new Date().toISOString())
    .single()

  if (!claim) {
    return NextResponse.redirect(`${SITE_URL}/claim/${listingId}?error=invalid-or-expired-token`)
  }

  const now = new Date().toISOString()

  // Mark claim as verified — both verified=true and verified_at required
  await supabase
    .from('fertility_specialist_claims')
    .update({ verified: true, verified_at: now })
    .eq('id', claim.id)

  // Update the listing to claimed/free tier
  await supabase
    .from('fertility_specialist_listings')
    .update({
      listing_tier: 'free',
      claimed_at: now,
    })
    .eq('id', listingId)

  return NextResponse.redirect(`${SITE_URL}/claim/${listingId}?verified=true`)
}
