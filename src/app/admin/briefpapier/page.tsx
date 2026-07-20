import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import BriefpapierClient from './BriefpapierClient'

export default async function BriefpapierPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  return <BriefpapierClient />
}
