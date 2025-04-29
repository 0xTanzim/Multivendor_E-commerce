import { categoryService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { isCategory } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class CategoryIdController {
  async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
  }

  async DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const category = await categoryService.deleteById(id);
    return NextResponse.json(category);
  }

  async PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const data: unknown = await req.json();

    if (!isCategory(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const categoryData = {
      title: data.title,
      slug: data.slug,
      imageUrl: data.imageUrl ?? '',
      description: data.description ?? '',
      isActive: data.isActive ?? false,
    };

    const updatedCategory = await categoryService.update(id, categoryData);
    return NextResponse.json(updatedCategory);
  }
}

export const { GET, DELETE, PATCH } = new CategoryIdController();
