import { Category } from './category';

export type CreateMarket = {
  id?: string;
  title: string;
  slug?: string;
  logoUrl?: string;
  description: string;
  isActive?: boolean;
  categoryIds?: string[];
};

export type Market = {
  id?: string;
  title: string;
  slug?: string;
  logoUrl?: string;
  description: string;
  isActive?: boolean;
  categoryIds?: string[];
  categories?: Category[];
};

/**
 * Type guard to check if a given object is an array of Market.
 * @param obj - The object to validate.
 * @returns True if the object is a Market array, false otherwise.
 */
export function isMarketArray(obj: unknown): obj is Market[] {
  return Array.isArray(obj) && obj.every(isMarket);
}

/**
 * Type guard to check if a given object is a Market.
 * @param obj - The object to validate.
 * @returns True if the object is a valid Market, false otherwise.
 */
export function isMarket(obj: unknown): obj is Market {
  if (typeof obj !== 'object' || obj === null) return false;
  const marketObj = obj as Market;

  return (
    typeof marketObj.title === 'string' &&
    typeof marketObj.description === 'string' &&
    'slug' in marketObj &&
    typeof marketObj.slug === 'string'
  );
}
