import { PERMISSIONS } from '@/constants/Permissions';
import { Log, RequirePermission } from '@/lib/decorator';
import { RateLimit } from '@/lib/decorator/rateLimit';
import { marketService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { isMarket } from '@repo/types';
import { NextResponse } from 'next/server';

@catchErrors()
class MarketController {
  @RequirePermission(PERMISSIONS.CREATE_MARKET)
  @RateLimit({
    limit: 5,
    window: 60,
    keyPrefix: 'markets:create',
  })
  async POST(req: Request) {
    const data = await req.json();

    if (!isMarket(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const newMarket = await marketService.createMarket(data);
    return NextResponse.json(newMarket, { status: 201 });
  }

  @RequirePermission(PERMISSIONS.READ_MARKET, {
    allowPublic: true,
  })
  @RateLimit({
    limit: 30,
    window: 60,
    keyPrefix: 'markets:read',
  })
  @Log()
  async GET(_req: Request) {
    const markets = await marketService.findAll();
    return NextResponse.json(markets, { status: 200 });
  }
}
export const { GET, POST } = new MarketController();
