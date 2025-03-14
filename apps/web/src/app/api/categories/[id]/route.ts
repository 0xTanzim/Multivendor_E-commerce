import { categoryService } from '@/lib/di';
import { handleError } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const category = await categoryService.findUnique({
      where: { id: id },
      include: {
        products: true,
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    return handleError(err);
  }
}
