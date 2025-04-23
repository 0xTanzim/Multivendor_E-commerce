import { marketService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { isMarket } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class MarketIdController {
  async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const market = await marketService.findById(id);

    return NextResponse.json(market);
  }

  async DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const market = await marketService.deleteById(id);
    return NextResponse.json(market);
  }

  async PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const data: unknown = await req.json();

    if (!isMarket(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    console.log('data', data);
    const { categoryIds, ...rest } = data;

    const market = await marketService.update(id, {
      ...rest,
      categories: {
        set: categoryIds.map((id: string) => ({ id })),
      },
    });

    console.log('market', market);

    return NextResponse.json(market);
  }
}

export const { GET, DELETE, PATCH } = new MarketIdController();
