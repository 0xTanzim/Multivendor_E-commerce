export type product = {
  id?: string;
  title: string;
  slug?: string;
  description: string;
  images?: string[];
  sku?: string;
  barcode?: string;
  productPrice: number;
  sellPrice?: number;
  stock?: number;
  farmerIds?: string[];
  categoryIds?: string[];
  tags: string[];
  status?: "active" | "inactive";
}

export function isProductArray(obj: unknown): obj is product[] {
  return Array.isArray(obj) && obj.every(isProduct);
}

export function isProduct(obj: unknown): obj is product {
  if (typeof obj !== "object" || obj === null) return false;
  const productObj = obj as product;
  
  return (
    typeof productObj.title === "string" &&
    typeof productObj.description === "string"
  );
}