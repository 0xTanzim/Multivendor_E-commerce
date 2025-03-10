import { Product } from './product';

export type Farmer = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  physicalAddress: string;
  contactPerson: string;
  contactPersonPhone: string;
  profileImageUrl?: string;
  terms: string;
  notes?: string;
  isActive: boolean;
  products?: Product[] | string[];
  mainCrops: string;
  farmSize: number | string;
  userId: string;
  code: string;
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
    'name' in obj &&
    typeof obj.name === 'string' &&
    'email' in obj &&
    typeof obj.email === 'string' &&
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
    typeof obj.isActive === 'boolean' &&
    (typeof obj.farmSize === 'string' || typeof obj.farmSize === 'number') &&
    typeof obj.mainCrops === 'string' &&
    (obj.products === undefined ||
      (Array.isArray(obj.products) &&
        obj.products.every((p) => typeof p === 'string' || isProductData(p))))
  );
}

export function isFarmers(data: unknown): data is Farmer[] {
  if (!Array.isArray(data)) {
    return false;
  }

  return data.every(isFarmer);
}

function isProductData(data: unknown): data is Product {
  return typeof data === 'object' && data !== null && 'id' in data;
}
