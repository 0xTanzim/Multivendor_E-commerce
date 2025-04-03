import { farmerService } from '@/lib/di';
import { handleError } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const farmer = await farmerService.findFarmerById(id);

    return NextResponse.json(farmer);
  } catch (err) {
    return handleError(err);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const data = await req.json();

    const updatedFarmer = await farmerService.updateFarmerStatus(id, data);

    return NextResponse.json(updatedFarmer);
  } catch (err) {
    return handleError(err);
  }
}
