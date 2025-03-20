import { $Enums } from '@repo/database';

export type IAuthUser = {
  id?: string;
  name: string | null;
  email: string;
  password: string;
  role: $Enums.UserRole;
  verificationToken?: string;
  accountStatus?: $Enums.AccountStatus;
};

export function isAuthUserArray(obj: unknown): obj is IAuthUser[] {
  return Array.isArray(obj) && obj.every(isAuthUser);
}

export function isAuthUser(obj: unknown): obj is IAuthUser {
  if (typeof obj !== 'object' || obj === null) return false;
  const authUserObj = obj as IAuthUser;

  return (
    'name' in authUserObj &&
    typeof authUserObj.name === 'string' &&
    'email' in authUserObj &&
    typeof authUserObj.email === 'string' &&
    'password' in authUserObj &&
    typeof authUserObj.password === 'string' &&
    'role' in authUserObj &&
    (authUserObj.role === 'SUPER_ADMIN' ||
      authUserObj.role === 'ADMIN' ||
      authUserObj.role === 'FARMER' ||
      authUserObj.role === 'MODERATOR' ||
      authUserObj.role === 'USER')
  );
}
