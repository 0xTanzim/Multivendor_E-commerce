import { userService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { NextResponse } from 'next/server';

@catchErrors()
class UserController {
  async GET(): Promise<NextResponse> {
    const user = await userService.findAll();
    return NextResponse.json(user, { status: 200 });
  }
}

export const { GET } = new UserController();
