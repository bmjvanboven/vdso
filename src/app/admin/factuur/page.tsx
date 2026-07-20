import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import FactuurClient from './FactuurClient'

export default async function FactuurPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  return <FactuurClient />
}
