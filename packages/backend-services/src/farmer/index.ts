import { FarmerProfileRepository } from '@repo/backend-repository';
import { BadRequestError, ConflictError } from '@repo/common/error';
import { BaseService, injectable } from '@repo/core';
import { FarmerProfile } from '@repo/database';
import { Farmer } from '@repo/types';

@injectable()
export class FarmerService extends BaseService<
  FarmerProfile,
  FarmerProfileRepository
> {
  constructor(farmerRepository: FarmerProfileRepository) {
    super(farmerRepository);
  }

  async createFarmer(data: Farmer) {
    try {
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

      if (error.code === 'P2002') {
        throw new ConflictError('Record already exists');
      }

      throw new BadRequestError('Failed to create farmer');
    }
  }
}
