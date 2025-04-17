import { authService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { isAuthUser } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';

export class RegisterUser {
  @catchErrors()
  static async GET(req: NextRequest) {
    return NextResponse.json({ message: 'GET request not allowed' });
  }

  @catchErrors()
  static async POST(req: NextRequest) {
    const data: unknown = await req.json();

    if (!isAuthUser(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const res = await authService.register(data);

    return NextResponse.json(res);
  }
}

export const { GET, POST } = RegisterUser;
