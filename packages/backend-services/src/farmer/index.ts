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
  constructor(private readonly farmerRepository: FarmerProfileRepository) {
    super(farmerRepository);
  }


  

  async createFarmer(data: Farmer) {
    try {
      return await prisma.farmerProfile.create({
        data: {
          products: Array.isArray(data.products)
            ? data.products.map(String)
            : [],
          farmSize:
            typeof data.farmSize === 'string'
              ? parseFloat(data.farmSize) || 0
              : (data.farmSize ?? 0),

          isActive: data.isActive ?? false,
          profileImageUrl: data.profileImageUrl ?? '',
          mainCrop: data.mainCrop ?? '',
          notes: data.notes ?? '',
          contactPerson: data.contactPerson,
          contactPersonPhone: data.contactPersonPhone,
          physicalAddress: data.physicalAddress,
          terms: data.terms,
          phone: data.phone,
          code: data.code,
          userId: data.userId,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictError('Record already exists');
      }
      console.error('Error creating farmer status:', error.code, error.status);
      console.error('Error creating farmer message:', error.message);
      console.log('====================================');

      // console.error('Error creating farmer:', error);

      throw new BadRequestError('Failed to create farmer');
    }
  }

  async findAllFarmers() {
    try {
      return await prisma.user.findMany({
        where: {
          role: 'FARMER',
        },
        include: {
          farmerProfile: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        omit: {
          password: true,
          
        },
      });
    } catch (err) {
      throw new BadRequestError('Failed to fetch farmers');
    }
  }


  // async updateFarmer(id: string, data: Partial<Farmer>) {
  //   try {
  //     const { name, email, userId, ...farmerProfileData } = data;

      

  //     const [updatedUser, updatedFarmer] = await this.farmerRepository.updateFarmerWithUser(
  //       id,
  //       userId,
  //       farmerProfileData,
  //       { name, email }
  //     );

  //     return { user: updatedUser, farmerProfile: updatedFarmer };
  //   } catch (error) {
  //     console.error("Error updating farmer:", error);
  //     throw new BadRequestError("Failed to update farmer");
  //   }
  // }


}
