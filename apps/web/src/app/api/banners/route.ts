import { BannerService } from '@repo/backend-services';
import { isBanner } from '@repo/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data: unknown = await req.json();

    if (!isBanner(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const bannerService = BannerService.getInstance();
    const banner = await bannerService.createBanner(data);

    return NextResponse.json(banner, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      {
        error: 'An error occurred',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bannerService = BannerService.getInstance();
    const banners = await bannerService.getBanners();

    if (banners.length === 0) {
      return NextResponse.json(
        { message: 'No banners found' },
        { status: 404 }
      );
    }

    return NextResponse.json(banners);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err, message: 'An error occurred' },
      { status: 500 }
    );
  }
}
