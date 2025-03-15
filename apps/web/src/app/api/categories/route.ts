import { categoryService } from '@/lib/di';
import { handleError } from '@/utils';
import { CreateCategory, isCategory } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data: unknown = await req.json();

    if (!isCategory(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const CategoryData: CreateCategory = {
      title: data.title,
      slug: data.slug,
      imageUrl: data.imageUrl ?? '',
      description: data.description ?? '',
      isActive: data.isActive ?? false,
    };

    const newCategory = await categoryService.create(CategoryData);
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function GET(req: NextRequest) {
  try {
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
  } catch (err) {
    return handleError(err);
  }
}
