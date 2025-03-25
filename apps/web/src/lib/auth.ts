import { auth } from '@/auth';
import { $Enums } from '@repo/database';

export const getRole = async () => {
  const session = await auth();

  if (!session) {
    return null;
  }

  const role: $Enums.UserRole = session?.user?.role;

  return role;
};
