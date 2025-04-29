import { authService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { isAuthUser } from '@repo/types';
import { NextResponse } from 'next/server';

@catchErrors()
class RegisterController {
  async POST(req: Request) {
    const data: unknown = await req.json();

    if (!isAuthUser(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const res = await authService.register(data);
    return NextResponse.json(res, { status: 201 });
  }
}

export const { POST } = new RegisterController();
