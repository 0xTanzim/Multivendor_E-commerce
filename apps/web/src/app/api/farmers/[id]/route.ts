import { farmerService } from '@/lib/di';
import { handleError } from '@/utils';
import { isFarmer } from '@repo/types';
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

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
//     const farmer = await farmerService.deleteById(id);
//     return NextResponse.json(farmer);
//   } catch (err) {
//     return handleError(err);
//   }
// }

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data: unknown = await req.json();

    if (!isFarmer(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const farmer = await farmerService.updateFarmer(id, data);
    return NextResponse.json(data);
  } catch (err) {
    return handleError(err);
  }
}
