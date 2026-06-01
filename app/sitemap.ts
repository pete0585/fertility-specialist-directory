import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://fertilityspecialistdirectory.com'

const CATEGORIES = [
  'reproductive-endocrinologists',
  'fertility-clinics',
  'fertility-acupuncturists',
  'fertility-counselors',
  'lgbtq-fertility',
  'surrogacy-agencies',
  'egg-freezing',
  'male-fertility',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  const { data: listings } = await supabase
    .from('fertility_specialist_listings')
    .select('slug, updated_at')
    .eq('is_approved', true)
    .eq('is_active', true)
    .order('updated_at', { ascending: false })

  const listingUrls: MetadataRoute.Sitemap = (listings ?? []).map((l) => ({
    url: `${SITE_URL}/listings/${l.slug}`,
    lastModified: new Date(l.updated_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const categoryUrls: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${SITE_URL}/categories/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const staticUrls: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/listings`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/submit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  return [...staticUrls, ...categoryUrls, ...listingUrls]
}
