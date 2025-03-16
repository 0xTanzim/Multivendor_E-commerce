import { farmerService } from '@/lib/di';
import { handleError } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const farmer = await farmerService.findUnique({
      where: { id: id },
    });

    return NextResponse.json(farmer);
  } catch (err) {
    return handleError(err);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const farmer = await farmerService.deleteById(id);
    return NextResponse.json(farmer);
  } catch (err) {
    return handleError(err);
  }
}
