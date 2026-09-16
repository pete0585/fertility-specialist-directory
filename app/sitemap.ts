import {articles as editorialArticles} from '@/lib/editorial-blog'
import { existsSync, readdirSync } from 'fs'
import { join } from 'path'
import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 3600

const BASE =
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

function getCityPageSlugs(): string[] {
  const dir = join(process.cwd(), 'app/fertility-specialists')
  if (!existsSync(dir)) return []

  return readdirSync(dir, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() && existsSync(join(dir, entry.name, 'page.tsx'))
    )
    .map((entry) => entry.name)
    .sort()
}

async function originalSitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  const { data: listings } = await supabase
    .from('fertility_specialist_listings')
    .select('slug, updated_at')
    .eq('is_approved', true)
    .eq('is_active', true)
    .order('updated_at', { ascending: false })
    .limit(1000)

  const listingUrls: MetadataRoute.Sitemap = (listings ?? []).map((l) => ({
    url: `${BASE}/listings/${l.slug}`,
    lastModified: new Date(l.updated_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const categoryUrls: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${BASE}/categories/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const cityUrls: MetadataRoute.Sitemap = getCityPageSlugs().map((slug) => ({
    url: `${BASE}/fertility-specialists/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const staticUrls: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/listings`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/submit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  return [...staticUrls, ...categoryUrls, ...cityUrls, ...listingUrls]
}

export default async function editorialSitemap():Promise<MetadataRoute.Sitemap>{const existing=await originalSitemap();const site="https://fertilityspecialistdirectory.com";return [...existing,{url:site+'/blog',changeFrequency:'weekly'},...editorialArticles().map(p=>({url:site+'/blog/'+p.slug,lastModified:new Date(p.date),changeFrequency:'monthly' as const}))]}
