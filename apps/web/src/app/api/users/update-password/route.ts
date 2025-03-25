import { authService } from '@/lib/di';
import { handleError } from '@/utils';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  try {
    const { password, id } = await req.json();

    const existingUser = await authService.findById(id);

    if (!existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: `User Not Found`,
        },
        { status: 404 }
      );
    }

    const response = await authService.updatePassword({ password, id });

    return NextResponse.json(
      {
        data: response,
        message: `Password updated successfully`,
      },
      { status: 200 }
    );
  } catch (err) {
    return handleError(err);
  }
}
