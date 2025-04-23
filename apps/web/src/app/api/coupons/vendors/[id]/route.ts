import { couponService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class VendorCouponsController {
  async GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ): Promise<NextResponse> {
    const { id } = await params;

    const coupons = await couponService.findAll({
      where: { vendorId: id },
    });
    return NextResponse.json(coupons);
  }
}

export const { GET } = new VendorCouponsController();
