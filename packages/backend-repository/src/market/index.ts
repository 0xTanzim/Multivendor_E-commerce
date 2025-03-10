import { BaseRepository } from '@repo/core';
import { Market, Prisma, PrismaClient } from '@repo/database';

export class MarketRepository extends BaseRepository<
  Market,
  Prisma.MarketDelegate
> {
  constructor(prisma: PrismaClient) {
    super(prisma, prisma.market);
  }
}
