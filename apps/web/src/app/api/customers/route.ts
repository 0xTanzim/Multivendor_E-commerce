import { userService } from '@/lib/di';
import { handleError } from '@/utils';
import { NextResponse } from 'next/server';

export async function GET(_req: Request): Promise<NextResponse> {
  try {
    const customers = await userService.findAll({
      where: {
        authUser: {
          role: 'USER',
        },
      },
      select: {
        authUser: {
          omit: {
            password: true,
            verificationToken: true,
          },
        },
        profileImage: true,
        bio: true,
        createdAt: true,
      },
    });
    return NextResponse.json(customers, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}
