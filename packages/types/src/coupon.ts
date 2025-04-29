import { $Enums } from '@repo/database';

export type Coupon = {
  id?: string;
  title: string;
  couponCode: string;
  expiryDate: Date | string;
  isActive: boolean;
  vendorId: string;
  discount: number;
  discountType: $Enums.DiscountType;
  maxUses?: number;
  startDate: Date | string;
  minSpend: number;
  maxDiscount: number;
  usedCount?: number;
};

export function isCouponArray(obj: unknown): obj is Coupon[] {
  return Array.isArray(obj) && obj.every(isCoupon);
}

export function isCoupon(obj: unknown): obj is Coupon {
  if (typeof obj !== 'object' || obj === null) return false;
  const couponObj = obj as Coupon;

  return (
    'title' in couponObj &&
    typeof couponObj.title === 'string' &&
    'couponCode' in couponObj &&
    typeof couponObj.couponCode === 'string' &&
    (couponObj.expiryDate === undefined ||
      typeof couponObj.expiryDate === 'string' ||
      couponObj.expiryDate instanceof Date) &&
    'isActive' in couponObj &&
    typeof couponObj.isActive === 'boolean' &&
    'vendorId' in couponObj &&
    typeof couponObj.vendorId === 'string' &&
    'discount' in couponObj &&
    typeof couponObj.discount === 'number' &&
    'minSpend' in couponObj &&
    typeof couponObj.minSpend === 'number' &&
    'maxDiscount' in couponObj &&
    typeof couponObj.maxDiscount === 'number' &&
    ('maxUses' in couponObj ? typeof couponObj.maxUses === 'number' : true) &&
    ('startDate' in couponObj
      ? typeof couponObj.startDate === 'string'
      : true) &&
    ('usedCount' in couponObj ? typeof couponObj.usedCount === 'number' : true)
  );
}
