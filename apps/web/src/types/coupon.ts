export type coupon = {
  id?: string;
  title: string;
  couponCode: string;
  expiryDate: Date | string;
  status?: "ACTIVE" | "INACTIVE";
};

export function isCouponArray(obj: unknown): obj is coupon[] {
  return Array.isArray(obj) && obj.every(isCoupon);
}

export function isCoupon(obj: unknown): obj is coupon {
  if (typeof obj !== "object" || obj === null) return false;
  const couponObj = obj as coupon;

  return (
    "title" in couponObj &&
    typeof couponObj.title === "string" &&
    "couponCode" in couponObj &&
    typeof couponObj.couponCode === "string" &&
    (couponObj.expiryDate === undefined ||
      typeof couponObj.expiryDate === "string" ||
      couponObj.expiryDate instanceof Date)
  );
}
