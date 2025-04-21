'use client';

import Loading from '@/app/loading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type WithAuthorizationProps = {
  allowedRoles: string[];
  redirectTo?: string;
};

export const withAuthorization = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  { allowedRoles, redirectTo = '/' }: WithAuthorizationProps
): React.FC<P> => {
  const WithAuth: React.FC<P> = (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    const userRole = session?.user?.role ?? '';

    const normalizeRole = (role: string) =>
      role
        .toUpperCase()
        .trim()
        .replace(/[-_\s]/g, '');

    const isAuthorized = allowedRoles.some(
      (role) => normalizeRole(role) === normalizeRole(userRole)
    );

    useEffect(() => {
      if (status === 'authenticated' && !isAuthorized) {
        router.replace(redirectTo);
      }
    }, [status, isAuthorized]);

    if (status === 'loading') return <Loading />;

    return isAuthorized ? <WrappedComponent {...props} /> : null;
  };

  return WithAuth;
};
