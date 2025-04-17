import { handleError } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

function requirePermission(permission: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      // Add permission logic here (e.g., check user roles)
      console.log(`Checking permission: ${permission}`);
      return originalMethod.apply(this, args);
    };
  };
}

export class HelloController {
  // @requirePermission('hello:read')
  // static async GET() {
  //   return NextResponse.json({ message: 'Hello, world!' });
  // }

  @requirePermission('permission-group:read')
  static GET = withErrorHandling(async () => {
    return NextResponse.json({ message: 'Hello, world!' });
  });

  async POST(request: NextRequest) {
    const data = await request.json();
    return NextResponse.json({ message: `Hello, ${data.name}!` });
  }

}

export const GET = HelloController.GET.bind(HelloController);

// export const helloController = new HelloController();

// export async function GET() {
//   return helloController.GET();
// }

// export async function POST(request: NextRequest) {
//   return helloController.POST(request);
// }

export function withErrorHandling<
  T extends (request?: NextRequest, ...args: any[]) => Promise<Response>,
>(handler: T): T {
  return async function (request?: NextRequest, ...args: any[]) {
    try {
      return await handler(request, ...args);
    } catch (error) {
      return handleError(error);
    }
  } as T;
}





