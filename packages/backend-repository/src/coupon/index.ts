import { BaseRepository } from '@repo/core';
import { Coupon, Prisma, PrismaClient } from '@repo/database';

import { inject, injectable, PrismaClientToken } from '@repo/core/container';

@injectable()
export class CouponRepository extends BaseRepository<
  Coupon,
  Prisma.CouponDelegate
> {
  constructor(@inject(PrismaClientToken) prisma: PrismaClient) {
    super(prisma, prisma.coupon);
  }
}
