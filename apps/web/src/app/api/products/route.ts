import { productService } from '@/lib/di';
import { handleError } from '@/utils';
import { isProduct } from '@repo/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data: unknown = await req.json();
    if (!isProduct(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const newProduct = await productService.createProduct(data);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function GET() {
  try {
    const products = await productService.findAll();
    return NextResponse.json(products);
  } catch (error: unknown) {
    return handleError(error);
  }
}
