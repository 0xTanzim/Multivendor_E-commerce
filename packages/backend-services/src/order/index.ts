import { OrderRepository } from '@repo/backend-repository';
import { BaseService, injectable } from '@repo/core';
import { Order } from '@repo/database';

@injectable()
export class OrderService extends BaseService<Order, OrderRepository> {
  constructor(orderRepository: OrderRepository) {
    super(orderRepository);
  }

  // async create(order: {
  //   firstName: string;
  //   lastName: string;
  //   email: string;
  //   phoneNumber: string;
  //   streetAddress: string;
  //   city: string;
  //   country: string;
  //   postalCode: string;
  //   userId: string;
  //   shippingCost: number | string;
  //   paymentMethod: string;
  //   orderNumber: string;
  // }) {
  //   return this.repository.createOrder(order);
  // }

  async createOrderItems(
    orderItems: {
      productId: string;
      qty: number;
      price: number;
      orderId: string;
      imageUrl?: string;
      title: string;
      vendorId: string;
    }[]
  ) {
    try {
      return this.repository.createManyOrderItems(orderItems);
    } catch (err) {
      this.handlePrismaError(err, 'createOrderItems');

    }
  }
}
