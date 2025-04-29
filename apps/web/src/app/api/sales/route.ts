import { saleService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class SaleController {
  async GET(req: NextRequest) {
    const sales = await saleService.findAll();
    return NextResponse.json(sales);
  }
}

export const { GET } = new SaleController();
