import { createClient } from '@/lib/supabase/server'
import type { Car, Settings } from '@/lib/supabase/types'
import AanbodClient from './AanbodClient'

export default async function AanbodPage() {
  const supabase = await createClient()

  const { data: settingsRaw } = await supabase.from('settings').select('*').eq('id', 1).single()
  const settings = settingsRaw as Settings | null
  const { data: { user } } = await supabase.auth.getUser()
  const showGate = (settings?.preview_mode ?? false) && !user

  const { data: carsRaw } = await supabase
    .from('cars')
    .select('*')
    .eq('is_visible', true)
    .order('created_at', { ascending: false })
  const cars = (carsRaw ?? []) as Car[]

  return <AanbodClient cars={cars} showGate={showGate} />
}
