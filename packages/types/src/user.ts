import { Farmer } from './farmer';
import { Product } from './product';

export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'FARMER'
  | 'MODERATOR'
  | 'USER';
export type Gender = 'MALE' | 'FEMALE' | 'UNKNOWN';

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified?: string;
  gender?: Gender;
  password: string;
  role: UserRole;
  bio?: string;
  products?: Product[];
  farmerProfile?: Farmer;
  verificationToken?: string;
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

export function isUserArray(data: unknown): data is User[] {
  return Array.isArray(data) && data.every(isUser);
}

export type LoginUser = {
  email: string;
  password: string;
};
