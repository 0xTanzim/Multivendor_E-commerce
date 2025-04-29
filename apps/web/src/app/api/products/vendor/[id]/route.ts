import { productService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class VendorProductsController {
  async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
  }
}

export const { GET } = new VendorProductsController();
