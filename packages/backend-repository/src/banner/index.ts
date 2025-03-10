import { BaseRepository } from '@repo/core';
import { Banner, Prisma, PrismaClient } from '@repo/database';

import { inject, injectable, PrismaClientToken } from '@repo/core/container';

@injectable()
export class BannerRepository extends BaseRepository<
  Banner,
  Prisma.BannerDelegate
> {
  constructor(@inject(PrismaClientToken) prisma: PrismaClient) {
    super(prisma, prisma.banner);
  }
}
