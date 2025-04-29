import { categoryService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { CreateCategory, isCategory } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class CategoryController {
  async POST(req: Request) {
    const data: unknown = await req.json();

    if (!isCategory(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const categoryData: CreateCategory = {
      title: data.title,
      slug: data.slug,
      imageUrl: data.imageUrl ?? '',
      description: data.description ?? '',
      isActive: data.isActive ?? false,
    };

    const newCategory = await categoryService.create(categoryData);
    return NextResponse.json(newCategory, { status: 201 });
  }

  async GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('include');

    let categories = null;

    if (query === 'products') {
      categories = await categoryService.findAll({
        include: {
          products: true,
        },
      });
    } else {
      categories = await categoryService.findAll();
    }

    return NextResponse.json(categories);
  }
}

export const { POST, GET } = new CategoryController();
