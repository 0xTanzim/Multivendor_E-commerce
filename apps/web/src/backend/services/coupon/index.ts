import { prisma } from '@repo/database';
import { coupon } from '@repo/types';
import { isoFormate } from '@repo/utils';

export const createCoupon = async (data: coupon) => {
  try {
    const newCoupon = {
      couponCode: data.couponCode,
      expiryDate:
        data.expiryDate instanceof Date
          ? data.expiryDate
          : isoFormate(data.expiryDate),
      title: data.title,
      status: data.status || 'INACTIVE',
    };

    const res = await prisma.coupon.create({
      data: newCoupon,
    });

    return res;
  } catch (err) {
    console.error(err);
    throw new Error('Error creating coupon');
  }
};
