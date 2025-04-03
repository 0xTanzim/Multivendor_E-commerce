export type ISale = {
  id?: string;
  orderId: string;
  productId: string;
  vendorId: string;
  total: number;
  productQty: number;
  productPrice: number;
  productTitle: string;
  productImageUrl: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

export function isSale(obj: any): obj is ISale {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const saleObj = obj as ISale;

  return (
    typeof saleObj.id === 'string' &&
    typeof saleObj.orderId === 'string' &&
    typeof saleObj.productId === 'string' &&
    typeof saleObj.vendorId === 'string' &&
    typeof saleObj.total === 'number' &&
    typeof saleObj.productQty === 'number' &&
    typeof saleObj.productPrice === 'number' &&
    typeof saleObj.productTitle === 'string'
  );
}

export function isSaleArray(obj: any): obj is ISale[] {
  if (!Array.isArray(obj)) {
    return false;
  }

  for (const item of obj) {
    if (!isSale(item)) {
      return false;
    }
  }

  return true;
}
