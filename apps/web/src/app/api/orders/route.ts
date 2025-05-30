import { orderService } from '@/lib/di';
import { catchErrors } from '@/utils';
import { generateOrderNumber } from '@/utils/generate';
import { prisma } from '@repo/database';
import { ICombinedData, isOrder } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';

@catchErrors()
class OrderController {
  async POST(req: NextRequest) {
    const data: ICombinedData = await req.json();

    if (!isOrder(data.checkoutFormData)) {
      return NextResponse.json(
        { message: 'Invalid order data' },
        { status: 400 }
      );
    }

    const { checkoutFormData, cartItems } = data;

    const result = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          firstName: checkoutFormData.firstName,
          lastName: checkoutFormData.lastName,
          email: checkoutFormData.email,
          phoneNumber: checkoutFormData.phoneNumber,
          streetAddress: checkoutFormData.streetAddress,
          city: checkoutFormData.city,
          country: checkoutFormData.country,
          postalCode: checkoutFormData.postalCode,
          userId: checkoutFormData.userId,
          shippingCost: Number(checkoutFormData.shippingCost),
          paymentMethod: checkoutFormData.paymentMethod,
          orderNumber: generateOrderNumber(8),
        },
      });

      const newOrderItems = await tx.orderItem.createMany({
        data: cartItems.map((item) => ({
          productId: item.id,
          qty: Number(item.qty),
          price: Number(item.salePrice),
          orderId: newOrder.id,
          imageUrl: item.imageUrl ?? '',
          title: item.title,
          vendorId: item.vendorId,
        })),
      });

      const sales = await Promise.all(
        cartItems.map(async (item) => {
          const totalAmount = Number(item.salePrice) * Number(item.qty);

          const newSale = await tx.sale.create({
            data: {
              productId: item.id,
              orderId: newOrder.id,
              vendorId: item.vendorId,
              total: totalAmount,
              productQty: Number(item.qty),
              productPrice: Number(item.salePrice),
              productTitle: item.title,
              productImageUrl: item.imageUrl ?? '',
            },
          });

          return newSale;
        })
      );

      return { newOrder, newOrderItems, sales };
    });

    return NextResponse.json(result);
  }

  async GET(req: NextRequest) {
    const orderRes = await orderService.findAll({
      include: {
        OrderItem: true,
      },
    });

    return NextResponse.json(orderRes);
  }
}

export const { POST, GET } = new OrderController();
