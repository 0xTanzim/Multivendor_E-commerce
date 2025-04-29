import { farmerService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class FarmerStatusController {
  async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const farmer = await farmerService.findFarmerById(id);

    return NextResponse.json(farmer);
  }

  async PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const data = await req.json();
    const updatedFarmer = await farmerService.updateFarmerStatus(id, data);

    return NextResponse.json(updatedFarmer);
  }
}

export const { GET, PATCH } = new FarmerStatusController();
