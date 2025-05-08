import { auth } from '@/auth';
import { $Enums } from '@repo/database';
import { Session } from 'next-auth';

export const getRole = async () => {
  const session: Session = await auth();

  if (!session) {
    return null;
  }

  const role: $Enums.UserRole = session?.user?.role;

  return role;
};

export const getUserId = async () => {
  const session: Session = await auth();

  if (!session) {
    return null;
  }

  const userId: string = session?.user?.id;

  return userId;
};

export const authDetails = async (): Promise<{
  userId: string | null;
  role: $Enums.UserRole | null;
  roleId: string | null;
  session: Session | null;
  userEmail: string | null;
}> => {
  const session: Session = await auth();

  if (!session) {
    return {
      userId: null,
      role: null,
      session: null,
      userEmail: null,
      roleId: null,
    };
  }

  const userId: string = session?.user?.id;
  const role: $Enums.UserRole = session?.user?.role;
  const userEmail: string = session?.user?.email ?? '';
  const roleId: string = session?.user?.roleId ?? '';

  return { userId, role, session, userEmail, roleId };
};
