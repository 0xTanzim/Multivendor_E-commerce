import { authService } from '@/lib/di';
import { handleError } from '@/utils';
import { NextResponse } from 'next/server';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const user = await authService.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,

        user: {
          select: {
            id: true,
            profileImage: true,
          },
        },
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    return handleError(err);
  }
}

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
//     const user = await userService.deleteById(id);
//     return NextResponse.json(user);
//   } catch (err) {
//     return handleError(err);
//   }
// }
