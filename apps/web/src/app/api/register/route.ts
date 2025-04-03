import { authService } from '@/lib/di';
import { handleError } from '@/utils';
import { isAuthUser } from '@repo/types';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data: unknown = await req.json();

    if (!isAuthUser(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const res = await authService.register(data);

    return NextResponse.json(res, { status: 201 });
  } catch (error: unknown) {
    return handleError(error);
  }
}

// export async function GET(req: Request) {
//   try {
//     const res = await authService.findAll();

//     return NextResponse.json(res, { status: 200 });
//   } catch (error: unknown) {
//     return handleError(error);
//   }
// }

// export async function DELETE(req: Request) {
//   try {
//     const res = await authService.testDeleteAllUserandAuthUser();

//     return NextResponse.json(res, { status: 200 });
//   } catch (error: unknown) {
//     return handleError(error);
//   }
// }
