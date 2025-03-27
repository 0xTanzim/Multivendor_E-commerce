import { orderService } from '@/lib/di';
import { handleError } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;

    const orderRes = await orderService.findUnique({
      where: { id: orderId },

      include: {
        OrderItem: true,
      },
    });

    if (!orderRes) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(orderRes);
  } catch (err) {
    return handleError(err);
  }
}
