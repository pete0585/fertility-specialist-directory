import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import ListingCard from '@/components/ListingCard'
import type { Listing } from '@/lib/types'

interface PageProps {
  params: Promise<{ slug: string }>
}

const CATEGORY_CONFIG: Record<string, {
  title: string
  description: string
  providerType?: string
  filter?: Record<string, unknown>
  metaTitle: string
  metaDescription: string
}> = {
  'reproductive-endocrinologists': {
    title: 'Reproductive Endocrinologists',
    description:
      'Board-certified REI subspecialists trained in complex infertility diagnoses and ART treatments including IVF. The highest level of fertility specialty care.',
    providerType: 'rei',
    metaTitle: 'Reproductive Endocrinologists Directory — Find a REI Specialist Near You',
    metaDescription:
      'Find a board-certified reproductive endocrinologist (REI) near you. 1,000+ fertility specialists indexed by city and specialty.',
  },
  'fertility-clinics': {
    title: 'Fertility Clinics',
    description:
      'Accredited fertility centers and IVF labs across the US. Many are SART members with public IVF success rate data.',
    providerType: 'clinic',
    metaTitle: 'Fertility Clinics Directory — Find an IVF Clinic Near You',
    metaDescription:
      'Find a fertility clinic near you. Browse SART-member IVF labs, egg freezing centers, and full-service fertility practices.',
  },
  'fertility-acupuncturists': {
    title: 'Fertility Acupuncturists',
    description:
      'Integrative practitioners specializing in acupuncture and traditional medicine support during fertility treatments and IVF cycles.',
    providerType: 'acupuncturist',
    metaTitle: 'Fertility Acupuncturists Directory — Find Integrative Fertility Support',
    metaDescription:
      'Find a fertility acupuncturist near you. Browse practitioners specializing in integrative support during IVF and fertility treatments.',
  },
  'fertility-counselors': {
    title: 'Fertility Counselors & Therapists',
    description:
      'Mental health professionals specializing in the emotional journey of infertility, pregnancy loss, IVF, and third-party reproduction.',
    providerType: 'mental_health',
    metaTitle: 'Fertility Counselors Directory — Mental Health Support for Infertility',
    metaDescription:
      'Find a fertility counselor or therapist near you. Specialists in infertility grief, IVF stress, and pregnancy loss.',
  },
  'lgbtq-fertility': {
    title: 'LGBTQ+ Affirming Fertility Specialists',
    description:
      'Fertility specialists who actively create inclusive, affirming environments for LGBTQ+ individuals and couples building families.',
    filter: { lgbtq_affirming: true },
    metaTitle: 'LGBTQ+ Fertility Specialists — Find Affirming IVF Doctors Near You',
    metaDescription:
      'Find LGBTQ+-affirming fertility specialists near you. Inclusive reproductive endocrinologists, IVF clinics, and fertility counselors.',
  },
  'surrogacy-agencies': {
    title: 'Surrogacy & Egg Donation Agencies',
    description:
      'Agencies specializing in gestational surrogacy, traditional surrogacy, egg donation, and embryo donation programs.',
    providerType: 'surrogacy_agency',
    metaTitle: 'Surrogacy & Egg Donation Agencies Directory',
    metaDescription:
      'Find a surrogacy or egg donation agency near you. Browse accredited agencies supporting third-party reproduction.',
  },
  'egg-freezing': {
    title: 'Egg Freezing Specialists',
    description:
      'Fertility specialists offering elective egg freezing (oocyte cryopreservation) for future family planning.',
    filter: { offers_egg_freezing: true },
    metaTitle: 'Egg Freezing Specialists Directory — Find an Egg Freezing Doctor Near You',
    metaDescription:
      'Find an egg freezing specialist near you. Browse fertility doctors offering elective egg freezing and fertility preservation.',
  },
  'male-fertility': {
    title: 'Male Factor Fertility Specialists',
    description:
      'Reproductive urologists and fertility specialists with expertise in diagnosing and treating male factor infertility.',
    filter: { male_factor_expertise: true },
    metaTitle: 'Male Factor Fertility Specialists — Find a Male Infertility Doctor',
    metaDescription:
      'Find a male fertility specialist near you. Reproductive urologists and fertility doctors specializing in male factor infertility.',
  },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const config = CATEGORY_CONFIG[slug]
  if (!config) return {}

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: { canonical: `/categories/${slug}` },
  }
}

export async function generateStaticParams() {
  return Object.keys(CATEGORY_CONFIG).map((slug) => ({ slug }))
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const config = CATEGORY_CONFIG[slug]
  if (!config) notFound()

  const supabase = await createClient()
  let query = supabase
    .from('fertility_specialist_listings')
    .select('*')
    .eq('is_approved', true)
    .eq('is_active', true)

  if (config.providerType) {
    query = query.eq('provider_type', config.providerType)
  }

  if (config.filter) {
    for (const [key, value] of Object.entries(config.filter)) {
      query = query.eq(key, value)
    }
  }

  query = query
    .order('listing_tier', { ascending: false })
    .order('is_verified', { ascending: false })
    .limit(48)

  const { data } = await query
  const listings = (data ?? []) as Listing[]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: config.title,
    numberOfItems: listings.length,
    itemListElement: listings.slice(0, 10).map((l, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'MedicalBusiness',
        name: l.full_name,
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fertilityspecialistdirectory.com'}/listings/${l.slug}`,
      },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1.5" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-teal-500">Home</Link>
          <span>/</span>
          <span className="text-gray-600">{config.title}</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-3">{config.title}</h1>
          <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">{config.description}</p>
          <p className="text-sm text-teal-500 mt-3 font-medium">
            {listings.length} specialist{listings.length !== 1 ? 's' : ''} listed
          </p>
        </div>

        {listings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <p className="text-gray-400 text-lg mb-4">No listings yet in this category</p>
            <Link
              href="/submit"
              className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
            >
              Be the first to list →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                featured={['featured', 'clinic'].includes(listing.listing_tier)}
              />
            ))}
          </div>
        )}

        {listings.length >= 48 && (
          <div className="text-center mt-10">
            <Link
              href={`/listings${config.providerType ? `?type=${config.providerType}` : ''}`}
              className="inline-block text-teal-500 hover:text-teal-600 font-medium text-sm"
            >
              View all specialists in this category →
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
