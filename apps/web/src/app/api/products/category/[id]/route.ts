import { productService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class ProductCategoryController {
  async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
  }
}

export const { GET } = new ProductCategoryController();
