export type market = {
  id?: string;
  title: string;
  slug?: string;
  logoUrl?: string;
  description: string;
  isActive?: boolean;
};

/**
 * Type guard to check if a given object is an array of Market.
 * @param obj - The object to validate.
 * @returns True if the object is a Market array, false otherwise.
 */
export function isMarketArray(obj: unknown): obj is market[] {
  return Array.isArray(obj) && obj.every(isMarket);
}

/**
 * Type guard to check if a given object is a Market.
 * @param obj - The object to validate.
 * @returns True if the object is a valid Market, false otherwise.
 */
export function isMarket(obj: unknown): obj is market {
  if (typeof obj !== "object" || obj === null) return false;
  const marketObj = obj as market;

  return (
    typeof marketObj.title === "string" &&
    typeof marketObj.description === "string"
  );
}
