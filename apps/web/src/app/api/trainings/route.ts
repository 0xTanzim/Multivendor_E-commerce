import { trainingService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { Training, isTraining } from '@repo/types';
import { NextResponse } from 'next/server';

@catchErrors()
class TrainingController {
  async POST(req: Request) {
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
    return NextResponse.json(newTraining, { status: 201 });
  }

  async GET() {
    const trainings = await trainingService.findAll({
      include: {
        category: true,
      },
    });

    return NextResponse.json(trainings, { status: 200 });
  }
}

export const { POST, GET } = new TrainingController();
