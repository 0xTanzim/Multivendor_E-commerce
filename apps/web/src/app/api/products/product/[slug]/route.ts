import { productService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class ProductSlugController {
  async GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
  ) {
    const { slug } = await params;
    const product = await productService.findUnique({
      where: { slug: slug },
    });

    return NextResponse.json(product);
  }
}

export const { GET } = new ProductSlugController();
