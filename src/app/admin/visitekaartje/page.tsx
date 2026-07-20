import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import VisitekaartjeClient from './VisitekaartjeClient'

export default async function VisitekaartjePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  return <VisitekaartjeClient />
}
