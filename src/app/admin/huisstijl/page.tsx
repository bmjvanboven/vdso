import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import HuisstijlClient from './HuisstijlClient'

export default async function HuisstijlPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  return <HuisstijlClient />
}
