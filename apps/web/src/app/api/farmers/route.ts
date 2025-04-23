import { farmerService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { isFarmer } from '@repo/types';
import { NextResponse } from 'next/server';

@catchErrors()
class FarmerController {
  async POST(req: Request) {
    const data: unknown = await req.json();

    if (!isFarmer(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const newFarmer = await farmerService.createFarmer(data);

    return NextResponse.json(newFarmer, { status: 201 });
  }

  async GET(_req: Request) {
    const farmers = await farmerService.findAllFarmers();
    return NextResponse.json(farmers, { status: 200 });
  }
}

export const { POST, GET } = new FarmerController();
