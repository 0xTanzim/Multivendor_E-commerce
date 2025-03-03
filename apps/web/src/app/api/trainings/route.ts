import { Community as Training, isCommunity as isTraining } from '@repo/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data: unknown = await req.json();

    if (!isTraining(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const newTraining: Training = {
      categoryId: data.categoryId,
      content: data.content,
      description: data.description,
      expertId: data.expertId,
      id: data.id,
      image: data.image,
      isActive: data.isActive,
      slug: data.slug,
      title: data.title,
    };

    console.log(newTraining);

    return NextResponse.json(newTraining, { status: 201 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { error: error, message: 'An error occurred' },
      { status: 500 }
    );
  }
}
