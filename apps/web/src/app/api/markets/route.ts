import { marketService } from '@/lib/di';
import { handleError } from '@/utils';
import { isMarket, Market } from '@repo/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data: unknown = await req.json();

    if (!isMarket(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const marketData: Market = {
      description: data.description,
      title: data.title,
      categoryIds: data.categoryIds,
      isActive: data.isActive,
      slug: data.slug,
      logoUrl: data.logoUrl,
    };

    const newMarket = await marketService.create(marketData);

    return NextResponse.json(newMarket, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
    return handleError(error);
  }
}

export async function GET(req: Request) {
  try {
    const markets = await marketService.findAll();

    return NextResponse.json(markets, { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    return handleError(error);
  }
}
