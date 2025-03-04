import { Product } from "./product";

export type Farmer = {
  name: string;
  email: string;
  phone: string;
  physicalAddress: string;
  contactPerson?: string;
  contactPersonPhone?: string;
  profileImageUrl?: string;
  terms?: string;
  notes?: string;
  isActive: boolean;
  products?: Product[];
};

export function isFarmer(data: unknown): data is Farmer {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const obj = data as Farmer;

  return (
    typeof obj.name === 'string' &&
    typeof obj.email === 'string' &&
    typeof obj.phone === 'string' &&
    typeof obj.physicalAddress === 'string' &&
    (typeof obj.contactPerson === 'string' ||
      obj.contactPerson === undefined) &&
    (typeof obj.contactPersonPhone === 'string' ||
      obj.contactPersonPhone === undefined) &&
    (typeof obj.terms === 'string' || obj.terms === undefined) &&
    (typeof obj.notes === 'string' || obj.notes === undefined) &&
    typeof obj.isActive === 'boolean'
  );
}

export function isFarmers(data: unknown): data is Farmer[] {
  if (!Array.isArray(data)) {
    return false;
  }

  return data.every(isFarmer);
}
