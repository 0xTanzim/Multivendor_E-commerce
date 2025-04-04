export type Sale = {
  id?: string;
  orderId: string;
  productId: string;
  vendorId: string;
  total: number;
  productQty: number;
  productPrice: number;
  productTitle: string;
  productImageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
  order?: string;
  product?: string;
  vendor?: string;
};
