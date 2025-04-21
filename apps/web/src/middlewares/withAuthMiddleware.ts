import { auth } from '@/auth';
import { hasPageAccess } from '@/lib/permissions';
import { LOGIN_ROUTE, PUBLIC_ROUTES } from '@/routes';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { CustomMiddleware } from './chain';

// Routes that are exempt from dashboard permission checks
const EXEMPT_DASHBOARD_ROUTES = ['/dashboard/access-denied'];

export function withAuthMiddleware(middleware: CustomMiddleware) {
  return async (req: NextRequest, event: NextFetchEvent) => {
    const response = NextResponse.next();

    const { nextUrl, method } = req;
    const pathName = nextUrl.pathname;

    // const { auth } = await NextAuth(authOptions);
    const session = await auth();
    const user = session?.user;
    const expires = session?.expires;

    const isAuthenticated = !!user && !!user.id;

    // check if the user is authenticated and the route is public
    const isPublicRoute = PUBLIC_ROUTES.some((route) => {
      const pattern =
        '^' +
        route
          .replace(/:\w+/g, '[^/]+') // /product/:id → /product/[^/]+
          .replace(/\*/g, '.*') // wildcard *
          .replace(/\//g, '\\/') +
        '$';

      const regex = new RegExp(pattern);
      return regex.test(pathName);
    });

    // if user is not authenticated and the route is not public
    if (!isAuthenticated && !isPublicRoute) {
      // Redirect to the login page if not authenticated
      return NextResponse.redirect(new URL(LOGIN_ROUTE, req.url));
    }

    const userRole = user?.role;

    // Check if this is an exempt dashboard route that should bypass permission checks
    const isExemptDashboardRoute = EXEMPT_DASHBOARD_ROUTES.includes(pathName);

    // Only check permissions for dashboard routes that aren't exempt
    if (pathName.startsWith('/dashboard') && !isExemptDashboardRoute) {
      const isAllowed = hasPageAccess(userRole, pathName);
      if (!isAllowed) {
        // Redirect to the access-denied page
        return NextResponse.redirect(
          new URL('/dashboard/access-denied', req.url)
        );
      }
    }

    return middleware(req, event, response);
  };
}
