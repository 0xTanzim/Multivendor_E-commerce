import { authService, userService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { NextResponse } from 'next/server';

@catchErrors()
class UserByIdController {
  async GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const user = await authService.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        accountStatus: true,
        emailVerified: true,
        user: {
          select: {
            id: true,
            profileImage: true,
            firstName: true,
            lastName: true,
            phone: true,
            username: true,
          },
        },
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        ...user,
        role: (user as any)?.role?.name,
      },
      { status: 200 }
    );
  }

  async PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
  ): Promise<Response> {
    const { id } = await params;
    const body = await req.json();
    const user = await userService.updateUser(id, body);
    return NextResponse.json(user, { status: 200 });
  }
}

export const { GET, PATCH } = new UserByIdController();
