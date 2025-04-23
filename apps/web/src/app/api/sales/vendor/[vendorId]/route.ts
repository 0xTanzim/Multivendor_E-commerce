import { saleService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class VendorSalesController {
  async GET(
    req: NextRequest,
    { params }: { params: Promise<{ vendorId: string }> }
  ) {
    const { vendorId } = await params;
    const sales = await saleService.findAll({
      where: {
        vendorId,
      },
    });
    return NextResponse.json(sales);
  }
}

export const { GET } = new VendorSalesController();
