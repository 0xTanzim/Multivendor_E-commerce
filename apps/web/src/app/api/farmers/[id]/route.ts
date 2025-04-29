import { farmerService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { isFarmer } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class FarmerIdController {
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
    const data: unknown = await req.json();
    if (!isFarmer(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const farmer = await farmerService.updateFarmer(id, data);
    return NextResponse.json(farmer);
  }

  async DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    await farmerService.deleteById(id);
    return NextResponse.json(
      { message: 'Farmer deleted successfully' },
      { status: 200 }
    );
  }
}

export const { GET, PATCH, DELETE } = new FarmerIdController();
