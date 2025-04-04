import {
  AuthRepository,
  FarmerProfileRepository,
} from '@repo/backend-repository';
import { BadRequestError, NotFoundError } from '@repo/common/error';
import { BaseService, injectable } from '@repo/core';
import { FarmerProfile } from '@repo/database';
import { FarmerInput } from '@repo/types';

@injectable()
export class FarmerService extends BaseService<
  FarmerProfile,
  FarmerProfileRepository
> {
  constructor(
    private readonly farmerRepository: FarmerProfileRepository,
    private readonly authRepository: AuthRepository
  ) {
    super(farmerRepository);
  }

  async createFarmer(data: FarmerInput) {
    try {
      if (!data.userId) {
        throw new BadRequestError('User ID is required');
      }

      const farmerProfile = await this.farmerRepository.createFarmer(data);

      console.log('Farmer profile', farmerProfile);

      return farmerProfile;
    } catch (err) {
      this.handlePrismaError(err, 'Error creating farmer');
    }
  }

  async findAllFarmers() {
    try {
      const farmers = await this.farmerRepository.getAllFarmer();
      return farmers;
    } catch (err) {
      console.error('Error fetching farmers', err);
      throw new NotFoundError('Farmers not found');
    }
  }

  async findFarmerById(id: string) {
    try {
      const farmerDetails = await this.farmerRepository.getFarmerById(id);
      if (!farmerDetails) {
        throw new NotFoundError('Farmer not found');
      }
      return farmerDetails;
    } catch (err) {
      this.handlePrismaError(err, 'Error fetching farmer by ID');
    }
  }

  async updateFarmer(id: string, data: FarmerInput) {
    try {
      console.log('Farmer data to update', data);

  
      const existFarmer = await this.farmerRepository.checkById(id);

      if (!existFarmer) {
        throw new NotFoundError('Farmer not found');
      }

      // Step 2: get user by email and check is name & email are same, f not same then update the user
      const user = await this.authRepository.getUserById(data.userId);
      if (!user) {
        throw new NotFoundError('User not found');
      }

      if (user.name !== data.name || user.email !== data.email) {
        await this.authRepository.update(user.id, {
          name: data.name,
          email: data.email,
        });
      }

      const farmer = await this.farmerRepository.updateFarmer(id, data);

      return farmer;
    } catch (err) {
      this.handlePrismaError(err, 'Error updating farmer');
    }
  }

  async getFarmerAllProducts(id: string) {
    try {
      const products = await this.farmerRepository.fetchFarmerProducts(id);
      return products;
    } catch (err) {
      this.handlePrismaError(err, 'Error fetching farmer products');
    }
  }

  async getFarmerProfileByUserId(userId: string) {
    try {
      const farmer = await this.farmerRepository.getFarmerByUserId(userId);
      if (!farmer) {
        throw new NotFoundError('Farmer not found');
      }
      return farmer;
    } catch (err) {
      this.handlePrismaError(err, 'Error fetching farmer by user ID');
    }
  }

  async updateFarmerStatus(id: string, data) {
    try {
      const farmer = await this.farmerRepository.checkById(id);
      if (!farmer) {
        throw new NotFoundError('Farmer not found');
      }

      const updatedFarmer = await this.farmerRepository.updateFarmerStatus(
        id,
        data
      );

      return updatedFarmer;
    } catch (err) {
      this.handlePrismaError(err, 'Error updating farmer status');
    }
  }
}
