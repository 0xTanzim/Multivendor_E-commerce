import { orderService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class OrderIdController {
  async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
  }
}

export const { GET } = new OrderIdController();
