import { categoryService } from '@/lib/di';
import { handleError } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const searchParams = req.nextUrl.searchParams;
    const includeParam = searchParams.get('include');

    let category = null;

    if (includeParam === 'products') {
      category = await categoryService.findUnique({
        where: { slug: slug },
        include: {
          products: true,
        },
      });
    } else {
      category = await categoryService.findUnique({
        where: { slug: slug },
      });
    }

    return NextResponse.json(category);
  } catch (err) {
    return handleError(err);
  }
}
