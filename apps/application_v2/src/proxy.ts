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

  if (path.startsWith('/api') || path.includes('trpc_api') || path.includes('trpc')) {
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
    const isAllowedToEmployee = userRoles.includes(DB_ROLES.EMPLOYERS);
    const isLabAssitant = userRoles.includes(DB_ROLES.LABORATORY);
    const isTechnologist = userRoles.includes(DB_ROLES.TECHNOLOGIST);
    const isWeighter = userRoles.includes(DB_ROLES.WEIGHER);
    const isForeman = userRoles.includes(DB_ROLES.FOREMAN);
    const isAllowedToReport = userRoles.includes(DB_ROLES.REPORTS);

    const adminRoutes = [ROUTE_PATH.ADMIN, ROUTE_PATH.ADMIN_USERS, ROUTE_PATH.ADMIN_UPDATE_BASES];

    const plannerRoutes = [
      ROUTE_PATH.PLANNER,
      ROUTE_PATH.PLANNER_CONVEYORS,
      ROUTE_PATH.PLANNER_SUMMARIES,
    ];

    const employeeRoutes = [ROUTE_PATH.EMPLOYEES];

    const laboratoryRoutes = [ROUTE_PATH.LAB, ROUTE_PATH.LAB_BOILS, ROUTE_PATH.LAB_PRODUCTS];

    const foremanRoutes = [ROUTE_PATH.FOREMAN];

    const technologistRoutes = [
      ROUTE_PATH.TECH,
      ROUTE_PATH.TECH_CANS_DASH,
      ROUTE_PATH.TECH_CANS_LOCATION,
    ];

    const weightingRoutes = [
      ROUTE_PATH.WEIGHT_SECTION,
      ROUTE_PATH.WEIGHT_SECTION_INVENTORIES,
      ROUTE_PATH.WEIGHT_SECTION_PRODUCTIVITY,
      ROUTE_PATH.WEIGHT_SECTION_WEIGHT_REPORTS,
    ];

    const reportRoutes = [
      ROUTE_PATH.REPORTS,
      ROUTE_PATH.REPORTS_BOILS,
      ROUTE_PATH.REPORTS_CORRECTIONS,
      ROUTE_PATH.REPORTS_TIMING,
    ];

    const isAdminRoute = adminRoutes.some((route) => matchMiddlewarePath(route, path));
    const isPlannerRoute = plannerRoutes.some((route) => matchMiddlewarePath(route, path));
    const isEmployeeRoute = employeeRoutes.some((route) => matchMiddlewarePath(route, path));
    const isLaboratoryRoute = laboratoryRoutes.some((route) => matchMiddlewarePath(route, path));
    const isForemanRoute = foremanRoutes.some((route) => matchMiddlewarePath(route, path));
    const isTechnologistRoute = technologistRoutes.some((route) =>
      matchMiddlewarePath(route, path),
    );
    const isWeightingRoute = weightingRoutes.some((route) => matchMiddlewarePath(route, path));
    const isReportRoute = reportRoutes.some((route) => matchMiddlewarePath(route, path));

    if (
      (isAdminRoute && !isAdmin) ||
      (isPlannerRoute && !isPlanner) ||
      (isEmployeeRoute && !isAllowedToEmployee) ||
      (isLaboratoryRoute && !isLabAssitant) ||
      (isForemanRoute && !isForeman) ||
      (isTechnologistRoute && !isTechnologist) ||
      (isWeightingRoute && !isWeighter) ||
      (isReportRoute && !isAllowedToReport)
    ) {
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
