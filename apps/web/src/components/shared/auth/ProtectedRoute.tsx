'use client';

import Loading from '@/app/loading';
import { hasPageAccess } from '@/lib/permissions';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'loading') {
      return;
    }

    // Check permissions when session is loaded
    if (session?.user?.role && pathname.startsWith('/dashboard')) {
      const hasAccess = hasPageAccess(session.user.role, pathname);

      console.log('ProtectedRoute', {
        pathname,
        userRole: session.user.role,
        hasAccess,
      });

      // Redirect if user doesn't have permission
      if (!hasAccess) {
        router.push('/dashboard/access-denied');
      }
    }
  }, [status, session, router, pathname]);

  // Show loading state while checking auth
  if (status === 'loading') {
    return <Loading />;
  }

  // Show content if authenticated and authorized
  return status === 'authenticated' ? <>{children}</> : null;
};

export default ProtectedRoute;
