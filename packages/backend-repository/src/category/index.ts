import { BaseRepository } from '@repo/core';
import { Category, Prisma, PrismaClient } from '@repo/database';

import { inject, injectable, PrismaClientToken } from '@repo/core/container';

@injectable()
export class CategoryRepository extends BaseRepository<
  Category,
  Prisma.CategoryDelegate
> {
  constructor(@inject(PrismaClientToken) prisma: PrismaClient) {
    super(prisma, prisma.category);
  }
}
