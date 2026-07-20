import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'
import { carSlug } from '@/lib/slug'

const SITE_URL = 'https://vdso.nl'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()
  const { data: carsRaw } = await supabase
    .from('cars')
    .select('id, merk, model, jaar, created_at')
    .eq('is_visible', true)
  const cars = carsRaw ?? []

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/aanbod`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/verkopen`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...cars.map(c => ({
      url: `${SITE_URL}/aanbod/${carSlug(c)}`,
      lastModified: new Date(c.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ]
}
