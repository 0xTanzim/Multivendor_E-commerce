import { trainingService } from '@/lib/di';
import { handleError } from '@/utils';
import { isTraining } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const training = await trainingService.findUnique({
      where: { id: id },
    });

    return NextResponse.json(training);
  } catch (err) {
    return handleError(err);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const training = await trainingService.deleteById(id);
    return NextResponse.json(training);
  } catch (err) {
    return handleError(err);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data: unknown = await req.json();

    if (!isTraining(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    delete data.id;

    const training = await trainingService.update(id, data);

    return NextResponse.json(training);
  } catch (err) {
    return handleError(err);
  }
}
