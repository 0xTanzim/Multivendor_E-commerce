import { OrderRepository } from '@repo/backend-repository';
import { BaseService, injectable } from '@repo/core';
import { Order } from '@repo/database';

@injectable()
export class OrderService extends BaseService<Order, OrderRepository> {
  constructor(orderRepository: OrderRepository) {
    super(orderRepository);
  }

  async createOrderItems(
    orderItems: {
      productId: string;
      qty: number;
      price: number;
      orderId: string;
      imageUrl?: string;
      title: string;
    }[]
  ) {
    return this.repository.createManyOrderItems(orderItems);
  }
}
