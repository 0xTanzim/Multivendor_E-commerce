import { couponService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { isCoupon } from '@repo/types';
import { isoFormate } from '@repo/utils';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class CouponController {
  async POST(req: Request): Promise<NextResponse> {
    const data: unknown = await req.json();

    if (!isCoupon(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    if (!data.vendorId) {
      return NextResponse.json(
        { error: 'vendorId is required' },
        { status: 400 }
      );
    }

    const newCoupon = await couponService.create({
      ...data,
      startDate:
        data.startDate instanceof Date
          ? data.startDate
          : isoFormate(data.startDate),
      expiryDate:
        data.expiryDate instanceof Date
          ? data.expiryDate
          : isoFormate(data.expiryDate),
    });

    return NextResponse.json(newCoupon, {
      status: 201,
      statusText: 'Successfully created!',
    });
  }

  async GET(req: NextRequest): Promise<NextResponse> {
    const coupons = await couponService.findAll();
    return NextResponse.json(coupons);
  }
}

export const { POST, GET } = new CouponController();
