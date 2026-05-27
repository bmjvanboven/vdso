import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Admin e-mailadressen die toegang hebben tot /admin
  const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? 'admin@vdso.nl')
    .split(',').map(e => e.trim().toLowerCase())
  const isAdmin = !!user && ADMIN_EMAILS.includes((user.email ?? '').toLowerCase())

  // Protect /admin/* except /admin/login
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/admin/login') &&
    !isAdmin
  ) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  // Redirect ingelogde admin weg van login pagina
  if (request.nextUrl.pathname === '/admin/login' && isAdmin) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  // Preview gate: if preview_mode is on, non-admins see gate (handled client-side)
  return supabaseResponse
}
