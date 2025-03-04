import { CreateMarket, isMarket } from '@repo/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data: unknown = await req.json();

    if (!isMarket(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const newMarket: CreateMarket = {
      description: data.description,
      title: data.title,
      categoryIds: data.categoryIds,
      isActive: data.isActive,
      slug: data.slug,
      logoUrl: data.logoUrl,
    };

    console.log(newMarket);

    return NextResponse.json(newMarket, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: 'An error occurred' },
      { status: 500 }
    );
  }
}
