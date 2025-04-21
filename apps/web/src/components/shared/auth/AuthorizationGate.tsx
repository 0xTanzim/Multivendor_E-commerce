'use client';

import Loading from '@/app/loading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type AuthorizationGateProps = {
  allowedRoles: string[];
  children: React.ReactNode;
  redirectTo?: string;
};

const normalizeRole = (role: string) =>
  role
    ?.toUpperCase()
    .trim()
    .replace(/[-_\s]/g, '');

export const AuthorizationGate = ({
  allowedRoles,
  children,
  redirectTo = '/',
}: AuthorizationGateProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const userRole = session?.user?.role ?? '';

  const isAllowed = allowedRoles.some(
    (role) => normalizeRole(role) === normalizeRole(userRole)
  );

  useEffect(() => {
    if (status === 'authenticated' && !isAllowed) {
      router.replace(redirectTo);
    }
  }, [status, isAllowed]);

  if (status === 'loading') return <Loading />;
  return isAllowed ? <>{children}</> : null;
};
