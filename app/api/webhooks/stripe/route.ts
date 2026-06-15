import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'

const HANDLED_EVENTS = new Set([
  'checkout.session.completed',
  'customer.subscription.deleted',
  'invoice.payment_failed',
])

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (!HANDLED_EVENTS.has(event.type)) {
    return NextResponse.json({ received: true })
  }

  const supabase = await createServiceClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const listingId = session.metadata?.listing_id
      const tier = session.metadata?.tier

      if (!listingId || !tier) {
        console.warn('checkout.session.completed missing metadata', session.id)
        break
      }

      const tierRank: Record<string, number> = {
        premium: 1,
        featured: 2,
        clinic: 3,
      }

      const expiresAt = new Date()
      expiresAt.setFullYear(expiresAt.getFullYear() + 1)

      await supabase
        .from('fertility_specialist_listings')
        .update({
          listing_tier: tier,
          is_verified: true,
          stripe_customer_id: session.customer as string | null,
          stripe_subscription_id: session.subscription as string | null,
          subscription_expires_at: expiresAt.toISOString(),
        })
        .eq('id', listingId)

      await supabase.from('fertility_specialist_payments').insert({
        listing_id: listingId,
        stripe_session_id: session.id,
        stripe_subscription_id: session.subscription as string | null,
        amount_cents: session.amount_total ?? 0,
        currency: session.currency ?? 'usd',
        tier,
        status: 'succeeded',
        period_start: new Date().toISOString(),
        period_end: expiresAt.toISOString(),
      })

      console.log(`Upgraded listing ${listingId} to ${tier}`)
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      await supabase
        .from('fertility_specialist_listings')
        .update({
          listing_tier: 'free',
          is_verified: false,
          stripe_subscription_id: null,
          subscription_expires_at: null,
        })
        .eq('stripe_subscription_id', sub.id)

      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      console.warn('Payment failed for subscription:', invoice.subscription)
      break
    }
  }

  return NextResponse.json({ received: true })
}
