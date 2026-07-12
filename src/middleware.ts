import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// jose uses a Uint8Array secret — Edge-runtime compatible
function getSecret() {
  return new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback-secret-change-in-prod'
  );
}

async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

const ADMIN_PATHS = ['/admin'];
const ADMIN_API_PATHS = ['/api/auth/me', '/api/admin'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = ADMIN_PATHS.some(
    (path) => pathname.startsWith(path) && pathname !== '/admin/login'
  );
  const isAdminApi = ADMIN_API_PATHS.some((path) => pathname.startsWith(path));

  if (isAdminPage || isAdminApi) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      if (isAdminApi) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        );
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const valid = await verifyToken(token);
    if (!valid) {
      if (isAdminApi) {
        return NextResponse.json(
          { success: false, error: 'Invalid token' },
          { status: 401 }
        );
      }
      const response = NextResponse.redirect(
        new URL('/admin/login', request.url)
      );
      response.cookies.delete('admin_token');
      return response;
    }
  }

  // Redirect already-logged-in admin away from login page
  if (pathname === '/admin/login') {
    const token = request.cookies.get('admin_token')?.value;
    if (token && (await verifyToken(token))) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/auth/me'],
};
