import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { DB_ROLES, ROUTE_PATH } from './shared/constants';
import { TRegisteredUser } from '@repo/schemas';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'JWT_ACCESS_SECRET');

interface CustomJwtPayload {
  userData?: {
    roles: string[];
  };
}

function matchMiddlewarePath(pattern: string, pathname: string): boolean {
  const regexPattern = pattern.replace(/\[\.\.\.[^\]]+\]/g, '.*').replace(/\[[^\]]+\]/g, '[^/]+');

  const regex = new RegExp(`^${regexPattern}(/.*)?$`);
  return regex.test(pathname);
}

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path.startsWith('/api') || path.includes('trpc_api')) {
    return NextResponse.next();
  }
  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  const isPublicPage = path === '/login' || path === '/register';

  if (isPublicPage && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (!accessToken && !refreshToken) {
    if (isPublicPage) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (!accessToken && refreshToken) {
    return NextResponse.next();
  }

  try {
    const { payload } = await jwtVerify(accessToken!, JWT_SECRET);
    const decodedToken = payload as CustomJwtPayload;

    const userRoles = (decodedToken as TRegisteredUser)?.roles || [];
    const isAdmin = userRoles.includes(DB_ROLES.ADMIN);
    const isPlanner = userRoles.includes(DB_ROLES.PLANNER);

    const adminRoutes = [ROUTE_PATH.ADMIN, ROUTE_PATH.ADMIN_USERS];

    const plannerRoutes = [
      ROUTE_PATH.PLANNER,
      ROUTE_PATH.PLANNER_CONVEYORS,
      ROUTE_PATH.PLANNER_SUMMARIES,
    ];

    const isAdminRoute = adminRoutes.some((route) => matchMiddlewarePath(route, path));
    const isPlannerRoute = plannerRoutes.some((route) => matchMiddlewarePath(route, path));

    if ((isAdminRoute && !isAdmin) || (isPlannerRoute && !isPlanner)) {
      console.warn(`Access denied for path: ${path}. Roles: ${userRoles.join(', ')}`);
      return NextResponse.redirect(new URL(ROUTE_PATH.FORBIDDEN, req.url));
    }

    return NextResponse.next();
  } catch (_error) {
    console.log('JWT verification failed, checking refresh token...');
    if (refreshToken) {
      console.log('Access expired but refresh cookie exists. Passing to client refresh handler.');
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: [
    '/((?!trpc_api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
