'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useAuthDetails = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (
      status === 'unauthenticated' ||
      !session ||
      !session.user ||
      !session.user.id ||
      !session.user.role ||
      !session.user.roleId
    ) {
      router.push('/login');
    }
  }, [session, status, router]);

  if (
    status === 'loading' ||
    !session ||
    !session.user ||
    !session.user.id ||
    !session.user.role
  ) {
    return { userId: '', user: null, role: '' };
  }

  const userId = session.user.id;
  const role = session.user.role;
  const roleId = session.user.roleId;

  return { userId, user: session.user, role, roleId };
};
