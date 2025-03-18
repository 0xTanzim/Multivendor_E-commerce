import { categoryService } from '@/lib/di';
import { handleError } from '@/utils';
import { isCategory } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const searchParams = req.nextUrl.searchParams;
    const includeParam = searchParams.get('include');

    let category = null;

    if (includeParam === 'products') {
      category = await categoryService.findUnique({
        where: { id: id },
        include: {
          products: true,
        },
      });
    } else {
      category = await categoryService.findUnique({
        where: { id: id },
      });
    }

    return NextResponse.json(category);
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
    const category = await categoryService.deleteById(id);
    return NextResponse.json(category);
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

    if (!isCategory(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const CategoryData = {
      title: data.title,
      slug: data.slug,
      imageUrl: data.imageUrl ?? '',
      description: data.description ?? '',
      isActive: data.isActive ?? false,
    };

    const updatedCategory = await categoryService.update(id, CategoryData);
    return NextResponse.json(updatedCategory);
  } catch (err) {
    return handleError(err);
  }
}
