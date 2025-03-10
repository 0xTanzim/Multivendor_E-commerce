import { couponService } from '@/lib/di';
import { handleError } from '@/utils';
import { isCoupon } from '@repo/types';
import { isoFormate } from '@repo/utils';
import { NextResponse } from 'next/server';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const data: unknown = await req.json();

    if (!isCoupon(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const newCoupon = await couponService.create({
      ...data,
      expiryDate:
        data.expiryDate instanceof Date
          ? data.expiryDate
          : isoFormate(data.expiryDate),
    });

    return NextResponse.json(newCoupon, {
      status: 201,
      statusText: 'Successfully created!',
    });
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const coupons = await couponService.findAll({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(coupons);
  } catch (err) {
    return handleError(err);
  }
}
