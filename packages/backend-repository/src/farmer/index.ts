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



  async updateFarmerWithUser(
    id: string,
    userId: string,
    farmerProfileData: Partial<FarmerProfile>,
    userData: Partial<{ name: string; email: string }>
  ) {
    return this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: userData,
      }),
      this.prisma.farmerProfile.update({
        where: { id },
        data: farmerProfileData,
      }),
    ]);
  }





}
