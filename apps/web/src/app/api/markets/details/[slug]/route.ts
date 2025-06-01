import { marketService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class MarketDetailsController {
  async GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
  ) {
    const { slug } = await params;
    const market = await marketService.findUnique({
      where: { slug },
    });

    return NextResponse.json(market);
  }
}

export const { GET } = new MarketDetailsController();
