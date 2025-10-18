import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { headers } from 'next/headers'

export async function middleware(request: NextRequest) {
  // Middleware logic
  console.log("'here")
  if (request.nextUrl.pathname.startsWith('/api')) {
    const authHeader = (await headers()).get('Authorization')

    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: 'Authentication header is required' },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*'],
}
