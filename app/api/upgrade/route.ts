import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'

const PRICE_MAP: Record<string, string | undefined> = {
  premium: process.env.STRIPE_VERIFIED_PRICE_ID,
  featured: process.env.STRIPE_FEATURED_PRICE_ID,
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const { listingId, tier } = body

    if (!listingId || !tier || !PRICE_MAP[tier]) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const priceId = PRICE_MAP[tier]
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    const supabase = createAdminClient()

    const { data: listing, error } = await supabase
      .from('fertility_specialist_listings')
      .select('id, full_name, email')
      .eq('id', listingId)
      .single()

    if (error || !listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fertilityspecialistdirectory.com'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      customer_email: listing.email ?? undefined,
      success_url: `${siteUrl}/claim/${listingId}?upgraded=true&tier=${tier}`,
      cancel_url: `${siteUrl}/claim/${listingId}?verified=true`,
      metadata: {
        listing_id: listingId,
        tier,
      },
      subscription_data: {
        metadata: {
          listing_id: listingId,
          tier,
        },
      },
    })

    if (!session.url) {
      return NextResponse.json({ error: 'No checkout URL' }, { status: 500 })
    }

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Upgrade error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
