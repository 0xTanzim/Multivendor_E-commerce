import { bannerService } from '@/lib/di';
import { handleError } from '@/utils';
import { isBanner } from '@repo/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data: unknown = await req.json();

    if (!isBanner(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const banner = await bannerService.create({
      ...data,
      imageUrl: data.imageUrl || '',
    });

    return NextResponse.json(banner, { status: 201 });
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function GET() {
  try {
    const banners = await bannerService.findAll();

    return NextResponse.json(banners);
  } catch (err: unknown) {
    return handleError(err);
  }
}
