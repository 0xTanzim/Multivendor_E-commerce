import { Product } from './product';

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'FARMER' | 'MODERATOR' | 'USER';
export type Gender = 'MALE' | 'FEMALE' | 'UNKNOWN';

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date;
  gender?: Gender;
  password: string;
  role: UserRole;
  bio?: string;
  products?: Product[];
};

export function isUser(data: unknown): data is User {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  const user = data as User;

  return (
    'name' in user &&
    typeof user.name === 'string' &&
    'email' in user &&
    typeof user.email === 'string'
  );
}
