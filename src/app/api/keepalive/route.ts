import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Wordt periodiek aangeroepen door Vercel Cron (zie vercel.json) om Supabase
// actief te houden — het gratis tier pauzeert projecten na 7 dagen zonder API-activiteit.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET
  if (secret && req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const supabase = await createClient()
  const { error } = await supabase.from('settings').select('id').eq('id', 1).single()
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true, ts: new Date().toISOString() })
}
