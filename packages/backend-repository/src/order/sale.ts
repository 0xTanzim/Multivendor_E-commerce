import { BaseRepository } from '@repo/core';
import { inject, injectable, PrismaClientToken } from '@repo/core/container';
import { Prisma, PrismaClient, Sale } from '@repo/database';
import { OrderItemRepository } from './OrderItem';

@injectable()
export class SaleRepository extends BaseRepository<Sale, Prisma.SaleDelegate> {
  constructor(
    @inject(PrismaClientToken) prisma: PrismaClient,
    readonly orderItemRepository: OrderItemRepository
  ) {
    super(prisma, prisma.sale);
  }
}
