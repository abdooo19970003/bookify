import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'
import ratelimit from './lib/ratelimit'

export { auth } from '@/auth'
export const config = {
  matcher: [
    '/api/:path*', // Match All API Calls
    '/dashboard/:path*', // Match All protected routes
    '/sign-in',
    '/sign-up', // match auth routes
    '/((?!_next/static|_next/image|favicon.ico|images|fonts).*)',
  ],
}

export async function middleware(req: NextRequest) {
  const loginUrl = new URL('/sign-in', req.url)
  const tooFastUrl = new URL('/too-fast', req.url)

  await auth()
  const pathname = req.nextUrl.pathname

  // Rate limit For API calls
  if (pathname.startsWith('/api')) {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
    const { success } = await ratelimit.limit(ip)
    if (!success) {
      return NextResponse.redirect(tooFastUrl)
    }
  }

  // Protecte all routes but auth Routes
  if (!pathname.startsWith('/sign-in') &&
    !pathname.startsWith('/sign-up')) {
    const token = req.cookies.get('authjs.session-token') || req.cookies.get("__Secure-authjs.session-token")
    if (!token)
      return NextResponse.redirect(loginUrl)
  }

  // disable auth routes for authanticated users
  if (pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up')) {
    const token = req.cookies.get('authjs.session-token') || req.cookies.get("__Secure-authjs.session-token")
    if (token) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
}
