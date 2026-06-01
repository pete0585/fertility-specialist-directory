import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

export const STRIPE_PRICE_IDS = {
  premium: process.env.STRIPE_PRICE_ID_PREMIUM!,
  featured: process.env.STRIPE_PRICE_ID_FEATURED!,
  clinic: process.env.STRIPE_PRICE_ID_CLINIC!,
} as const

export type UpgradeTier = keyof typeof STRIPE_PRICE_IDS

export const TIER_PRICES: Record<UpgradeTier, number> = {
  premium: 29900, // $299/year in cents
  featured: 49900, // $499/year in cents
  clinic: 79900,  // $799/year in cents
}

export const TIER_LABELS_STRIPE: Record<UpgradeTier, string> = {
  premium: 'Premium ($299/year)',
  featured: 'Featured ($499/year)',
  clinic: 'Clinic ($799/year)',
}
