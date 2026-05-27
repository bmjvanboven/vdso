import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Car, Settings } from '@/lib/supabase/types'
import CarDetailClient from './CarDetailClient'

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: carRaw } = await supabase
    .from('cars').select('*').eq('id', id).eq('is_visible', true).single()

  if (!carRaw) notFound()
  const car = carRaw as Car

  const { data: relatedRaw } = await supabase
    .from('cars').select('*').eq('is_visible', true)
    .neq('id', id).order('created_at', { ascending: false }).limit(3)
  const related = (relatedRaw ?? []) as Car[]

  const { data: settingsRaw } = await supabase.from('settings').select('*').eq('id', 1).single()
  const settings = settingsRaw as Settings | null

  return <CarDetailClient car={car} related={related} phone={settings?.phone ?? '020 000 00 00'} />
}
