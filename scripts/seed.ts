/**
 * Seed script for Fertility Specialist Directory
 *
 * Sources:
 * 1. NPI Registry (taxonomy 207VE0102X - Reproductive Endocrinology)
 * 2. Sample data for development testing
 *
 * Run: npm run seed
 *
 * Requires: SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL in .env
 */

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const TABLE = 'fertility_specialist_listings'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function buildSlug(name: string, city: string, state: string): string {
  return `${slugify(name)}-${slugify(city)}-${state.toLowerCase()}`
}

interface NpiResult {
  number: string
  basic: {
    first_name?: string
    last_name?: string
    middle_name?: string
    credential?: string
    gender?: string
  }
  addresses: Array<{
    address_type: string
    address_1: string
    city: string
    state: string
    postal_code: string
    telephone_number?: string
  }>
  taxonomies: Array<{
    code: string
    desc: string
    primary: boolean
  }>
}

async function fetchNpiByTaxonomy(
  taxonomyCode: string,
  stateAbbr: string,
  limit = 200
): Promise<NpiResult[]> {
  const url = new URL('https://npiregistry.cms.hhs.gov/api/')
  url.searchParams.set('version', '2.1')
  url.searchParams.set('taxonomy_description', getTaxonomyDesc(taxonomyCode))
  url.searchParams.set('state', stateAbbr)
  url.searchParams.set('enumeration_type', 'NPI-1')
  url.searchParams.set('limit', String(limit))

  const res = await fetch(url.toString())
  if (!res.ok) return []
  const data = await res.json()
  return data.results ?? []
}

function getTaxonomyDesc(code: string): string {
  const map: Record<string, string> = {
    '207VE0102X': 'Reproductive+Endocrinology',
    '207V00000X': 'Obstetrics+%26+Gynecology',
  }
  return map[code] ?? code
}

async function seedFromNpi(states: string[], taxonomyCode = '207VE0102X') {
  console.log(`\nSeeding from NPI (taxonomy ${taxonomyCode})...`)
  let total = 0

  for (const state of states) {
    console.log(`  Fetching ${state}...`)
    const results = await fetchNpiByTaxonomy(taxonomyCode, state)
    console.log(`  Found ${results.length} providers in ${state}`)

    for (const result of results) {
      const basic = result.basic
      const firstName = basic.first_name ?? ''
      const lastName = basic.last_name ?? ''
      const fullName = `${firstName} ${lastName}`.trim()
      if (!fullName) continue

      const practiceAddr = result.addresses.find(
        (a) => a.address_type === 'LOCATION'
      ) ?? result.addresses[0]
      if (!practiceAddr) continue

      const city = practiceAddr.city ?? ''
      const addrState = practiceAddr.state ?? state
      const zip = practiceAddr.postal_code?.slice(0, 5) ?? ''
      const phone = practiceAddr.telephone_number ?? null

      const slug = buildSlug(fullName + (basic.credential ? '-' + basic.credential : ''), city, addrState)

      const record = {
        slug,
        npi_number: result.number,
        full_name: fullName,
        credentials: basic.credential ?? null,
        practice_name: null as string | null,
        provider_type: 'rei',
        bio: null as string | null,
        headshot_url: null as string | null,
        phone,
        website: null as string | null,
        booking_url: null as string | null,
        email: null as string | null,
        address_line1: practiceAddr.address_1 ?? null,
        city,
        state: addrState,
        zip: zip || null,
        latitude: null as number | null,
        longitude: null as number | null,
        sart_member: false,
        asrm_member: false,
        resolve_member: false,
        rei_board_certified: false,
        offers_ivf: false,
        offers_iui: false,
        offers_egg_freezing: false,
        offers_egg_donation: false,
        offers_genetic_testing: false,
        lgbtq_affirming: false,
        accepts_telehealth: false,
        accepting_new_patients: true,
        male_factor_expertise: false,
        specialties: [] as string[],
        insurance_accepted: [] as string[],
        languages_spoken: ['English'],
        google_rating: null as number | null,
        google_review_count: null as number | null,
        listing_tier: 'unclaimed',
        is_verified: false,
        is_active: true,
        is_approved: true, // NPI data is auto-approved as stub listings
        source: 'npi',
        do_not_email: false,
      }

      const { error } = await supabase.from(TABLE).upsert(record, {
        onConflict: 'slug',
        ignoreDuplicates: true,
      })

      if (error && !error.message.includes('duplicate')) {
        console.error(`  Error inserting ${fullName}:`, error.message)
      } else {
        total++
      }
    }

    // Respect NPI rate limits
    await new Promise((r) => setTimeout(r, 1000))
  }

  console.log(`NPI seed complete: ${total} records processed`)
}

// Development sample data
const SAMPLE_LISTINGS = [
  {
    full_name: 'Dr. Sarah Chen',
    credentials: 'MD, FACOG, REI',
    practice_name: 'Boston Fertility Center',
    provider_type: 'rei',
    bio: 'Board-certified reproductive endocrinologist specializing in IVF, egg freezing, and LGBTQ+ family building. Trained at Massachusetts General Hospital.',
    city: 'Boston',
    state: 'Massachusetts',
    zip: '02115',
    phone: '6175550100',
    website: 'https://bostonfertilitycenter.com',
    sart_member: true,
    rei_board_certified: true,
    offers_ivf: true,
    offers_iui: true,
    offers_egg_freezing: true,
    lgbtq_affirming: true,
    accepting_new_patients: true,
    specialties: ['IVF', 'Egg Freezing', 'LGBTQ+ Family Building', 'PCOS'],
    listing_tier: 'featured',
    is_verified: true,
    is_approved: true,
  },
  {
    full_name: 'Dr. Michael Torres',
    credentials: 'MD, PhD',
    practice_name: 'Los Angeles Reproductive Medicine',
    provider_type: 'rei',
    bio: 'Reproductive endocrinologist with over 15 years of experience in complex IVF cases, recurrent pregnancy loss, and male factor infertility.',
    city: 'Los Angeles',
    state: 'California',
    zip: '90024',
    phone: '3105550200',
    website: 'https://lareproductivemedicine.com',
    sart_member: true,
    rei_board_certified: true,
    offers_ivf: true,
    offers_iui: true,
    offers_egg_freezing: true,
    offers_genetic_testing: true,
    male_factor_expertise: true,
    accepting_new_patients: true,
    specialties: ['IVF', 'Recurrent Pregnancy Loss', 'Male Factor Infertility', 'PGT Genetic Testing'],
    listing_tier: 'premium',
    is_verified: true,
    is_approved: true,
  },
  {
    full_name: 'Dr. Amanda Wilson',
    credentials: 'MD, FACOG',
    practice_name: 'Texas Fertility Center',
    provider_type: 'rei',
    bio: 'Specializing in PCOS, unexplained infertility, and fertility preservation for cancer patients. Named Top Doctor in Austin multiple years.',
    city: 'Austin',
    state: 'Texas',
    zip: '78701',
    phone: '5125550300',
    website: 'https://texasfertilitycenter.com',
    sart_member: true,
    rei_board_certified: true,
    offers_ivf: true,
    offers_iui: true,
    offers_egg_freezing: true,
    lgbtq_affirming: true,
    accepting_new_patients: true,
    specialties: ['IVF', 'PCOS', 'Fertility Preservation', 'Egg Freezing'],
    listing_tier: 'featured',
    is_verified: true,
    is_approved: true,
  },
  {
    full_name: 'Jennifer Park',
    credentials: 'LAc, FABORM',
    practice_name: 'Park Acupuncture & Fertility',
    provider_type: 'acupuncturist',
    bio: 'Licensed acupuncturist board certified in reproductive medicine. 12 years specializing in fertility support alongside IVF cycles.',
    city: 'Chicago',
    state: 'Illinois',
    zip: '60657',
    phone: '3125550400',
    website: 'https://parkfertilityacupuncture.com',
    accepts_telehealth: false,
    accepting_new_patients: true,
    specialties: ['Fertility Support', 'IVF Support', 'Holistic / Integrative'],
    listing_tier: 'premium',
    is_verified: true,
    is_approved: true,
  },
  {
    full_name: 'Dr. Rachel Kim',
    credentials: 'PhD, LCSW',
    practice_name: 'Fertility Wellness Counseling',
    provider_type: 'mental_health',
    bio: 'Therapist specializing in infertility grief, pregnancy loss, IVF stress, and third-party reproduction. Telehealth available nationwide.',
    city: 'Seattle',
    state: 'Washington',
    zip: '98101',
    phone: '2065550500',
    website: 'https://fertilitywellnesscounseling.com',
    accepts_telehealth: true,
    accepting_new_patients: true,
    lgbtq_affirming: true,
    specialties: ['Fertility Support', 'LGBTQ+ Family Building'],
    listing_tier: 'free',
    is_verified: false,
    is_approved: true,
  },
]

async function seedSamples() {
  console.log('\nSeeding sample listings...')
  for (const sample of SAMPLE_LISTINGS) {
    const slug = buildSlug(sample.full_name, sample.city, sample.state)
    const record = {
      slug,
      npi_number: null,
      full_name: sample.full_name,
      credentials: sample.credentials ?? null,
      practice_name: sample.practice_name ?? null,
      provider_type: sample.provider_type,
      bio: sample.bio ?? null,
      headshot_url: null,
      phone: sample.phone ?? null,
      website: sample.website ?? null,
      booking_url: null,
      email: null,
      address_line1: null,
      city: sample.city,
      state: sample.state,
      zip: sample.zip ?? null,
      latitude: null,
      longitude: null,
      sart_member: (sample as Record<string, unknown>).sart_member ?? false,
      asrm_member: false,
      resolve_member: false,
      rei_board_certified: (sample as Record<string, unknown>).rei_board_certified ?? false,
      offers_ivf: (sample as Record<string, unknown>).offers_ivf ?? false,
      offers_iui: (sample as Record<string, unknown>).offers_iui ?? false,
      offers_egg_freezing: (sample as Record<string, unknown>).offers_egg_freezing ?? false,
      offers_egg_donation: false,
      offers_genetic_testing: (sample as Record<string, unknown>).offers_genetic_testing ?? false,
      lgbtq_affirming: (sample as Record<string, unknown>).lgbtq_affirming ?? false,
      accepts_telehealth: (sample as Record<string, unknown>).accepts_telehealth ?? false,
      accepting_new_patients: (sample as Record<string, unknown>).accepting_new_patients ?? true,
      male_factor_expertise: (sample as Record<string, unknown>).male_factor_expertise ?? false,
      specialties: sample.specialties ?? [],
      insurance_accepted: [],
      languages_spoken: ['English'],
      google_rating: null,
      google_review_count: null,
      listing_tier: sample.listing_tier,
      is_verified: sample.is_verified,
      is_active: true,
      is_approved: sample.is_approved,
      source: 'self_submitted',
      do_not_email: false,
    }

    const { error } = await supabase.from(TABLE).upsert(record, {
      onConflict: 'slug',
      ignoreDuplicates: false,
    })

    if (error) {
      console.error(`Error seeding ${sample.full_name}:`, error.message)
    } else {
      console.log(`  ✓ ${sample.full_name} (${sample.city}, ${sample.state})`)
    }
  }
}

async function main() {
  const args = process.argv.slice(2)
  const mode = args[0] ?? 'samples'

  console.log('Fertility Specialist Directory — Seed Script')
  console.log('============================================')

  if (mode === 'samples') {
    await seedSamples()
  } else if (mode === 'npi') {
    // Major states with high REI concentrations
    const states = ['NY', 'CA', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MA',
      'WA', 'AZ', 'CO', 'MN', 'MD', 'VA', 'NJ', 'CT', 'OR', 'TN',
      'MO', 'WI', 'IN', 'LA', 'MI', 'KY', 'SC', 'UT', 'NV', 'OK',
      'KS', 'MS', 'AR', 'NE', 'NM', 'ID', 'WV', 'RI', 'ME', 'NH',
      'DE', 'MT', 'SD', 'ND', 'AK', 'VT', 'WY', 'HI', 'DC']
    await seedFromNpi(states)
  } else if (mode === 'npi-top') {
    // Top 10 states only — faster for initial seed
    const topStates = ['NY', 'CA', 'TX', 'FL', 'IL', 'PA', 'MA', 'WA', 'CO', 'AZ']
    await seedFromNpi(topStates)
  } else {
    console.log('Usage: npm run seed [samples|npi|npi-top]')
    console.log('  samples  — Load 5 sample listings (default, for dev)')
    console.log('  npi      — Pull all REI specialists from NPI across all 50 states')
    console.log('  npi-top  — Pull REIs from top 10 states only')
  }

  console.log('\nDone.')
  process.exit(0)
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
