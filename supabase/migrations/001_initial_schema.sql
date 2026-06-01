-- Fertility Specialist Directory — Initial Schema
-- All tables prefixed with fertility_specialist_ to share the Directories Supabase project

-- Main listings table
CREATE TABLE IF NOT EXISTS fertility_specialist_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  npi_number TEXT,
  full_name TEXT NOT NULL,
  credentials TEXT,
  practice_name TEXT,
  provider_type TEXT NOT NULL DEFAULT 'rei',
  -- rei | obgyn | acupuncturist | mental_health | nutritionist
  -- urologist | surrogacy_agency | egg_donation_agency | clinic | other
  bio TEXT,
  headshot_url TEXT,
  phone TEXT,
  website TEXT,
  booking_url TEXT,
  email TEXT, -- not publicly exposed; used for claim/outreach only
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,

  -- Association / credential flags
  sart_member BOOLEAN NOT NULL DEFAULT FALSE,
  asrm_member BOOLEAN NOT NULL DEFAULT FALSE,
  resolve_member BOOLEAN NOT NULL DEFAULT FALSE,
  rei_board_certified BOOLEAN NOT NULL DEFAULT FALSE,

  -- Treatment offerings (filterable)
  offers_ivf BOOLEAN NOT NULL DEFAULT FALSE,
  offers_iui BOOLEAN NOT NULL DEFAULT FALSE,
  offers_egg_freezing BOOLEAN NOT NULL DEFAULT FALSE,
  offers_egg_donation BOOLEAN NOT NULL DEFAULT FALSE,
  offers_genetic_testing BOOLEAN NOT NULL DEFAULT FALSE,
  lgbtq_affirming BOOLEAN NOT NULL DEFAULT FALSE,
  accepts_telehealth BOOLEAN NOT NULL DEFAULT FALSE,
  accepting_new_patients BOOLEAN NOT NULL DEFAULT TRUE,
  male_factor_expertise BOOLEAN NOT NULL DEFAULT FALSE,

  -- Arrays
  specialties TEXT[] NOT NULL DEFAULT '{}',
  insurance_accepted TEXT[] NOT NULL DEFAULT '{}',
  languages_spoken TEXT[] NOT NULL DEFAULT '{"English"}',

  -- Enrichment
  google_rating NUMERIC(3, 1),
  google_review_count INTEGER,

  -- Listing status / subscription
  listing_tier TEXT NOT NULL DEFAULT 'unclaimed',
  -- unclaimed | free | premium | featured | clinic
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_approved BOOLEAN NOT NULL DEFAULT FALSE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  subscription_expires_at TIMESTAMPTZ,

  -- Source tracking
  source TEXT NOT NULL DEFAULT 'npi',
  -- npi | dataseo | resolve | sart | self_submitted

  -- Email tracking
  do_not_email BOOLEAN NOT NULL DEFAULT FALSE,
  email_source VARCHAR,

  -- Full-text search (maintained by trigger)
  search_vector TSVECTOR,

  -- Audit
  claimed_at TIMESTAMPTZ,
  claimed_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS fsd_listings_search_idx ON fertility_specialist_listings USING GIN (search_vector);
CREATE INDEX IF NOT EXISTS fsd_listings_city_state_idx ON fertility_specialist_listings (city, state);
CREATE INDEX IF NOT EXISTS fsd_listings_tier_idx ON fertility_specialist_listings (listing_tier);
CREATE INDEX IF NOT EXISTS fsd_listings_type_idx ON fertility_specialist_listings (provider_type);
CREATE INDEX IF NOT EXISTS fsd_listings_state_idx ON fertility_specialist_listings (state);
CREATE INDEX IF NOT EXISTS fsd_listings_approved_idx ON fertility_specialist_listings (is_approved, is_active);

-- Trigger: maintain search_vector (can't use GENERATED ALWAYS AS in managed Postgres)
CREATE OR REPLACE FUNCTION fsd_listings_search_vector_trigger()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('english',
    coalesce(NEW.full_name, '') || ' ' ||
    coalesce(NEW.credentials, '') || ' ' ||
    coalesce(NEW.practice_name, '') || ' ' ||
    coalesce(NEW.city, '') || ' ' ||
    coalesce(NEW.state, '') || ' ' ||
    coalesce(NEW.provider_type, '') || ' ' ||
    coalesce(array_to_string(NEW.specialties, ' '), '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER fsd_listings_search_vector_update
  BEFORE INSERT OR UPDATE ON fertility_specialist_listings
  FOR EACH ROW EXECUTE FUNCTION fsd_listings_search_vector_trigger();

-- Trigger: auto-update updated_at
CREATE OR REPLACE FUNCTION fsd_update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER fsd_listings_updated_at
  BEFORE UPDATE ON fertility_specialist_listings
  FOR EACH ROW EXECUTE FUNCTION fsd_update_updated_at();

-- Claims table (token-based custom flow, not Supabase Auth)
CREATE TABLE IF NOT EXISTS fertility_specialist_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES fertility_specialist_listings(id),
  email TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT FALSE,
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  nudge_sent_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS fsd_claims_listing_idx ON fertility_specialist_claims (listing_id);
CREATE INDEX IF NOT EXISTS fsd_claims_token_idx ON fertility_specialist_claims (token);

-- Payments log (append-only)
CREATE TABLE IF NOT EXISTS fertility_specialist_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES fertility_specialist_listings(id),
  stripe_payment_intent_id TEXT,
  stripe_subscription_id TEXT,
  stripe_session_id TEXT,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  tier TEXT NOT NULL, -- premium | featured | clinic
  status TEXT NOT NULL, -- pending | succeeded | failed | canceled
  period_start TIMESTAMPTZ,
  period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS fsd_payments_listing_idx ON fertility_specialist_payments (listing_id);

-- Reviews (moderated)
CREATE TABLE IF NOT EXISTS fertility_specialist_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES fertility_specialist_listings(id),
  reviewer_name TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  body TEXT,
  is_approved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS fsd_reviews_listing_idx ON fertility_specialist_reviews (listing_id);

-- City pages for SEO
CREATE TABLE IF NOT EXISTS fertility_specialist_city_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  state_abbr TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL, -- e.g., "orlando-fl"
  h1_title TEXT,
  meta_description TEXT,
  intro_content TEXT,
  listing_count INTEGER NOT NULL DEFAULT 0,
  UNIQUE(city, state)
);

-- Inbound emails from Resend webhook
CREATE TABLE IF NOT EXISTS fertility_specialist_inbound_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_email TEXT NOT NULL,
  subject TEXT,
  body_text TEXT,
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed BOOLEAN NOT NULL DEFAULT FALSE
);

-- Grant access to service roles
GRANT ALL ON fertility_specialist_listings TO service_role, anon, authenticated;
GRANT ALL ON fertility_specialist_claims TO service_role, anon, authenticated;
GRANT ALL ON fertility_specialist_payments TO service_role, anon, authenticated;
GRANT ALL ON fertility_specialist_reviews TO service_role, anon, authenticated;
GRANT ALL ON fertility_specialist_city_pages TO service_role, anon, authenticated;
GRANT ALL ON fertility_specialist_inbound_emails TO service_role, anon, authenticated;

-- RLS policies
ALTER TABLE fertility_specialist_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE fertility_specialist_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE fertility_specialist_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE fertility_specialist_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE fertility_specialist_city_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE fertility_specialist_inbound_emails ENABLE ROW LEVEL SECURITY;

-- Listings: public read for approved/active; service_role full access
CREATE POLICY "fsd_listings_public_read" ON fertility_specialist_listings
  FOR SELECT USING (is_approved = TRUE AND is_active = TRUE);

CREATE POLICY "fsd_listings_service_all" ON fertility_specialist_listings
  FOR ALL USING (auth.role() = 'service_role');

-- Claims: service_role only
CREATE POLICY "fsd_claims_service_all" ON fertility_specialist_claims
  FOR ALL USING (auth.role() = 'service_role');

-- Payments: service_role only
CREATE POLICY "fsd_payments_service_all" ON fertility_specialist_payments
  FOR ALL USING (auth.role() = 'service_role');

-- Reviews: public read for approved; service_role full access
CREATE POLICY "fsd_reviews_public_read" ON fertility_specialist_reviews
  FOR SELECT USING (is_approved = TRUE);

CREATE POLICY "fsd_reviews_service_all" ON fertility_specialist_reviews
  FOR ALL USING (auth.role() = 'service_role');

-- City pages: public read
CREATE POLICY "fsd_city_pages_public_read" ON fertility_specialist_city_pages
  FOR SELECT USING (TRUE);

CREATE POLICY "fsd_city_pages_service_all" ON fertility_specialist_city_pages
  FOR ALL USING (auth.role() = 'service_role');

-- Inbound emails: service_role only
CREATE POLICY "fsd_inbound_emails_service_all" ON fertility_specialist_inbound_emails
  FOR ALL USING (auth.role() = 'service_role');

-- Proximity search RPC
CREATE OR REPLACE FUNCTION find_fertility_specialists_near(
  search_lat DOUBLE PRECISION,
  search_lng DOUBLE PRECISION,
  radius_miles INTEGER DEFAULT 25,
  result_limit INTEGER DEFAULT 50
)
RETURNS SETOF fertility_specialist_listings AS $$
  SELECT *
  FROM fertility_specialist_listings
  WHERE
    is_approved = TRUE
    AND is_active = TRUE
    AND latitude IS NOT NULL
    AND longitude IS NOT NULL
    AND (
      3959 * acos(
        LEAST(1.0,
          cos(radians(search_lat)) * cos(radians(latitude)) *
          cos(radians(longitude) - radians(search_lng)) +
          sin(radians(search_lat)) * sin(radians(latitude))
        )
      )
    ) <= radius_miles
  ORDER BY
    listing_tier DESC,
    (
      3959 * acos(
        LEAST(1.0,
          cos(radians(search_lat)) * cos(radians(latitude)) *
          cos(radians(longitude) - radians(search_lng)) +
          sin(radians(search_lat)) * sin(radians(latitude))
        )
      )
    ) ASC
  LIMIT result_limit;
$$ LANGUAGE sql STABLE;

GRANT EXECUTE ON FUNCTION find_fertility_specialists_near TO service_role, anon, authenticated;
