import {
  AuthRepository,
  FarmerProfileRepository,
} from '@repo/backend-repository';
import { ConflictError, NotFoundError } from '@repo/common/error';
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
      const { name, email, ...farmerData } = data;

      console.log('Farmer data', data);

      // Step 1: Check if email already exists in the database
      const existFarmer = await this.farmerRepository.checkById(data.userId);
      if (existFarmer) {
        throw new ConflictError('UserID already exists in the database');
      }

      console.log('checked email', data.userId);
      console.log('Existing farmer', existFarmer);

      // Step 2: get user by email and check is name & email are same, f not same then update the user
      const user = await this.authRepository.getUserById(data.userId);
      if (!user) {
        throw new NotFoundError('User not found');
      }

      if (user.name !== name || user.email !== email) {
        await this.authRepository.update(user.id, {
          name,
          email,
        });
      }

      // Step 3: Create a new farmer profile
      const farmerProfile =
        await this.farmerRepository.createFarmer(farmerData);

      console.log('Farmer profile', farmerProfile);

      return {};
    } catch (err) {
      console.log(
        'Error creating farmer',
        err.message,
        'metadata',
        err?.meta,
        'code',
        err?.code
      );
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
      console.error('Error fetching farmer', err.message);
      throw new NotFoundError('Farmer not found');
    }
  }

  async updateFarmer(id: string, data: FarmerInput) {
    try {
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
      console.error('Error updating farmer', err.message);
      throw new NotFoundError('Farmer not found');
    }
  }
}
