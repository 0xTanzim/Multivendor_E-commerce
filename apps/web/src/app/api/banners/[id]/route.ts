import { bannerService } from '@/lib/di';
import { handleError } from '@/utils';
import { isBanner } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const banner = await bannerService.findUnique({
      where: { id: id },
    });

    return NextResponse.json(banner);
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
    const banner = await bannerService.deleteById(id);
    return NextResponse.json(banner);
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

    if (!isBanner(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    delete data.id;

    const banner = await bannerService.update(id, data);

    return NextResponse.json(banner);
  } catch (err) {
    return handleError(err);
  }
}
