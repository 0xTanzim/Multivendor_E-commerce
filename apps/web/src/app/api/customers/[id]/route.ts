import { handleError } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function Patch(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const body = await req.json();

    console.log('body', body);

    return NextResponse.json(id);
  } catch (err) {
    return handleError(err);
  }
}
