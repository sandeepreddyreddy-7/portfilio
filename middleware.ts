import { NextResponse, type NextRequest } from 'next/server'

const isDev = process.env.NODE_ENV === 'development'

export function middleware(request: NextRequest) {
  // Generate request ID for correlation across logs and services
  const requestId = crypto.randomUUID()

  const nonce = Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString(
    'base64'
  )

  // Guard /studio route from public access (except in development)
  // In production, only allow if SANITY_STUDIO_ACCESS_TOKEN header is provided
  // or if accessed from an internal IP (configure in Vercel project settings)
  if (
    request.nextUrl.pathname.startsWith('/studio') &&
    !isDev &&
    process.env.SANITY_STUDIO_PROTECTED === 'true'
  ) {
    const authHeader = request.headers.get('Authorization')
    const accessToken = process.env.SANITY_STUDIO_ACCESS_TOKEN

    if (!accessToken || authHeader !== `Bearer ${accessToken}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('x-request-id', requestId)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // Return request ID to client for support/debugging
  response.headers.set('x-request-id', requestId)

  // Apply CSP with per-request nonce to all responses
  const cspHeader = [
    "default-src 'self'",
    isDev
      ? `script-src 'self' 'nonce-${nonce}' 'unsafe-eval' https://plausible.io`
      : `script-src 'self' 'nonce-${nonce}' https://plausible.io`,
    `style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com`,
    "img-src 'self' data: https://cdn.sanity.io",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://cdn.sanity.io https://*.sanity.io https://plausible.io",
    "frame-ancestors 'none'",
  ].join('; ')

  response.headers.set('Content-Security-Policy', cspHeader)

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.pdf$).*)',
  ],
}
