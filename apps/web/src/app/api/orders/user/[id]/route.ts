import { orderService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class UserOrderController {
  async GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
  }
}

export const { GET } = new UserOrderController();
