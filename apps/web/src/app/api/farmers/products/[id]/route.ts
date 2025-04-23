import { farmerService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class FarmerProductsController {
  async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const farmer = await farmerService.getFarmerAllProducts(id);
    return NextResponse.json(farmer);
  }
}

export const { GET } = new FarmerProductsController();
