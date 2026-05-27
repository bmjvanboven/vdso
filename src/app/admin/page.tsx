import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import type { Car, Settings } from '@/lib/supabase/types'
import AdminDashboard from './AdminDashboard'

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: carsRaw } = await supabase
    .from('cars').select('*').order('created_at', { ascending: false })
  const cars = (carsRaw ?? []) as Car[]

  const { data: settingsRaw } = await supabase
    .from('settings').select('*').eq('id', 1).single()
  const settings = settingsRaw as Settings | null

  return <AdminDashboard cars={cars} settings={settings} />
}
