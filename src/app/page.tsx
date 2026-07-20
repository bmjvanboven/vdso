import { createClient } from '@/lib/supabase/server'
import type { Car, Settings } from '@/lib/supabase/types'
import HomeClient from './HomeClient'

export default async function HomePage() {
  const supabase = await createClient()

  const { data: settingsRaw } = await supabase.from('settings').select('*').eq('id', 1).single()
  const settings = settingsRaw as Settings | null

  const { data: { user } } = await supabase.auth.getUser()
  const showGate = (settings?.preview_mode ?? false) && !user

  const { data: carsRaw } = await supabase
    .from('cars')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(3)
  const cars = (carsRaw ?? []) as Car[]

  return <HomeClient cars={cars} showGate={showGate} />
}
