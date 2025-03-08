import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // For client-side auth, we'll handle most auth in the components
  // This middleware will just handle basic redirects
  
  const pathname = request.nextUrl.pathname;

  // Public routes that don't need any checks
  if (
    pathname === '/' || 
    pathname.startsWith('/auth/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // For protected routes, we'll let the client-side auth handle it
  // The components will redirect if not authenticated
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 