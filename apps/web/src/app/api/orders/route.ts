import { orderService } from '@/lib/di';
import { handleError } from '@/utils';
import { generateOrderNumber } from '@/utils/generate';
import { ICombinedData, isOrder } from '@repo/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data: ICombinedData = await req.json();

    if (!isOrder(data.checkoutFormData)) {
      return NextResponse.json(
        { message: 'Invalid order data' },
        { status: 400 }
      );
    }

    const { checkoutFormData, cartItems } = data;

    const orderRes = await orderService.create({
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
    });

    const newOrderItems = await orderService.createOrderItems(
      cartItems.map((item) => ({
        productId: item.id,
        qty: Number(item.qty),
        price: Number(item.salePrice),
        orderId: orderRes.id,
        imageUrl: item.imageUrl ?? '',
        title: item.title,
      }))
    );

    return NextResponse.json({ orderRes, newOrderItems });
  } catch (err) {
    return handleError(err);
  }
}

export async function GET(req: NextRequest) {
  try {
    const orderRes = await orderService.findAll({
      include: {
        OrderItem: true,
      },
    });

    return NextResponse.json({ orderRes });
  } catch (err) {
    return handleError(err);
  }
}
