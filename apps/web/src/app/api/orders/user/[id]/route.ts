import { orderService } from '@/lib/di';
import { handleError } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const orderRes = await orderService.findAll({
      where: { userId: id },
      orderBy: { createdAt: 'desc' },

      include: {
        OrderItem: true,
      },
    });

    if (orderRes.length === 0) {
      return NextResponse.json(
        {
          message: 'No orders found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(orderRes);
  } catch (err) {
    return handleError(err);
  }
}
