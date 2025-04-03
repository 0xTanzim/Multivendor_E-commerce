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
      products = await productService.findAll({
        where: {
          userId: id,
        },
      });
    }

    return NextResponse.json(products);
  } catch (err) {
    return handleError(err);
  }
}
