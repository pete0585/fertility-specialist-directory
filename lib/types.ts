export type ProviderType =
  | 'rei'
  | 'obgyn'
  | 'acupuncturist'
  | 'mental_health'
  | 'nutritionist'
  | 'urologist'
  | 'surrogacy_agency'
  | 'egg_donation_agency'
  | 'clinic'
  | 'other'

export type ListingTier = 'unclaimed' | 'free' | 'premium' | 'featured' | 'clinic'

export type ListingSource = 'npi' | 'dataseo' | 'resolve' | 'sart' | 'self_submitted'

export interface Listing {
  id: string
  slug: string
  npi_number: string | null
  full_name: string
  credentials: string | null
  practice_name: string | null
  provider_type: ProviderType
  bio: string | null
  headshot_url: string | null
  phone: string | null
  website: string | null
  booking_url: string | null
  email: string | null
  address_line1: string | null
  address_line2: string | null
  city: string
  state: string
  zip: string | null
  latitude: number | null
  longitude: number | null

  sart_member: boolean
  asrm_member: boolean
  resolve_member: boolean
  rei_board_certified: boolean

  offers_ivf: boolean
  offers_iui: boolean
  offers_egg_freezing: boolean
  offers_egg_donation: boolean
  offers_genetic_testing: boolean
  lgbtq_affirming: boolean
  accepts_telehealth: boolean
  accepting_new_patients: boolean
  male_factor_expertise: boolean

  specialties: string[]
  insurance_accepted: string[]
  languages_spoken: string[]

  google_rating: number | null
  google_review_count: number | null

  listing_tier: ListingTier
  is_verified: boolean
  is_active: boolean
  is_approved: boolean
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  subscription_expires_at: string | null

  source: ListingSource
  do_not_email: boolean
  email_source: string | null

  claimed_at: string | null
  claimed_by: string | null
  created_at: string
  updated_at: string
}

export interface Claim {
  id: string
  listing_id: string
  email: string
  token: string
  verified: boolean
  verified_at: string | null
  created_at: string
  expires_at: string
  nudge_sent_at: string | null
}

export interface Payment {
  id: string
  listing_id: string
  stripe_payment_intent_id: string | null
  stripe_subscription_id: string | null
  stripe_session_id: string | null
  amount_cents: number
  currency: string
  tier: string
  status: string
  period_start: string | null
  period_end: string | null
  created_at: string
}

export interface Review {
  id: string
  listing_id: string
  reviewer_name: string | null
  rating: number | null
  body: string | null
  is_approved: boolean
  created_at: string
}

export interface CityPage {
  id: string
  city: string
  state: string
  state_abbr: string
  slug: string
  h1_title: string | null
  meta_description: string | null
  intro_content: string | null
  listing_count: number
}

export const PROVIDER_TYPE_LABELS: Record<ProviderType, string> = {
  rei: 'Reproductive Endocrinologist',
  obgyn: 'OB-GYN (Fertility Focus)',
  acupuncturist: 'Fertility Acupuncturist',
  mental_health: 'Fertility Counselor',
  nutritionist: 'Fertility Nutritionist',
  urologist: 'Urologist (Male Factor)',
  surrogacy_agency: 'Surrogacy Agency',
  egg_donation_agency: 'Egg Donation Agency',
  clinic: 'Fertility Clinic',
  other: 'Other Specialist',
}

export const TIER_LABELS: Record<ListingTier, string> = {
  unclaimed: 'Unclaimed',
  free: 'Free',
  premium: 'Premium',
  featured: 'Featured',
  clinic: 'Clinic',
}

export const SPECIALTY_OPTIONS = [
  'IVF',
  'IUI',
  'Egg Freezing',
  'PCOS',
  'Endometriosis',
  'Recurrent Pregnancy Loss',
  'Male Factor Infertility',
  'Genetic Counseling / PGT',
  'Donor Eggs',
  'Donor Sperm',
  'Surrogacy',
  'LGBTQ+ Family Building',
  'Fertility Preservation',
  'Holistic / Integrative',
] as const
