import { cache } from 'react'
import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { Car, Settings } from '@/lib/supabase/types'
import { carSlug, carIdFromSlug } from '@/lib/slug'
import CarDetailClient from './CarDetailClient'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const getCar = cache(async (slug: string) => {
  const id = carIdFromSlug(slug)
  if (!UUID_RE.test(id)) return null
  const supabase = await createClient()
  const { data } = await supabase.from('cars').select('*').eq('id', id).eq('is_visible', true).single()
  return data as Car | null
})

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const car = await getCar(slug)
  if (!car) return { title: 'Voertuig niet gevonden' }

  const title = `${car.merk} ${car.model} (${car.jaar})`
  const description = `${car.merk} ${car.model} uit ${car.jaar} — ${car.pk} pk, ${car.kmstand.toLocaleString('nl')} km. Vraagprijs €${car.prijs.toLocaleString('nl')}. RDW erkend, VDSO Deurne.`

  return {
    title,
    description,
    alternates: { canonical: `/aanbod/${carSlug(car)}` },
    openGraph: {
      title,
      description,
      images: car.fotos?.[0] ? [{ url: car.fotos[0], width: 1200, height: 800, alt: title }] : undefined,
    },
  }
}

export default async function CarDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const car = await getCar(slug)
  if (!car) notFound()

  const canonicalSlug = carSlug(car)
  if (slug !== canonicalSlug) redirect(`/aanbod/${canonicalSlug}`)

  const { data: relatedRaw } = await supabase
    .from('cars').select('*').eq('is_visible', true)
    .neq('id', car.id).order('sort_order', { ascending: true }).order('created_at', { ascending: false }).limit(3)
  const related = (relatedRaw ?? []) as Car[]

  const { data: settingsRaw } = await supabase.from('settings').select('*').eq('id', 1).single()
  const settings = settingsRaw as Settings | null

  return <CarDetailClient car={car} related={related} phone={settings?.phone ?? '+31 6 22580038'} />
}
