import { bannerService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { isBanner } from '@repo/types';
import { NextResponse } from 'next/server';

@catchErrors()
class BannerController {
  async POST(req: Request) {
    const data: unknown = await req.json();

    if (!isBanner(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const banner = await bannerService.create({
      ...data,
      imageUrl: data.imageUrl || '',
    });

    return NextResponse.json(banner, { status: 201 });
  }

  async GET() {
    const banners = await bannerService.findAll();
    return NextResponse.json(banners);
  }
}

export const { POST, GET } = new BannerController();
