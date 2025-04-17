import { $Enums } from '@repo/database';

export type IAuthUser = {
  id?: string;
  name: string | null;
  email: string;
  password?: string;
  role: string | 'Farmer' | 'Admin' | 'User';
  verificationToken?: string;
  plan?: string;
  accountStatus?: $Enums.AccountStatus;
  emailVerified?: boolean;
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
    typeof authUserObj.email === 'string'
  );
}

export type LoginUser = {
  email: string;
  password: string;
};
