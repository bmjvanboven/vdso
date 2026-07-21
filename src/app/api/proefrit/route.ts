import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { naam, telefoon, auto, datum } = body

    if (!naam || !telefoon) {
      return NextResponse.json({ error: 'Vul alle velden in' }, { status: 400 })
    }

    console.log('[Proefrit aanvraag]', { naam, telefoon, auto, datum, ts: new Date().toISOString() })

    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        await resend.emails.send({
          from: 'VDSO Website <onboarding@resend.dev>',
          to: process.env.PROEFRIT_EMAIL ?? 'info@vdso.nl',
          replyTo: undefined,
          subject: `Proefrit aanvraag — ${auto || 'onbekend voertuig'}`,
          html: `
            <h2>Nieuwe proefrit aanvraag</h2>
            <p><strong>Naam:</strong> ${naam}</p>
            <p><strong>Telefoon:</strong> ${telefoon}</p>
            <p><strong>Auto:</strong> ${auto || 'Niet opgegeven'}</p>
            <p><strong>Gewenste datum:</strong> ${datum || 'Niet opgegeven'}</p>
          `,
        })
      } catch (emailError) {
        console.error('[Proefrit e-mail mislukt]', emailError)
      }
    } else {
      console.warn('[Proefrit] RESEND_API_KEY ontbreekt — e-mail niet verstuurd, alleen gelogd')
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
