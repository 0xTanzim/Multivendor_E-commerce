export type Product = {
  id?: string;
  title: string;
  slug: string;
  description?: string;
  images?: string[];
  imageUrl?: string;
  sku?: string;
  barcode?: string;
  productPrice: number;
  sellPrice?: number;
  farmerId?: string;
  categoryId?: string;
  tags?: string[];
  isActive: boolean;
  productCode: string;
  isWholeSale: boolean;
  wholeSalePrice?: number;
  wholeSaleQty?: number;
  unit: string;
  qty?: number;
  productStock: number;
  stockStatus?: string;
};

/**
 * Type guard to check if a given object is an array of Product.
 * @param obj - The object to validate.
 * @returns True if the object is a Product array, false otherwise.
 */
export function isProductArray(obj: unknown): obj is Product[] {
  return Array.isArray(obj) && obj.every(isProduct);
}

/**
 * Type guard to check if a given object is a Product.
 * @param obj - The object to validate.
 * @returns True if the object is a valid Product, false otherwise.
 */
export function isProduct(obj: unknown): obj is Product {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  const productObj = obj as Product;

  return (
    'title' in productObj &&
    typeof productObj.title === 'string' &&
    'slug' in productObj &&
    typeof productObj.slug === 'string' &&
    'isActive' in productObj &&
    typeof productObj.isActive === 'boolean' &&
    'productCode' in productObj &&
    typeof productObj.productCode === 'string' &&
    'unit' in productObj &&
    typeof productObj.unit === 'string'
  );
}
