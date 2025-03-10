import { BaseRepository } from '@repo/core';
import { Prisma, PrismaClient, Product } from '@repo/database';

import { inject, injectable, PrismaClientToken } from '@repo/core/container';

@injectable()
export class ProductRepository extends BaseRepository<
  Product,
  Prisma.ProductDelegate
> {
  constructor(@inject(PrismaClientToken) prisma: PrismaClient) {
    super(prisma, prisma.product);
  }
}
