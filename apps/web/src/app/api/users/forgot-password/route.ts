import { authService } from '@/lib/di';
import { handleError } from '@/utils';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  try {
    const { email } = await req.json();

    const existingUser = await authService.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: `User Not Found`,
        },
        { status: 404 }
      );
    }

    await authService.sendForgetPasswordEmail(existingUser);

    return NextResponse.json(
      {
        data: null,
        message: `Password reset link sent to ${email}`,
      },
      { status: 200 }
    );
  } catch (err) {
    return handleError(err);
  }
}
