import { productService } from '@/lib/di';
import { handleError } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const product = await productService.findUnique({
      where: { slug: slug },
    });

    return NextResponse.json(product);
  } catch (err) {
    return handleError(err);
  }
}
