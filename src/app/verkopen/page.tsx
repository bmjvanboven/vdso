import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { Settings } from '@/lib/supabase/types'
import VerkopenClient from './VerkopenClient'

export const metadata: Metadata = {
  title: 'Verkoop uw auto aan ons',
  description: 'Verkoop uw auto rechtstreeks aan VDSO — geen advertentie, geen kijkdagen, geen onderhandelen. Snel, eerlijk en zonder gedoe.',
  alternates: { canonical: '/verkopen' },
}

export default async function VerkopenPage() {
  const supabase = await createClient()
  const { data: settingsRaw } = await supabase.from('settings').select('*').eq('id', 1).single()
  const settings = settingsRaw as Settings | null

  return <VerkopenClient phone={settings?.phone ?? '+31 6 22580038'} />
}
