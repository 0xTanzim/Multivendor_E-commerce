import { BaseRepository } from '@repo/core';
import { Market, Prisma, PrismaClient } from '@repo/database';

import { inject, injectable, PrismaClientToken } from '@repo/core/container';

@injectable()
export class MarketRepository extends BaseRepository<
  Market,
  Prisma.MarketDelegate
> {
  constructor(@inject(PrismaClientToken) prisma: PrismaClient) {
    super(prisma, prisma.market);
  }
}
