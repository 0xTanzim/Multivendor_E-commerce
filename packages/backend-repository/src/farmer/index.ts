import { BaseRepository } from '@repo/core';
import { inject, injectable, PrismaClientToken } from '@repo/core/container';
import { FarmerProfile, Prisma, PrismaClient } from '@repo/database';
import { FarmerInput, FarmerStatus } from '@repo/types';
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
    const { userId, role, firstName, lastName, ...farmerData } = data;
    return await this.prisma.$transaction(async (tx) => {
      // set name to user

      const user = await tx.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Update the user's name
      await tx.user.update({
        where: { id: userId },
        data: {
          firstName,
          lastName,
        },
      });

      // Update AuthUser
      await tx.authUser.update({
        where: { id: userId },
        data: {
          emailVerified: true,
          roleId: role,
          verificationToken: null,
        },
      });

      // Check if the user is already a farmer
      const existingFarmer = await tx.farmerProfile.findUnique({
        where: { userId },
      });

      if (existingFarmer) {
        throw new Error('User is already a farmer');
      }

      // Create a new farmer profile
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
            role: {
              name: 'FARMER',
            },
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
        status: true,

        user: {
          select: {
            authUser: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
                emailVerified: true,
                plan: true,
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
      plan: farmer.user.authUser.plan,
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

  async fetchFarmerProducts(id: string): Promise<any[]> {
    const products = await this.prisma.product.findMany({
      where: {
        userId: id,
      },
    });
    return products;
  }

  async updateFarmerStatus(
    id: string,
    data: { status: FarmerStatus }
  ): Promise<FarmerProfile> {
    const farmerProfile = await this.prisma.farmerProfile.update({
      where: { id },
      data: {
        status: data.status,
      },
    });

    return farmerProfile;
  }

  async getFarmerByUserId(userId: string): Promise<any | null> {
    const farmerProfile = await this.prisma.farmerProfile.findUnique({
      where: { userId },
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
        status: true,

        user: {
          select: {
            username: true,
            firstName: true,
            lastName: true,
            phone: true,

            authUser: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
                emailVerified: true,
                accountStatus: true,
                plan: true,
                verificationToken: true,
              },
            },
          },
        },
      },
    });

    if (!farmerProfile) {
      return null;
    }

    return {
      ...farmerProfile,
      user: {
        id: farmerProfile.user.authUser.id,
        name: farmerProfile.user.authUser.name,
        email: farmerProfile.user.authUser.email,
        role: farmerProfile.user.authUser.role,
        emailVerified: farmerProfile.user.authUser.emailVerified,
        accountStatus: farmerProfile.user.authUser.accountStatus,
      },
      email: farmerProfile.user.authUser.email,
      name: farmerProfile.user.authUser.name,
      plan: farmerProfile.user.authUser.plan,
    };
  }
}
