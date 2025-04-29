import { catchErrors } from '@/utils';
import { NextResponse } from 'next/server';

@catchErrors()
class HelloController {
  async GET() {
    return NextResponse.json({ hello: 'world' });
  }
}

export const { GET } = new HelloController();
