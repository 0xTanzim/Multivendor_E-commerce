import { BaseRepository } from '@repo/core';
import { FarmerProfile, Prisma, PrismaClient } from '@repo/database';

import { inject, injectable, PrismaClientToken } from '@repo/core/container';

@injectable()
export class FarmerProfileRepository extends BaseRepository<
  FarmerProfile,
  Prisma.FarmerProfileDelegate
> {
  constructor(@inject(PrismaClientToken) prisma: PrismaClient) {
    super(prisma, prisma.farmerProfile);
  }
}
