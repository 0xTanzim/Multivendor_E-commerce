import { productService } from '@/lib/di';
import { handleError } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    let products = null;

    if (id) {
      products = await productService.findMany({
        where: { categoryId: id },
        take: 5,
        skip: 0,
      });
    }

    return NextResponse.json(products);
  } catch (err) {
    return handleError(err);
  }
}
