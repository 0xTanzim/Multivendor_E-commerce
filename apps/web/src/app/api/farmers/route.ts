import { farmerService } from '@/lib/di';
import { handleError } from '@/utils';
import { isFarmer } from '@repo/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data: unknown = await req.json();

    if (!isFarmer(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    console.log('Creating farmer with data', data);
    const newFarmer = await farmerService.createFarmer(data);

    return NextResponse.json(data, { status: 201 });
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function GET(_req: Request) {
  try {
    const farmers = await farmerService.findAllFarmers();
    return NextResponse.json(farmers, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}
