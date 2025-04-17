import { $Enums } from '@repo/database';
import { User } from './user';

export enum FarmerStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
  BLOCKED = 'BLOCKED',
}

export type FarmerStatusType = (typeof FarmerStatus)[keyof typeof FarmerStatus];

export type Farmer = {
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  physicalAddress: string;
  contactPerson: string;
  contactPersonPhone: string;
  profileImageUrl?: string;
  terms: string;
  notes?: string;
  isActive?: boolean;
  products?: string[];
  mainCrop: string;
  farmSize: number | string;
  userId: string;
  code: string;
  user?: User;
  status?: $Enums.FarmerStatus;
};

export type FarmerInput = Farmer & {
  name?: string;
  email?: string;
  role?: string;
  roleId?: string;
};

export function isFarmer(data: unknown): data is Farmer {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const obj = data as Farmer;

  return (
    'userId' in obj &&
    typeof obj.userId === 'string' &&
    'code' in obj &&
    typeof obj.code === 'string' &&
    'phone' in obj &&
    typeof obj.phone === 'string' &&
    'physicalAddress' in obj &&
    typeof obj.physicalAddress === 'string' &&
    'contactPerson' in obj &&
    typeof obj.contactPerson === 'string' &&
    'contactPersonPhone' in obj &&
    typeof obj.contactPersonPhone === 'string' &&
    'terms' in obj &&
    typeof obj.terms === 'string' &&
    (typeof obj.notes === 'string' || obj.notes === undefined) &&
    (typeof obj.farmSize === 'string' || typeof obj.farmSize === 'number') &&
    typeof obj.mainCrop === 'string'
  );
}

export function isFarmers(data: unknown): data is Farmer[] {
  if (!Array.isArray(data)) {
    return false;
  }

  return data.every(isFarmer);
}
