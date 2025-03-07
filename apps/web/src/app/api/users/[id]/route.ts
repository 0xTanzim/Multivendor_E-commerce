import { handleError } from '@/utils';
import { UserService } from '@repo/backend-services';
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const userService = UserService.getInstance();
    const user = await userService.fetchUserById(id);

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}
