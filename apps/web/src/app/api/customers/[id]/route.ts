import { catchErrors } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class CustomerByIdController {
  async PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) {
    const { id } = await params;
    const body = await req.json();
    return NextResponse.json(body);
  }
}

export const { PATCH } = new CustomerByIdController();
