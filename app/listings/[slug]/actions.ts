'use server'

import { redirect } from 'next/navigation'
import { stripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'
import type { UpgradeTier } from '@/lib/stripe'

const PRICE_IDS: Record<UpgradeTier, string> = {
  premium: process.env.STRIPE_PRICE_ID_PREMIUM!,
  featured: process.env.STRIPE_PRICE_ID_FEATURED!,
  clinic: process.env.STRIPE_PRICE_ID_CLINIC!,
}

export async function createCheckoutSession(listingId: string, tier: UpgradeTier) {
  const supabase = await createServiceClient()
  const { data: listing } = await supabase
    .from('fertility_specialist_listings')
    .select('id, full_name, email, stripe_customer_id')
    .eq('id', listingId)
    .single()

  if (!listing) {
    throw new Error('Listing not found')
  }

  const priceId = PRICE_IDS[tier]
  if (!priceId) {
    throw new Error(`Unknown tier: ${tier}`)
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fertilityspecialistdirectory.com'

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: listing.email ?? undefined,
    customer: listing.stripe_customer_id ?? undefined,
    allow_promotion_codes: true,
    metadata: {
      listing_id: listingId,
      tier,
    },
    success_url: `${siteUrl}/listings/${listing.id}?verified=true`,
    cancel_url: `${siteUrl}/listings/${listing.id}`,
  })

  redirect(session.url!)
}
