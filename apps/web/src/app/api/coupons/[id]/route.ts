import { couponService } from '@/lib/di';
import { handleError } from '@/utils';
import { isCoupon } from '@repo/types';
import { isoFormate } from '@repo/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const coupons = await couponService.findUnique({
      where: { id: id },
    });

    return NextResponse.json(coupons);
  } catch (err) {
    return handleError(err);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const coupons = await couponService.deleteById(id);
    return NextResponse.json(coupons);
  } catch (err) {
    return handleError(err);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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

    const coupons = await couponService.update(id, data);

    return NextResponse.json(coupons);
  } catch (err) {
    return handleError(err);
  }
}
