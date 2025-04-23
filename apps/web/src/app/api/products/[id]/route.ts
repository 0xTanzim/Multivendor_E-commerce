import { productService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { isProduct } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class ProductIdController {
  async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await productService.findUnique({
      where: { id: id },
    });

    return NextResponse.json(product);
  }

  async DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const product = await productService.deleteById(id);
    return NextResponse.json(product);
  }

  async PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const data: unknown = await req.json();

    if (!isProduct(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const product = await productService.updateProduct(id, data);
    return NextResponse.json(product);
  }
}

export const { GET, DELETE, PATCH } = new ProductIdController();
