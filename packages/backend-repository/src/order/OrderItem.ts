import { BaseRepository } from '@repo/core';
import { inject, injectable, PrismaClientToken } from '@repo/core/container';
import { OrderItem, Prisma, PrismaClient } from '@repo/database';

@injectable()
export class OrderItemRepository extends BaseRepository<
  OrderItem,
  Prisma.OrderItemDelegate
> {
  constructor(@inject(PrismaClientToken) prisma: PrismaClient) {
    super(prisma, prisma.orderItem);
  }
}
