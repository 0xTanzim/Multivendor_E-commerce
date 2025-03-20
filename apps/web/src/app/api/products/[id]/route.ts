import { productService } from '@/lib/di';
import { handleError } from '@/utils';
import { isProduct } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await productService.findUnique({
      where: { id: id },
    });

    return NextResponse.json(product);
  } catch (err) {
    return handleError(err);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await productService.deleteById(id);
    return NextResponse.json(product);
  } catch (err) {
    return handleError(err);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data: unknown = await req.json();

    if (!isProduct(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const product = await productService.updateProduct(id, data);
    return NextResponse.json(product);
  } catch (err) {
    return handleError(err);
  }
}
