import { PERMISSIONS } from '@/constants/Permissions';
import { Log, RequirePermission } from '@/lib/decorator';
import { RateLimit } from '@/lib/decorator/rateLimit';
import { marketService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { isMarket, Market } from '@repo/types';
import { NextResponse } from 'next/server';

// import { z } from 'zod';

// export const marketSchema = z.object({
//   title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
//   description: z.string().optional(),
//   categoryIds: z.array(z.string()).optional(),
//   isActive: z.boolean().optional().default(true),
//   slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/i, 'Invalid slug'),
//   logoUrl: z.string().url().optional(),
//   email: z.string().email().optional(),
//   phone: z.string().optional(),
//   website: z.string().url().optional(),
//   address: z.string().optional(),
//   coverImageUrl: z.string().url().optional(),
// });

// export type MarketInput = z.infer<typeof marketSchema>;

@catchErrors()
class MarketController {
  @RequirePermission(PERMISSIONS.CREATE_MARKET)
  async POST(req: Request) {
    const data = await req.json();

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
      ownerId: data.ownerId,
    };

    const newMarket = await marketService.create(marketData);

    return NextResponse.json(newMarket, { status: 201 });
  }

  @RequirePermission(PERMISSIONS.READ_MARKET, {
    allowPublic: true,
  })
  @RateLimit({
    limit: 30,
    window: 60,
  })
  @Log()
  async GET(_req: Request) {
    const markets = await marketService.findAll();
    return NextResponse.json(markets, { status: 200 });
  }
}
export const { GET, POST } = new MarketController();
