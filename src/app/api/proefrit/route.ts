import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { naam, telefoon, auto, datum } = body

    if (!naam || !telefoon || !auto || !datum) {
      return NextResponse.json({ error: 'Vul alle velden in' }, { status: 400 })
    }

    // Log aanvraag (server-side)
    console.log('[Proefrit aanvraag]', { naam, telefoon, auto, datum, ts: new Date().toISOString() })

    // Optioneel: stuur e-mail via Resend
    // Uncomment en configureer RESEND_API_KEY + TO_EMAIL in .env.local
    //
    // const { Resend } = await import('resend')
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'VDSO <noreply@vdso.nl>',
    //   to: process.env.PROEFRIT_EMAIL ?? 'info@vdso.nl',
    //   subject: `Proefrit aanvraag — ${auto}`,
    //   html: `
    //     <h2>Nieuwe proefrit aanvraag</h2>
    //     <p><strong>Naam:</strong> ${naam}</p>
    //     <p><strong>Telefoon:</strong> ${telefoon}</p>
    //     <p><strong>Auto:</strong> ${auto}</p>
    //     <p><strong>Datum:</strong> ${datum}</p>
    //   `,
    // })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
