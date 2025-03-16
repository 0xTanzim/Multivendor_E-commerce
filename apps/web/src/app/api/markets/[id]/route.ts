import { marketService } from '@/lib/di';
import { handleError } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const market = await marketService.findUnique({
      where: { id: id },
    });

    return NextResponse.json(market);
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
    const market = await marketService.deleteById(id);
    return NextResponse.json(market);
  } catch (err) {
    return handleError(err);
  }
}
