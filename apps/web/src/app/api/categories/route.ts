import { CategoryService } from '@repo/backend-services';
import { CreateCategory, isCategory } from '@repo/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data: unknown = await req.json();

    if (!isCategory(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const categoryService = CategoryService.getInstance();

    const existingCategory = await categoryService.isExistingCategory(
      data.slug as string
    );

    if (existingCategory) {
      return NextResponse.json(
        { message: 'Category already exists' },
        { status: 400 } // Bad Request
      );
    }

    const newCategory = await categoryService.createCategory(
      data as CreateCategory
    );

    console.log(newCategory);

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: 'An error occurred' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const categoryService = CategoryService.getInstance();

    const categories = await categoryService.getCategories();
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
