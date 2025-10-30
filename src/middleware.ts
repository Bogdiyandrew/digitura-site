import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'

  const userAgent = request.headers.get('user-agent') || 'unknown'
  const url = request.nextUrl.pathname
  const method = request.method

  console.log(`[LOG] ${method} ${url} from ${ip} (${userAgent})`)

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}