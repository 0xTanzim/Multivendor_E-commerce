import { farmerService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class FarmerUserController {
  async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const farmer = await farmerService.getFarmerProfileByUserId(id);
    return NextResponse.json(farmer);
  }
}

export const { GET } = new FarmerUserController();
