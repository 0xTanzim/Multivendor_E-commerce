import { trainingService } from '@/lib/di';
import { handleError } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const training = await trainingService.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    return NextResponse.json(training);
  } catch (err) {
    return handleError(err);
  }
}
