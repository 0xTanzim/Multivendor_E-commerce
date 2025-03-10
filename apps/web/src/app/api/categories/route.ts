import { categoryService } from '@/lib/di';
import { handleError } from '@/utils';
import { CreateCategory, isCategory } from '@repo/types';
import { NextResponse } from 'next/server';

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

export async function GET() {
  try {
    const categories = await categoryService.findAll();
    return NextResponse.json(categories);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : 'An unexpected error occurred',
        message: 'An error occurred',
      },
      { status: 500 }
    );
  }
}
