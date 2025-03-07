import { handleError } from '@/utils';
import { FarmerService } from '@repo/backend-services';
import { isFarmer } from '@repo/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data: unknown = await req.json();

    if (!isFarmer(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const farmerService = FarmerService.getInstance();
    const newFarmer = await farmerService.createFarmer(data);

    return NextResponse.json(newFarmer, { status: 201 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
