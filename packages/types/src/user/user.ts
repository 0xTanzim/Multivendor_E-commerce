import { Product } from '../product';
import { Farmer } from './farmer';

export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'FARMER'
  | 'MODERATOR'
  | 'USER';
export type Gender = 'MALE' | 'FEMALE' | 'UNKNOWN';

export type User = {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  gender?: Gender;
  bio?: string;
  dateOfBirth?: Date;
  address?: string;
  phone?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  district?: string;
  streetAddress?: string;
  profileImage?: string;
  products?: Product[];
  farmerProfile?: Farmer;
  isActive: boolean;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export function isUser(data: unknown): data is User {
  if (typeof data !== 'object' || data === null) {
    return false;
  }
  const user = data as User;

  return (
    (typeof user.firstName === 'string' ||
      typeof user.firstName === 'undefined') &&
    (typeof user.lastName === 'string' ||
      typeof user.lastName === 'undefined') &&
    (typeof user.gender === 'string' || typeof user.gender === 'undefined') &&
    (typeof user.bio === 'string' || typeof user.bio === 'undefined')
  );
}

export function isUserArray(data: unknown): data is User[] {
  return Array.isArray(data) && data.every(isUser);
}
