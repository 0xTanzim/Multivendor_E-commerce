import { userService } from '@/lib/di';
import { handleError } from '@/utils';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const user = await userService.findAll();

    return NextResponse.json(user, { status: 200 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
