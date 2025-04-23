import { couponService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { isCoupon } from '@repo/types';
import { isoFormate } from '@repo/utils';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class CouponIdController {
  async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const coupon = await couponService.findUnique({
      where: { id: id },
    });

    return NextResponse.json(coupon);
  }

  async DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const coupon = await couponService.deleteById(id);
    return NextResponse.json(coupon);
  }

  async PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const data: unknown = await req.json();

    if (!isCoupon(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    delete data.id;

    data.expiryDate =
      data.expiryDate instanceof Date
        ? data.expiryDate
        : isoFormate(data.expiryDate);

    data.startDate =
      data.startDate instanceof Date
        ? data.startDate
        : isoFormate(data.startDate);

    const coupon = await couponService.update(id, data);
    return NextResponse.json(coupon);
  }
}

export const { GET, DELETE, PATCH } = new CouponIdController();
