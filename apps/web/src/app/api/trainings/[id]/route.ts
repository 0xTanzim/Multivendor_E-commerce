import { trainingService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { isTraining } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class TrainingIdController {
  async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const training = await trainingService.findUnique({
      where: { id: id },
    });

    return NextResponse.json(training);
  }

  async DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const training = await trainingService.deleteById(id);
    return NextResponse.json(training);
  }

  async PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const data: unknown = await req.json();

    if (!isTraining(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    delete data.id;
    const training = await trainingService.update(id, data);
    return NextResponse.json(training);
  }
}

export const { GET, DELETE, PATCH } = new TrainingIdController();
