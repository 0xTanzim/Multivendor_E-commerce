import { userService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { NextResponse } from 'next/server';

@catchErrors()
class CustomerController {
  async GET(_req: Request): Promise<NextResponse> {
    const customers = await userService.findAll({
      where: {
        authUser: {
          role: {
            name: 'User',
          },
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
  }
}

export const { GET } = new CustomerController();
