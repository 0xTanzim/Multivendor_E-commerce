import { marketService } from '@/lib/di';
import { handleError } from '@/utils';
import { isMarket } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const market = await marketService.findUnique({
      where: { slug },
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

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data: unknown = await req.json();

    if (!isMarket(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    delete data.id;

    const market = await marketService.update(id, data);

    return NextResponse.json(market);
  } catch (err) {
    return handleError(err);
  }
}
