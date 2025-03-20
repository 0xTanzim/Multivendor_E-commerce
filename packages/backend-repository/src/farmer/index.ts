import { BaseRepository } from '@repo/core';
import { inject, injectable, PrismaClientToken } from '@repo/core/container';
import { FarmerProfile, Prisma, PrismaClient } from '@repo/database';
import { FarmerInput } from '@repo/types';
import { AuthRepository } from '../auth';

@injectable()
export class FarmerProfileRepository extends BaseRepository<
  FarmerProfile,
  Prisma.FarmerProfileDelegate
> {
  constructor(
    @inject(PrismaClientToken) prisma: PrismaClient,
    private readonly authRepository: AuthRepository
  ) {
    super(prisma, prisma.farmerProfile);
  }

  async checkEmailExists(email: string): Promise<boolean> {
    const existingUser = await this.prisma.authUser.findUnique({
      where: { email },
    });
    return !!existingUser;
  }

  async createFarmer(data: FarmerInput) {
    const { userId, role, ...farmerData } = data;
    return await this.prisma.$transaction(async (tx) => {
      const farmerProfile = await tx.farmerProfile.create({
        data: {
          ...farmerData,
          farmSize:
            typeof data.farmSize === 'string'
              ? parseFloat(data.farmSize) || 0
              : (data.farmSize ?? 0),
          user: {
            connect: { id: userId },
          },
        },
      });

      return farmerProfile;
    });
  }

  async updateFarmer(Id: string, data: FarmerInput) {
    const { id, name, email, userId, ...farmerData } = data;

    return await this.prisma.$transaction(async (tx) => {
      const farmerProfile = await tx.farmerProfile.update({
        where: { id: Id },
        data: {
          ...farmerData,
          farmSize:
            typeof data.farmSize === 'string'
              ? parseFloat(data.farmSize) || 0
              : (data.farmSize ?? 0),
          user: {
            connect: { id: userId },
          },
        },
      });

      return farmerProfile;
    });
  }

  async getAllFarmer(): Promise<any[]> {
    const farmers = await this.prisma.farmerProfile.findMany({
      where: {
        user: {
          authUser: {
            role: 'FARMER',
          },
        },
      },
      select: {
        id: true,
        isActive: true,
        code: true,
        contactPerson: true,
        contactPersonPhone: true,
        createdAt: true,
        userId: true,
        farmSize: true,
        mainCrop: true,
        notes: true,
        phone: true,
        physicalAddress: true,
        products: true,
        profileImageUrl: true,
        terms: true,

        user: {
          select: {
            authUser: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
                emailVerified: true,
              },
            },
          },
        },
      },
    });

    return farmers.map((farmer) => ({
      ...farmer,
      user: {
        id: farmer.user.authUser.id,
        name: farmer.user.authUser.name,
        email: farmer.user.authUser.email,
        role: farmer.user.authUser.role,
        emailVerified: farmer.user.authUser.emailVerified,
      },
      email: farmer.user.authUser.email,
      name: farmer.user.authUser.name,
    }));
  }

  async getFarmerById(id: string): Promise<any> {
    const farmer = await this.prisma.farmerProfile.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        isActive: true,
        code: true,
        contactPerson: true,
        contactPersonPhone: true,
        createdAt: true,
        userId: true,
        farmSize: true,
        mainCrop: true,
        notes: true,
        phone: true,
        physicalAddress: true,
        products: true,
        profileImageUrl: true,
        terms: true,

        user: {
          select: {
            authUser: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
                emailVerified: true,
              },
            },
          },
        },
      },
    });

    return {
      ...farmer,
      user: {
        id: farmer.user.authUser.id,
        name: farmer.user.authUser.name,
        email: farmer.user.authUser.email,
        role: farmer.user.authUser.role,
        emailVerified: farmer.user.authUser.emailVerified,
      },
      email: farmer.user.authUser.email,
      name: farmer.user.authUser.name,
    };
  }
}
