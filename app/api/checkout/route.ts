import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

// Maps tier slug → Stripe price ID env var
const PRICE_MAP: Record<string, string | undefined> = {
  premium: process.env.STRIPE_VERIFIED_PRICE_ID,
  featured: process.env.STRIPE_FEATURED_PRICE_ID,
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const listingId = searchParams.get('listing_id')
    const tier = searchParams.get('tier')

    if (!listingId || !tier) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    const priceId = PRICE_MAP[tier]
    if (!priceId) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fertilityspecialistdirectory.com'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
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

    return NextResponse.redirect(session.url)
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}

