import { marketService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { isMarket, Market } from '@repo/types';
import { NextResponse } from 'next/server';

@catchErrors()
class MarketController {
  async POST(req: Request) {
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
      email: data.email,
      phone: data.phone,
      website: data.website,
      address: data.address,
      coverImageUrl: data.coverImageUrl,
    };

    const newMarket = await marketService.create(marketData);

    return NextResponse.json(newMarket, { status: 201 });
  }

  async GET(_req: Request) {
    const markets = await marketService.findAll();
    return NextResponse.json(markets, { status: 200 });
  }
}
export const { GET, POST } = new MarketController();
