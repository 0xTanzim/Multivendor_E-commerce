export type Coupon = {
  id?: string;
  title: string;
  couponCode: string;
  expiryDate: Date | string;
  isActive: boolean;
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
    typeof couponObj.isActive === 'boolean'
  );
}
