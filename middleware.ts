import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }
    
    const session = request.cookies.get('admin-session')
    
    if (!session || session.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}