import { trainingService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class TrainingSlugController {
  async GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
  ) {
    const { slug } = await params;
    const training = await trainingService.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    return NextResponse.json(training);
  }
}

export const { GET } = new TrainingSlugController();
