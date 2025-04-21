import { catchErrors } from '@/utils';
import { NextResponse } from 'next/server';

class HelloRoute {
  @catchErrors()
  async GET() {
    return NextResponse.json({ hello: 'world' });
  }
}

const helloRoute = new HelloRoute();
export const GET = helloRoute.GET.bind(helloRoute);
