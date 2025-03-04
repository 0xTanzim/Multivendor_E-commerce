import { prisma } from '@repo/database';
import { Coupon } from '@repo/types';
import { isoFormate } from '@repo/utils';

export class CouponService {
  public static instance: CouponService;

  private constructor() {}

  public static getInstance(): CouponService {
    if (!CouponService.instance) {
      CouponService.instance = new CouponService();
    }
    return CouponService.instance;
  }

  async createCoupon(data: Coupon): Promise<Coupon> {
    try {
      const newCoupon = {
        couponCode: data.couponCode,
        expiryDate:
          data.expiryDate instanceof Date
            ? data.expiryDate
            : isoFormate(data.expiryDate),
        title: data.title,
        status: data.status || 'INACTIVE',
        isActive: data.isActive || false,
      };

      const res = await prisma.coupon.create({
        data: newCoupon,
      });

      return res;
    } catch (err) {
      console.error(err);
      throw new Error('Error creating coupon');
    }
  }

  async getCoupons(): Promise<Coupon[]> {
    try {
      const coupons = await prisma.coupon.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      return coupons;
    } catch (err) {
      console.error(err);
      throw new Error('Error fetching coupons');
    }
  }
}
