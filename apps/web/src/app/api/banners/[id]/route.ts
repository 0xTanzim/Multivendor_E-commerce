import { bannerService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { isBanner } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class BannerIdController {
  async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const banner = await bannerService.findUnique({
      where: { id: id },
    });

    return NextResponse.json(banner);
  }

  async DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const banner = await bannerService.deleteById(id);
    return NextResponse.json(banner);
  }

  async PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const data: unknown = await req.json();

    if (!isBanner(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    delete data.id;
    const banner = await bannerService.update(id, data);
    return NextResponse.json(banner);
  }
}

export const { GET, DELETE, PATCH } = new BannerIdController();
