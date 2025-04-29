export type CreateMarket = {
  id?: string;
  title: string;
  slug: string;
  logoUrl?: string;
  description: string;
  isActive: boolean;
  categoryIds: string[];
  coverImageUrl?: string;
  website?: string;
  phone?: string;
  address?: string;
  email?: string;
};

export type Market = CreateMarket & {};

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
    'title' in marketObj &&
    typeof marketObj.title === 'string' &&
    'description' in marketObj &&
    typeof marketObj.description === 'string' &&
    'slug' in marketObj &&
    typeof marketObj.slug === 'string' &&
    'isActive' in marketObj &&
    typeof marketObj.isActive === 'boolean' &&
    'categoryIds' in marketObj &&
    Array.isArray(marketObj.categoryIds) &&
    marketObj.categoryIds.every((id) => typeof id === 'string')
  );
}
