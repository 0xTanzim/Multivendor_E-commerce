import { trainingService } from '@/lib/di';
import { handleError } from '@/utils';
import { Training, isTraining } from '@repo/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data: unknown = await req.json();
    if (!isTraining(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const trainingData: Training = {
      categoryId: data.categoryId,
      content: data.content,
      description: data.description,
      image: data.image ?? '',
      isActive: data.isActive,
      slug: data.slug,
      title: data.title,
    };

    const newTraining = await trainingService.create(trainingData);

    console.log(newTraining);

    return NextResponse.json(newTraining, { status: 201 });
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function GET(req: Request) {
  try {
    const trainings = await trainingService.findAll();

    return NextResponse.json(trainings, { status: 200 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
