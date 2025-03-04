import { isCoupon } from '@repo/types';
import { NextResponse } from 'next/server';

import { CouponService } from '@repo/backend-services';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const data: unknown = await req.json();

    if (!isCoupon(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const couponService = CouponService.getInstance();
    const newCoupon = await couponService.createCoupon(data);

    return NextResponse.json(newCoupon, {
      status: 201,
      statusText: 'Successfully created!',
    });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: String(error), message: 'An error occurred' },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const couponService = CouponService.getInstance();
    const coupons = await couponService.getCoupons();
    return NextResponse.json(coupons);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: String(err), message: 'An error occurred' },
      { status: 500 }
    );
  }
}
