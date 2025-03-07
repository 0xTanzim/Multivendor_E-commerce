import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from '@repo/common/error';
import { prisma, UserRole } from '@repo/database';
import { Farmer } from '@repo/types';

export class FarmerService {
  public static instance: FarmerService;

  private constructor() {}

  public static getInstance(): FarmerService {
    if (!FarmerService.instance) {
      FarmerService.instance = new FarmerService();
    }
    return FarmerService.instance;
  }

  async fetchUserFarmerById(id: string) {
    if (!id) {
      throw new BadRequestError('Id is required');
    }

    const farmer = await prisma.user.findUnique({
      where: { id, role: UserRole.FARMER },
    });

    if (!farmer) {
      throw new NotFoundError('Farmer not found');
    }
    return farmer;
  }

  async existFarmer(userId: string, email: string): Promise<boolean> {
    const farmer = await prisma.farmerProfile.findFirst({
      where: { userId, email },
    });
    return Boolean(farmer);
  }

  async createFarmer(data: Farmer) {
    try {
      if (await this.existFarmer(data.userId, data.email)) {
        throw new ConflictError('Farmer already exists');
      }

      return await prisma.farmerProfile.create({
        data: {
          ...data,
          products: Array.isArray(data.products)
            ? data.products.map(String)
            : [],
          farmSize:
            typeof data.farmSize === 'string'
              ? parseFloat(data.farmSize) || 0
              : (data.farmSize ?? 0),

          isActive: data.isActive ?? false,
          profileImageUrl: data.profileImageUrl ?? '',
          mainCrops: data.mainCrops ?? '',
          notes: data.notes ?? '',
        },
      });
    } catch (error) {
      console.error('Error creating farmer:', error);
      throw new BadRequestError('Failed to create farmer');
    }
  }
}
