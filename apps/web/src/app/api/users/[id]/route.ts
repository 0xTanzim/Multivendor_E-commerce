import { userService } from '@/lib/di';
import { handleError } from '@/utils';
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await userService.findById(id);

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}
