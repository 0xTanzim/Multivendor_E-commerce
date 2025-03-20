import { userService } from '@/lib/di';
import { handleError } from '@/utils';
import { isUser } from '@repo/types';
import { NextResponse } from 'next/server';


// export async function GET() {
//   try {
    
//     const user = await userService.findAll({
//       select: {
//         name: true,
//         id: true,
//       },
//     });

//     return NextResponse.json(user, { status: 200 });
//   } catch (error: unknown) {
//     return handleError(error);
//   }
// }
