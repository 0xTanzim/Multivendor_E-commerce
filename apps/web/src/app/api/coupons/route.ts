import { createCoupon } from '@/backend/services/coupon';
import { isCoupon } from '@/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data: unknown = await req.json();

    if (!isCoupon(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    const newCoupon = await createCoupon(data);

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
