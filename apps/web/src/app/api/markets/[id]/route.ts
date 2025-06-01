import { RequirePolicy } from '@/lib/decorator/require-policy';
import { marketService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { MarketDeletePolicy, MarketUpdatePolicy } from '@repo/policies';
import { isMarket } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';
import { RateLimit } from '@/lib/decorator/rateLimit';

@catchErrors()
class MarketIdController {
  async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const market = await marketService.findById(id);
    return NextResponse.json(market);
  }

  @RequirePolicy(MarketDeletePolicy, {
    resourceFetcher: marketService.findById.bind(marketService),
  })
  @RateLimit({
    limit: 5,
    window: 60,
    keyPrefix: 'markets:delete',
  })
  async DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const market = await marketService.deleteById(id);
    return NextResponse.json(market);
  }

  @RequirePolicy(MarketUpdatePolicy, {
    resourceFetcher: marketService.findById.bind(marketService),
  })
  @RateLimit({
    limit: 5,
    window: 60,
    keyPrefix: 'markets:update',
  })
  async PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const data: unknown = await req.json();

    if (!isMarket(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const market = await marketService.updateMarket(id, data);
    return NextResponse.json(market);
  }
}

export const { GET, DELETE, PATCH } = new MarketIdController();
