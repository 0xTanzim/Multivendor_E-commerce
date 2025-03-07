import { handleError } from '@/utils';
import { UserService } from '@repo/backend-services';
import { isUser } from '@repo/types';
import { NextResponse } from 'next/server';
const userService = UserService.getInstance();

export async function POST(req: Request) {
  try {
    const data: unknown = await req.json();
    if (!isUser(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
    const newUser = await userService.createUser(data);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function GET() {
  try {
    const user = await userService.fetchAllUsers();
    return NextResponse.json(user, { status: 200 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
