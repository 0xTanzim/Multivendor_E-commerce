import { BaseRepository } from '@repo/core';
import { inject, injectable, PrismaClientToken } from '@repo/core/container';
import { Order, Prisma, PrismaClient } from '@repo/database';
import { OrderItemRepository } from './OrderItem';

@injectable()
export class OrderRepository extends BaseRepository<
  Order,
  Prisma.OrderDelegate
> {
  constructor(
    @inject(PrismaClientToken) prisma: PrismaClient,
    readonly orderItemRepository: OrderItemRepository
  ) {
    super(prisma, prisma.order);
  }

  async createOrder(order: Prisma.OrderCreateInput) {
    return this.create(order);
  }

  async createManyOrderItems(orderItems: Prisma.OrderItemCreateManyInput[]) {
    return this.orderItemRepository.createMany(orderItems);
  }

  






}
