import { handleError } from '@/utils';
import { UserRepository } from '@repo/backend-repository';
import { UserServiceExtend } from '@repo/backend-services';
import { NextResponse } from 'next/server';

import { prisma } from '@repo/database';
const userRepository = new UserRepository(prisma);
const userServiceExtend = new UserServiceExtend(userRepository);

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await userServiceExtend.findById(id);

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}
