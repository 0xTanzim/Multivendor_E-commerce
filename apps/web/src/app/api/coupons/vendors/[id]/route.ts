import { couponService } from '@/lib/di';
import { handleError } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;

    const coupons = await couponService.findAll({
      where: { vendorId: id },
    });
    return NextResponse.json(coupons);
  } catch (err) {
    return handleError(err);
  }
}
